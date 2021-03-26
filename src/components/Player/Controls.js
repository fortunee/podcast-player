import React from 'react';

const Controls = ({ disabled, isPlaying, jump, togglePlay }) => (
  <div className="player-controls">
    <button
      className="btn backward"
      disabled={disabled}
      onClick={() => jump('backward')}
    >
      &#x27F2;
    </button>
    <button className="btn playBtn" onClick={togglePlay} disabled={disabled}>
      {isPlaying ? <span>&#2405;</span> : <span>&#9658;</span>}
    </button>
    <button className="btn forward" disabled={disabled} onClick={() => jump('forward')}>
      &#x27F3;
    </button>
  </div>
);

export default Controls;
