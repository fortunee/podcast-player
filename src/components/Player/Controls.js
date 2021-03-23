import React from 'react';

const Controls = ({ disabled, isPlaying, jump, togglePlay }) => (
  <div className="player-controls">
    <button className="btn" disabled={disabled} onClick={() => jump('forward')}>
      &#x21bb;
    </button>
    <button className="btn playBtn" onClick={togglePlay} disabled={disabled}>
      {isPlaying ? <span>&#2405;</span> : <span>&#9658;</span>}
    </button>
    <button
      className="btn"
      disabled={disabled}
      onClick={() => jump('backward')}
    >
      &#x21ba;
    </button>
  </div>
);

export default Controls;
