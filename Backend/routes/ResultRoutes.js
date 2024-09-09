const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Ruta para obtener resultados filtrados
router.post('/', resultController.getFilteredResults);

module.exports = router;
