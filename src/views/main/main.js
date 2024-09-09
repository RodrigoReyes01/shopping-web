import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './W.png';
import settingsIcon from './Settings.png';
import './main.css';

const Main = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSearch = () => {
    navigate('/result', { state: { industry, location, salary } });
  };

  return (
    <div className="main-container">
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Workify Logo" />
          <h1>Workify</h1>
        </div>
        <button className="settings-button" onClick={() => navigate('/settings')}>
          <img src={settingsIcon} alt="Settings" />
        </button>
      </header>
      <h1>Look for your Perfect Job . . .</h1>
      <div className="selectors">
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">Select Industry</option>
          <option value="Technology">Technology</option>
          <option value="Data">Data</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          <option value="Remote">Remote</option>
          <option value="New York, USA">New York, USA</option>
          <option value="Los Angeles, USA">Los Angeles, USA</option>
          <option value="San Francisco, USA">San Francisco, USA</option>
        </select>

        <select value={salary} onChange={(e) => setSalary(e.target.value)}>
          <option value="">Select Salary Range</option>
          <option value="45000-60000">45,000 - 60,000</option>
          <option value="60000-80000">60,000 - 80,000</option>
          <option value="80000-100000">80,000 - 100,000</option>
          <option value="100000-120000">100,000 - 120,000</option>
          <option value="120000-150000">120,000 - 150,000</option>
          <option value="150000-200000">150,000 - 200,000</option>
        </select>

        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
    </div>
  );
};

export default Main;
