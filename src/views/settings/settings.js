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
        navigate('/homepage');
    };

    const handleBackToMain = () => {
        navigate('/main');
    };

    const handleUpdateProfile = () => {
        navigate('/jobposts');
    };

    const handleOpenDocs = () => {
        window.open('/docs', '_blank');
    };

    return (
        <div className="settings-container">
            <h2>Ajustes</h2>
            <div className="icon-grid">
                <div className="icon-item" onClick={handleUpdateProfile}>
                    <div className="icon-circle">Icon</div>
                    <span>EDIT JobPosts</span>
                </div>
                <div className="icon-item" onClick={handleOpenDocs}>
                    <div className="icon-circle">Icon</div>
                    <span>View Documentation</span>
                </div>
                <div className="icon-item" onClick={handleBackToMain}>
                    <div className="icon-circle">Icon</div>
                    <span>Back to Home</span>
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Settings;
