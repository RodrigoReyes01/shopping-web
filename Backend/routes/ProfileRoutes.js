const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Ruta para obtener el nombre de un usuario por ID
router.get('/name/:id', profileController.getUserName);

// Aquí irían otras rutas como register, login, etc.

module.exports = router;
