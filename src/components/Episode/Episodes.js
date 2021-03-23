import React from 'react';
import Episode from './Episode';

const Episodes = ({ episodes }) => {
  return (
    <div className="episode-list">
      <h1>Podcast</h1>
      {episodes &&
        episodes.map((episode) => (
          <Episode key={episode.id} episode={episode} />
        ))}
    </div>
  );
};

export default Episodes;
