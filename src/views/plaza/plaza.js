import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './plaza.css'; // Si tienes un archivo de estilos

const Plaza = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [plaza, setPlaza] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlazaDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/plaza/${id}`);
        setPlaza(response.data);
      } catch (err) {
        setError('Error fetching plaza details, please try again.');
      }
    };

    fetchPlazaDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!plaza) {
    return <p>Loading...</p>;
  }

  return (
    <div className="plaza-page">
      <div className="plaza-container">
        <h2>{plaza.title}</h2>
        <p>Company: {plaza.company}</p>
        <p>Industry: {plaza.industry}</p>
        <p>Location: {plaza.location}</p>
        <p>Salary: ${plaza.salary}</p>
        <p>Job Description: {plaza.job_description}</p>
        <p>Job Requirements: {plaza.job_requirement}</p>
        <button onClick={() => navigate('/result')}>Back to Results</button>
      </div>
    </div>
  );
};

export default Plaza;
