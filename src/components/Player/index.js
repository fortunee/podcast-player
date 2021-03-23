import React, { useCallback, useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import Seeker from './Seeker';

const Player = ({ src, allowPlay, handleShowMarker, markers }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio(src));
  const intervalRef = useRef();
  const timeoutRef = useRef();

  const { duration, currentTime, ended } = audioRef.current;

  const JUMP_TIME = 5;

  const clear = useCallback(() => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (ended) {
      setIsPlaying(false);
      setProgress(0);
      clear();
    }

    return () => {
      clear();
    };
  }, [ended, clear]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(audioRef.current.currentTime);

      markers.forEach((m) => {
        if (m.start === Math.floor(audioRef.current.currentTime)) {
          handleShowMarker(m);
          audioRef.current.pause();
          clearInterval(intervalRef.current);

          timeoutRef.current = setTimeout(() => {
            audioRef.current.play();
            startTimer();
            handleShowMarker();
          }, m.duration * 1000);
        }
      });
    }, [1000]);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        startTimer();
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const progressPercent = duration ? `${(progress / duration) * 100}%` : '0%';
  const progressBarStyle = {
    background: `-webkit-gradient(
                    linear, 0% 0%, 100% 0%, color-stop(${progressPercent}, #246326), 
                    color-stop(${progressPercent}, #393939)
                    )
                `,
    transition: 'all .1s ease-in',
  };

  const handleSeekChange = (value) => {
    clear();
    audioRef.current.currentTime = value;
    setProgress(audioRef.current.currentTime);
  };

  const onSeekDragStop = () => {
    if (!isPlaying) {
      togglePlay();
    }
    startTimer();
  };

  const jump = (direction) => {
    if (direction === 'forward') {
      handleSeekChange(audioRef.current.currentTime + JUMP_TIME);
    }

    if (direction === 'backward') {
      handleSeekChange(audioRef.current.currentTime - JUMP_TIME);
    }
    onSeekDragStop();
  };

  return (
    <>
      <Seeker
        progress={progress}
        duration={duration}
        onSeekChange={handleSeekChange}
        onSeekDragStop={onSeekDragStop}
        disabled={!allowPlay}
        progressBarStyle={progressBarStyle}
      />
      <FormattedPlayTime currentTime={currentTime} duration={duration} />
      <Controls
        disabled={!allowPlay}
        isPlaying={isPlaying}
        jump={jump}
        togglePlay={togglePlay}
      />
    </>
  );
};

const FormattedPlayTime = ({ currentTime, duration }) => {
  const formatPlayTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : seconds;
    let playTime = `${minutes}:${seconds}`;
    return playTime === 'NaN:NaN' ? '0:0' : playTime;
  };

  return (
    <p className="play-time">
      {`${formatPlayTime(currentTime)}/${formatPlayTime(duration)}`}
    </p>
  );
};

export default Player;
