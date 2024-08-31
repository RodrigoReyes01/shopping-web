import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './settings.css';

const Settings = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Añadir la clase settings-page al body
        document.body.classList.add('settings-page');

        // Limpiar la clase al desmontar el componente
        return () => {
            document.body.classList.remove('settings-page');
        };
    }, []);

    const handleLogout = () => {
        // Aquí puedes limpiar cualquier estado de sesión si es necesario
        navigate('/login'); // Redirige a la página de login
    };

    const handleBackToMain = () => {
        navigate('/main'); // Redirige a la página principal (Main)
    };

    return (
        <div className="settings-container">
            <h2>Ajustes</h2>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            <button className="back-button" onClick={handleBackToMain}>
                Volver
            </button>
        </div>
    );
};

export default Settings;
