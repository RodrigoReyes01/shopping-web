import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import logo from './W.png';
import settingsIcon from './Settings.png'; // Asegúrate de que la ruta a la imagen sea correcta
import './main.css';

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Añadir la clase main-page al body
        document.body.classList.add('main-page');

        // Limpiar la clase al desmontar el componente
        return () => {
            document.body.classList.remove('main-page');
        };
    }, []);

    const goToSettings = () => {
        navigate('/settings'); // Redirige a la página de ajustes
    };

    return (
        <div className="main-container">
            <header className="header">
                <div className="header-left">
                    <img src={logo} alt="Workify Logo" />
                    <h1>Workify</h1>
                </div>
                <button className="settings-button" onClick={goToSettings}>
                    <img src={settingsIcon} alt="Settings" />
                </button>
            </header>
            <h1>Busca tu trabajo ideal . . .</h1>
            <input
                type="text"
                className="search-bar"
                placeholder="Busca empleos, empresas, palabras clave..."
            />
        </div>
    );
};

export default Main;
