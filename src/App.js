import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { EpisodeList, EpisodeDetails } from './components/Episode';

import { SERVER_URL, INITIAL_EPISODES } from './constants';

import './App.css';

function App() {
  const [episodes, setEpisodes] = useState(INITIAL_EPISODES);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const data = await fetch(`${SERVER_URL}/episodes`).then((res) =>
        res.json()
      );
      if (data && data.length) {
        setEpisodes(data);
      }
    } catch {
      /**@todo: handle errors gracefully */
      console.error('Unable to fetch episodes');
    }
  };

  return (
    <div className="App">
      <Route path={['/', '/episodes']} exact>
        <EpisodeList episodes={episodes} />
      </Route>

      <Route path="/episode/:episodeId">
        <EpisodeDetails />
      </Route>
    </div>
  );
}

export default App;
