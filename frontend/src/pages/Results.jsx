import { useEffect, useState } from 'react';
import API from '../api';

export default function Results() {
  const [results, setResults] = useState([]);

  const loadResults = async () => {
    try {
      const res = await API.get('/results');
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadResults();

    // refresh every 3 seconds
    const interval = setInterval(loadResults, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Live Election Results</h1>

        <button
          onClick={() => (window.location.href = '/admin')}
          style={styles.backButton}
        >
          Back to Dashboard
        </button>
      </div>

      {results.map((r, index) => (
        <div key={index} style={styles.card}>
          <div>
            <h3 style={{ margin: 0 }}>{r.seat_name}</h3>
            <p style={{ margin: '0.25rem 0', color: '#555' }}>
              {r.candidate_name}
            </p>
          </div>

          <div style={styles.voteBox}>
            <span style={styles.voteNumber}>{r.votes}</span>
            <small>votes</small>
          </div>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  backButton: {
    padding: '10px 16px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  card: {
    background: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  voteBox: {
    textAlign: 'center',
    minWidth: '80px'
  },
  voteNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#16a34a',
    display: 'block'
  }
};