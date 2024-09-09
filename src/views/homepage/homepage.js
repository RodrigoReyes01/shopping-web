import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';
import logo from './W.png';
import profilePic from './paco.png'; // Asegúrate de que la imagen esté en la carpeta correcta
import profilePic2 from './isaac.png'; // Asegúrate de que la imagen esté en la carpeta correcta


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
      <div className="reviews-section">
        <h2>Reviews</h2>
        <div className="review-card">
          <img src={profilePic} alt="Francisco Acuña" className="profile-pic" />
          <div className="review-content">
            <h3>Francisco Acuña</h3>
            <p>Workify me ha ayudado en mi carrera profesional, no sabía qué hacer con mi vida...</p>
          </div>
        </div>
        <div className="review-card">
          <img src={profilePic2} alt="Issac" className="profile-pic" />
          <div className="review-content">
            <h3>Isaac Cryman</h3>
            <p>Workify es lo que buscaba! Por cierto... alguien busca Chamba?</p>
          </div>
        </div>
        {/* Puedes añadir más cards de reviews si lo deseas */}
      </div>
    </div>
  );
}

export default Homepage;
