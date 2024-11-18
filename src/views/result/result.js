//src/views/result/result.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './result.css';
import resultIcon from './result.png'; 

const Result = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { industry, location: jobLocation, salary } = location.state;

  useEffect(() => {
    const fetchResults = async () => {
      const sanitizedSalary = salary || 'all'; // Asegúrate de que nunca sea una cadena vacía
      console.log("Data sent to backend:", {
        industry,
        location: jobLocation,
        salary: sanitizedSalary,
      });
  
      try {
        const response = await axios.post('http://localhost:3002/result', {
          industry,
          location: jobLocation,
          salary: sanitizedSalary, // Usar el salario validado
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
      {/* Header con botón "Back to Main" */}
      <div className="header">
        <button className="back-to-main-button" onClick={() => navigate('/main')}>
         ←
        </button>
      </div>

      <div className="results-container">
        <h2>Results</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="results-list">
        {results.map((result) => (
          <div key={result._id} className="result-item" onClick={() => navigate(`/plaza/${result._id}`)}>
            <img src={resultIcon} alt="Result icon" /> {/* Icono de result */}
            <div>
              <h3>{result.title}</h3>
              <p>Industry: {result.industry}</p>
              <p>Location: {result.location}</p>
              <p>Salary: ${result.salary}</p>
            </div>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
};

export default Result;
