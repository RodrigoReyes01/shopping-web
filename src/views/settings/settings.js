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
        navigate('/homepage'); // Redirige a la página de login
    };

    const handleBackToMain = () => {
        navigate('/main'); // Redirige a la página principal (Main)
    };

    const handleUpdateProfile = () => {
        navigate('/jobposts'); // Redirige a la página principal (Main)
    };

    const handleOpenDocs = () => {
        // Abre la página de documentación en una nueva pestaña
        window.open('/docs', '_blank');
    };

    return (
        <div className="settings-container">
            <h2>Ajustes</h2>
            <button className="update-button" onClick={handleUpdateProfile}>
                Edit Job Posts
            </button>
            <button className="docs-button" onClick={handleOpenDocs}>
                View Documentation
            </button>
            <button className="back-button" onClick={handleBackToMain}>
                Back
            </button>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Settings;
