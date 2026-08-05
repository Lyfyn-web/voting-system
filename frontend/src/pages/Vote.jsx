import { useEffect, useState } from 'react';
import API from '../api';

export default function Vote() {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/results')
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  }, []);

  const castVote = async (seatId, candidateId) => {
    try {
      const res = await API.post('/vote', {
        seat_id: seatId,
        candidate_id: candidateId
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Voting failed');
    }
  };

  // Group candidates by seat
  const grouped = {};

  results.forEach((r) => {
    if (!grouped[r.seat_name]) grouped[r.seat_name] = [];
    grouped[r.seat_name].push(r);
  });

  return (
    <div style={styles.container}>
      <h1>Cast Your Vote</h1>

      {message && (
        <p style={{ color: 'green', marginBottom: '1rem' }}>
          {message}
        </p>
      )}

      {Object.entries(grouped).map(([seat, candidates]) => (
        <div key={seat} style={styles.card}>
          <h2>{seat}</h2>

          {candidates.map((c) => (
            <div key={c.candidate_id} style={styles.candidate}>
              <span>{c.candidate_name}</span>

              <button
                onClick={() =>
                  castVote(c.seat_id, c.candidate_id)
                }
                style={styles.button}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: '#f4f6f8',
    minHeight: '100vh'
  },
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  candidate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBottom: '1px solid #eee'
  },
  button: {
    padding: '8px 14px',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};