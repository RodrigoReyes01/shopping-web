const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Ruta para obtener el nombre del usuario
router.get('/name/:userId', profileController.getUserName);

// Ruta para actualizar el perfil del usuario
router.put('/update/:userId', profileController.updateProfile);

module.exports = router;
