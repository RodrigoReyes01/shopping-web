import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import axios from 'axios';
import '/Users/rodrigoreyes/Downloads/shopping-web/src/views/login/login.css';
import logo from '/Users/rodrigoreyes/Downloads/shopping-web/src/views/login/file.jpeg'; // Ajusta la ruta según donde guardes la imagen

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Cambia useHistory por useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        // Verifica si los campos están vacíos
        if (!email || !password) {
            setError('La información ingresada es incorrecta');
            return;
        }

        try {
            // Intenta autenticar al usuario
            const response = await axios.post('http://tu-api.com/login', { email, password });
            localStorage.setItem('token', response.data.token);

            // Redirige a la página principal si la autenticación es exitosa
            navigate('/main'); // Cambia history.push por navigate
        } catch (err) {
            // Si ocurre un error, muestra un mensaje
            setError('La información ingresada es incorrecta');
        }
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src={logo} alt="Workify Logo" />
            </div>
            <h2>Workify</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <a href="#">Forgot password?</a>
            <a href="#">Sign Up</a>
        </div>
    );
};

export default Login;
