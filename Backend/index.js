const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database'); // Importa la nueva conexión a MongoDB
const resultRoutes = require('./routes/ResultRoutes');
const authRoutes = require('./routes/AuthRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');

dotenv.config(); // Cargar variables del archivo .env

const app = express();
const port = process.env.PORT || 3002;

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/result', resultRoutes);
app.use('/auth', authRoutes);
app.use('/jobposts', jobPostRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
