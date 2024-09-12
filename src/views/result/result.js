import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './result.css';

const Result = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { industry, location: jobLocation, salary } = location.state;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.post('http://localhost:3002/result', {
          industry,
          location: jobLocation,
          salary
        });
        setResults(response.data);
      } catch (err) {
        setError('Error fetching results, please try again.');
      }
    };

    fetchResults();
  }, [industry, jobLocation, salary]);

  return (
    <div className="results-page">
      <div className="results-container">
        <h2>Results</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="results-list">
          {results.map((result) => (
            <div key={result.id} className="result-item" onClick={() => navigate(`/plaza/${result.id}`)}>
              <h3>{result.title}</h3>
              <p>Industry: {result.industry}</p>
              <p>Location: {result.location}</p>
              <p>Salary: ${result.salary}</p>
            </div>
          ))}
        </div>
        <button className="back-to-main-button" onClick={() => navigate('/main')}>
             Go Back to Main
        </button>

      </div>
    </div>
  );
};

export default Result;
