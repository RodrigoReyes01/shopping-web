import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';
import lupa from '../assets/lupa.png';
import vendedor from '../assets/vendedor.png'; // Importa la imagen del vendedor

function Search() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search?keyword=${keyword}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="search-container">
      <header className="search-header">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
          <button onClick={handleSearch} className="search-button">
            <img src={lupa} alt="Search" className="search-icon" />
          </button>
        </div>
      </header>
      <ul className="search-results">
        {results.map(result => (
          <li key={result.id}>
            <span>{result.name}</span>
            <span>{result.price}</span>
          </li>
        ))}
      </ul>
      <div className="vendedor-section">
        <img src={vendedor} alt="Vendedor" className="vendedor-image" />
        <div className="vendedor-description">
          <p>
            Welcome to our shopping web application! Here you can search for a wide variety of products 
            using keywords. Just enter your desired keyword in the search bar and click the search icon 
            to see the results.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search;
