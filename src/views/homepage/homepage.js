//src/views/homepage/homepage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';
import logo from './W.png';

function Homepage() {
  const history = useNavigate();

  useEffect(() => {
    document.body.classList.add('homepage');

    return () => {
      document.body.classList.remove('homepage');
    };
  }, []);

  return (
    <div className="main-container">
      <img src={logo} alt="Workify Logo" />
      <h1>Workify</h1>
      <div className="button-container">
        <button onClick={() => history('/login')}>Login</button>
        <button onClick={() => history('/register')}>Start</button>
      </div>
      {/* Sección de Reviews */}
      </div>
  );
}

export default Homepage;
