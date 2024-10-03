// controllers/jobPostController.js
const JobPostService = require('../services/JobPostService');

// Crear un nuevo jobpost
exports.createJobPost = async (req, res) => {
    try {
        const jobPost = await jobPostService.createJobPost(req.body); // Usa `jobPostService` en minúscula
        res.status(201).json(jobPost);
    } catch (error) {
        console.error("Error al crear el job post:", error);
        res.status(500).json({ message: "Error creating job post", error: error.message });
    }
};

// Obtener todos los jobposts
exports.getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await JobPostService.getAllJobPosts();
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching job posts", error });
    }
};

// Obtener un jobpost por ID
exports.getJobPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobPost = await JobPostService.getJobPostById(id);
        if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }
        res.status(200).json(jobPost);
    } catch (error) {
        res.status(500).json({ message: "Error fetching job post", error });
    }
};

// Actualizar un jobpost por ID
exports.updateJobPost = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedJobPost = await JobPostService.updateJobPost(id, req.body);
        if (!updatedJobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }
        res.status(200).json(updatedJobPost);
    } catch (error) {
        res.status(500).json({ message: "Error updating job post", error });
    }
};

// Eliminar un jobpost por ID
exports.deleteJobPost = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await JobPostService.deleteJobPost(id);
        if (!deleted) {
            return res.status(404).json({ message: "Job post not found" });
        }
        res.status(200).json({ message: "Job post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting job post", error });
    }
};
