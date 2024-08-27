const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models'); // Conectar Sequelize
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Conectar a la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
