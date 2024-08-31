const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa CORS
const { sequelize } = require('./models'); // Importa tu configuración de Sequelize
const authRoutes = require('./routes/AuthRoutes');
const mainRoutes = require('./routes/MainRoutes');
const plazaRoutes = require('./routes/PlazaRoutes');
const resultRoutes = require('./routes/ResultRoutes');
const settingsRoutes = require('./routes/SettingsRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;  // Cambia al puerto que estás usando

// Configura CORS para permitir solicitudes desde el frontend en el puerto 3001
app.use(cors({
  origin: 'http://localhost:3001',  // Permite solicitudes desde el frontend en el puerto 3001
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Si necesitas que se envíen cookies junto con la solicitud
}));

app.use(express.json()); // Middleware para parsear JSON

// Rutas de autenticación
app.use('/auth', authRoutes);

// Otras rutas
app.use('/main', mainRoutes);
app.use('/result', resultRoutes);
app.use('/plaza', plazaRoutes);
app.use('/settings', settingsRoutes);

// Conectar a la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err);
});
