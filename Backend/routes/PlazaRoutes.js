const express = require('express');
const { getPlazaById } = require('../controllers/plazaController');
const router = express.Router();

// Ruta para obtener los detalles de una plaza por ID
router.get('/:id', getPlazaById);

module.exports = router;
