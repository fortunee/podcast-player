import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Player from '../Player';

import { SERVER_URL } from '../../constants';

const Episode = ({ episode }) => {
  const [allowPlay] = useState(true);

  return (
    <div className="episode">
      <Player
        src={`${SERVER_URL}${episode.audio}`}
        allowPlay={allowPlay}
      />
      <Link to={`/episode/${episode.id}`}>
        <h3>{episode.name}</h3>
      </Link>
    </div>
  );
};

export default Episode;
