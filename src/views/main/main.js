import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './W.png';
import settingsIcon from './Settings.png';
import industryIcon from './Industry.png';
import locationIcon from './Location.png';
import salaryIcon from './Salary.png';

// Importa las imágenes para las ubicaciones
import remoteImage from './Remote.png';
import newYorkImage from './Newyork.jpeg';
import losAngelesImage from './Losangeles.jpeg';
import sanFranciscoImage from './Sanfrancisco.webp';

import './main.css';

const salaryRanges = [];
for (let i = 10000; i <= 200000; i += 10000) {
  salaryRanges.push({ label: `$${i} - $${i + 10000}` });
}

const Main = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [salaryIndex, setSalaryIndex] = useState(0); // Usamos el índice para controlar el rango

  useEffect(() => {
    document.body.classList.add('main-page');
    return () => {
      document.body.classList.remove('main-page');
    };
  }, []);

  const handleSearch = () => {
    const salaryRange = salaryRanges[salaryIndex]; // Obtenemos el rango de salario seleccionado
    navigate('/result', { state: { industry, location, salaryRange } });
  };

  const handleLocationClick = (loc) => {
    setLocation(loc); // Cambia la ubicación seleccionada
  };

  const handleSalaryChange = (e) => {
    setSalaryIndex(e.target.value); // Cambia el índice del slider
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

        {/* Industry Section */}
        <div className="section-wrapper">
          <div className="section-body">
            <div className="section-header">
              <img src={industryIcon} alt="Industry Icon" />
              <span>Select Industry</span>
            </div>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
              <option value=""></option>
              <option value="Technology">Technology</option>
              <option value="Data">Data</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>

        {/* Location Section */}
        <div className="section-wrapper">
          <div className="section-body">
            <div className="section-header">
              <img src={locationIcon} alt="Location Icon" />
              <span>Select Location</span>
            </div>
            <div className="location-cards">
              {[
                { name: 'Remote', image: remoteImage },
                { name: 'New York', image: newYorkImage },
                { name: 'Los Angeles', image: losAngelesImage },
                { name: 'San Francisco', image: sanFranciscoImage }
              ].map((loc) => (
                <div
                  key={loc.name}
                  className={`location-card ${location === loc.name ? 'selected' : ''}`}
                  onClick={() => handleLocationClick(loc.name)}
                  style={{ backgroundImage: `url(${loc.image})` }}
                >
                  <div className="location-title">{loc.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Salary Section */}
        <div className="section-wrapper">
          <div className="section-body">
            <div className="section-header">
              <img src={salaryIcon} alt="Salary Icon" />
              <span>Select Salary</span>
            </div>
            <input
              type="range"
              min="0"
              max={salaryRanges.length - 1}
              value={salaryIndex}
              onChange={handleSalaryChange}
              className="salary-slider"
            />
            <p>{salaryRanges[salaryIndex].label}</p>
          </div>
        </div>

        <button className="result-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
);


};

export default Main;
