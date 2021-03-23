const Seeker = ({
  progress,
  duration,
  progressBarStyle,
  onSeekChange,
  onSeekDragStop,
  disabled,
}) => {
  return (
    <input
      type="range"
      value={progress}
      step="1"
      min="0"
      max={duration ? duration : `${duration}`}
      className="progress"
      onChange={(e) => onSeekChange(e.target.value)}
      style={progressBarStyle}
      onMouseUp={onSeekDragStop}
      onKeyUp={onSeekDragStop}
      disabled={disabled}
    />
  );
};

export default Seeker;
