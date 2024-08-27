const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models'); // Importa tu configuración de Sequelize
const authRoutes = require('./routes/AuthRoutes');
const mainRoutes = require('./routes/MainRoutes');
const plazaRoutes = require('./routes/PlazaRoutes');
const resultRoutes = require('./routes/ResultRoutes');
const settingsRoutes = require('./routes/SettingsRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
