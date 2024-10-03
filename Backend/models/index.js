// Backend/models/index.js
const Sequelize = require('sequelize');

// Configurar Sequelize con los datos de tu DB en el puerto 3308
const sequelize = new Sequelize('shoppingweb', 'user', 'password', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3308,
  logging: console.log, // Agrega logging para depurar
});

// Definicion de los modelos
const User = require('./user')(sequelize, Sequelize.DataTypes);
const JobPost = require('./jobpost')(sequelize, Sequelize.DataTypes);

const db = {
  User,
  JobPost,
  sequelize,
  Sequelize,
};

// Exportar la instancia de Sequelize y los modelos
module.exports = db;
