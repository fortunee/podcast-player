import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../../constants';
import Episode from './Episode';

const EpisodeDetails = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState();

  const fetchEpisode = useCallback(async () => {
    try {
      const episode = await fetch(
        `${SERVER_URL}/episodes/${episodeId}`
      ).then((res) => res.json());

      setEpisode(episode);
    } catch (error) {
      /**@todo: handle errors gracefully */
      console.error(error);
    }
  }, [episodeId]);

  useEffect(() => {
    if (episodeId) {
      fetchEpisode();
    }
  }, [episodeId, fetchEpisode]);

  return (
    <div>
      {episode && (
        <>
          <h1>{episode.name}</h1>
          <Episode episode={episode} />
        </>
      )}
    </div>
  );
};

export default EpisodeDetails;
