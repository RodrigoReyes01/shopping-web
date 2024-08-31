import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import logo from './W.png'; // Ajusta la ruta según donde guardes la imagen

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Añadir la clase login-page al body
        document.body.classList.add('login-page');

        // Limpiar la clase al desmontar el componente
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Verifica si los campos están vacíos
        if (!email || !password) {
            setError('La información ingresada es incorrecta');
            return;
        }

        try {
            // Intenta autenticar al usuario con la URL correcta
            const response = await axios.post('http://localhost:3002/auth/login', { email, password });
            
            // Almacena el token en localStorage
            localStorage.setItem('token', response.data.token);

            // Redirige a la página principal si la autenticación es exitosa
            navigate('/main');
        } catch (err) {
            // Si ocurre un error, muestra un mensaje
            setError('La información ingresada es incorrecta');
        }
    };

    const handleSignUp = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <div className="login-container">
            <div className="login-logo-container">
                <img src={logo} alt="Workify Logo" />
            </div>
            <h2>Workify</h2>
            <h3>Login</h3>
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
            <a href="/forgot-password">Forgot password?</a>
            <a href="/register" onClick={handleSignUp}>Sign Up</a>
        </div>
    );
};

export default Login;
