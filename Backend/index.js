//Backend/index.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importar la configuración de Sequelize
const resultRoutes = require('./routes/ResultRoutes');
const authRoutes = require('./routes/AuthRoutes'); 
const dotenv = require('dotenv');
const jobPostRoutes = require('./routes/jobPostRoutes');

dotenv.config(); // Cargar variables del archivo .env

const app = express();
const port = process.env.PORT || 3002;

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001', // Permitir solicitudes desde el frontend en localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Permitir credenciales (cookies, tokens, etc.)
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/result', resultRoutes);  // Rutas de resultados de búsqueda
app.use('/auth', authRoutes);  // Rutas de autenticación (login y register)
app.use('/jobposts', jobPostRoutes);


// Iniciar el servidor y sincronizar Sequelize
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err);
});

