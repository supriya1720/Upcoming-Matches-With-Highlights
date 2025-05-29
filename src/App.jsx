import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://www.scorebat.com/video-api/v3/')
      .then(res => res.json())
      .then(data => {
        setMatches(data.response.slice(0, 10)); 
      })
      .catch(() => {
        setError('Failed to load match highlights');
      });
  }, []);

  return (
    <div className="app">
      <h1>Soccer Match List with Highlights</h1>
      {error && <p>{error}</p>}
      <div className="matches">
        {matches.map((match, idx) => (
          <div key={idx} className="match-card">
            <img src={match.thumbnail} alt="match thumbnail" />
            <h2>{match.title}</h2>
            <p><strong>Competition:</strong> {match.competition}</p>
            <p><strong>Date:</strong> {new Date(match.date).toLocaleString()}</p>
            <a href={match.matchviewUrl} target="_blank" rel="noreferrer">
              🔗 Watch Highlights
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
