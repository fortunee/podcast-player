import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Player from '../Player';
import Marker from '../Marker';

import { SERVER_URL } from '../../constants';

const Episode = ({ episode }) => {
  const [allowPlay, setAllowPlay] = useState(true);
  const [currentMarker, setCurrentMarker] = useState({});

  const handleShowMarker = (marker) => {
    if (marker) {
      setAllowPlay(false);
      setCurrentMarker(marker);
    } else {
      setAllowPlay(true);
      setCurrentMarker({});
    }
  };

  return (
    <div className="episode">
      <Marker {...currentMarker} />
      <Player
        src={`${SERVER_URL}${episode.audio}`}
        allowPlay={allowPlay}
        markers={episode.markers}
        handleShowMarker={handleShowMarker}
      />
      <Link to={`/episode/${episode.id}`}>
        <h3>{episode.name}</h3>
      </Link>
    </div>
  );
};

export default Episode;
