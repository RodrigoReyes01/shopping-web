// routes/jobPostRoutes.js
const express = require('express');
const router = express.Router();
const jobPostController = require('../controllers/jobPostController');


// Ruta para crear un nuevo jobpost
router.post('/', jobPostController.createJobPost);

// Ruta para obtener todos los jobposts
router.get('/', jobPostController.getAllJobPosts);

// Ruta para obtener un jobpost por ID
router.get('/:id', jobPostController.getJobPostById);

// Ruta para actualizar un jobpost por ID
router.put('/:id', jobPostController.updateJobPost);

// Ruta para eliminar un jobpost por ID
router.delete('/:id', jobPostController.deleteJobPost);

module.exports = router;
