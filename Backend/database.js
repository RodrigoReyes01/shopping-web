const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shoppingweb';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Finaliza la app si no puede conectarse a Mongo
  }
};

module.exports = connectDB;
