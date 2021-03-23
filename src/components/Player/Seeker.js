const Seeker = ({
  progress,
  duration,
  onSeekChange,
  onSeekDragStop,
  disabled,
}) => {
  const barPercent = duration ? `${(progress / duration) * 100}%` : '0%';
  const seekerStyle = {
    background: `
      -webkit-gradient(
            linear, 0% 0%, 100% 0%, color-stop(${barPercent}, #246326), 
            color-stop(${barPercent}, #393939)
      )
    `,
  };

  return (
    <input
      type="range"
      value={progress}
      step="1"
      min="0"
      max={duration ? duration : `${duration}`}
      className="progress"
      onChange={(e) => onSeekChange(e.target.value)}
      style={seekerStyle}
      onMouseUp={onSeekDragStop}
      onKeyUp={onSeekDragStop}
      disabled={disabled}
    />
  );
};

export default Seeker;
