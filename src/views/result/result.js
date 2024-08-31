import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './result.css';

const Results = () => {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:3002/results');
                setResults(response.data);
            } catch (err) {
                setError('Error fetching results, please try again.');
            }
        };

        fetchResults();
    }, []);

    const handleResultClick = (id) => {
        navigate(`/plaza/${id}`);
    };

    return (
        <div className="results-page">
            <div className="results-container">
                <h2>Results</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="results-list">
                    {results.map((result) => (
                        <div
                            key={result.id}
                            className="result-item"
                            onClick={() => handleResultClick(result.id)}
                        >
                            <h3>{result.title}</h3>
                            <p>{result.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Results;
