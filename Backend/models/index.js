// Backend/models/index.js
const JobPost = require('./jobpost'); // Importa el esquema de Mongoose
const User = require('./user'); // Importa el esquema de Mongoose

// Exporta los modelos de Mongoose
module.exports = {
  JobPost,
  User,
};

