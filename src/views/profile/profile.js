import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = ({ userId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    console.log("Estoy cargando el profile con userId:", userId);

    useEffect(() => {
        // Añadir la clase profile-page al body
        document.body.classList.add('profile-page');

        // Limpiar la clase al desmontar el componente
        return () => {
            document.body.classList.remove('profile-page');
        };
    }, []);

    useEffect(() => {
        // Fetch para obtener el nombre del usuario basado en el userId
        const fetchUserName = async () => {
            console.log("Entre a la función: Obtener Nombre");
            try {
                const response = await axios.get(`http://localhost:3002/profile/name/${userId}`);
                console.log('Respuesta del servidor:', response.data);

                if (response.data && response.data.name) {
                    setName(response.data.name);  // Actualizar el estado con el nombre
                } else {
                    setError('Nombre de usuario no encontrado.');
                }
            } catch (err) {
                console.error('Error al obtener el nombre del usuario:', err);
                setError('Error fetching user name, please try again.');
            }
        };

        if (userId) {
            fetchUserName();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Aquí podrías enviar los datos actualizados a la API para almacenarlos en la base de datos
            await axios.put(`http://localhost:3002/profile/${userId}`, {
                name,
                email,
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
                    placeholder="Enter your name"
                    value={name}  // Aquí debería mostrarse el nombre preescrito
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

