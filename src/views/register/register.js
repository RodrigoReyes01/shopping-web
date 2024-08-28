import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; // Usaremos el mismo archivo de CSS
import logo from './file.jpeg'; // Ajusta la ruta según donde guardes la imagen

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Verifica si los campos están vacíos
        if (!name || !email || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            // Intenta registrar al usuario
            await axios.post('http://tu-api.com/register', { name, email, password });
            
            // Redirige al login después del registro exitoso
            navigate('/login');
        } catch (err) {
            // Si ocurre un error, muestra un mensaje
            setError('Hubo un problema con el registro');
        }
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src={logo} alt="Workify Logo" />
            </div>
            <h2>Workify</h2>
            <h3>Register</h3>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
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
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
            <a href="/login">Already have an account? Login</a>
        </div>
    );
};

export default Register;
