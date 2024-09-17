const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Ruta para el registro
router.post('/register', register);

// Ruta para el login
router.post('/login', login);

module.exports = router;
