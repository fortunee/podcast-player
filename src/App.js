import { useState, useEffect } from 'react';
import { EpisodeList } from './components/Episode';

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
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default App;
