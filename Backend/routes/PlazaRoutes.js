const express = require('express');
const router = express.Router();
const plazaController = require('../controllers/plazaController');

router.get('/', plazaController.renderPlazaPage);

module.exports = router;
