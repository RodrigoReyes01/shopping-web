import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [currentSalary, setCurrentSalary] = useState('');
    const [industry, setIndustry] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Añadir la clase profile-page al body
        document.body.classList.add('profile-page');

        // Limpiar la clase al desmontar el componente
        return () => {
            document.body.classList.remove('profile-page');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica si los campos están vacíos
        if (!jobTitle || !currentSalary || !industry || !company || !location) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            // Aquí podrías enviar los datos a una API para almacenarlos en la base de datos
            await axios.post('http://localhost:3002/profile', {
                jobTitle,
                currentSalary,
                industry,
                company,
                location
            });

            // Maneja el caso de éxito
            alert('Profile updated successfully!');
        } catch (err) {
            // Manejo de errores
            setError('Something went wrong, please try again.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter your current salary"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter your industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Save Profile</button>
            </form>
            <button 
                className="back-to-settings-button" 
                onClick={() => navigate('/settings')}>
                Back
            </button>
        </div>
    );
};

export default Profile;
