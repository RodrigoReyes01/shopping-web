// Backend/controllers/jobPostController.js
const JobPostService = require('../services/JobPostService');
const redisClient = require('../../config/redisClient');
const jobPostService = new JobPostService();

exports.createJobPost = async (req, res) => {
    try {
        const jobPosts = await jobPostService.createJobPost(req.body);
        // Invalida todas las claves de búsqueda en el caché
        await redisClient.del('jobposts:*');
        res.status(201).json(jobPosts);
    } catch (error) {
        console.error("Error al crear el job post:", error);
        res.status(500).json({ message: "Error creating job post", error: error.message });
    }
};

exports.updateJobPost = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedJobPost = await jobPostService.updateJobPost(id, req.body);
        if (!updatedJobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }
        // Invalida todas las claves de búsqueda en el caché
        await redisClient.del('jobposts:*');
        res.status(200).json(updatedJobPost);
    } catch (error) {
        res.status(500).json({ message: "Error updating job post", error });
    }
};

exports.deleteJobPost = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await jobPostService.deleteJobPost(id);
        if (!deleted) {
            return res.status(404).json({ message: "Job post not found" });
        }
        // Invalida todas las claves de búsqueda en el caché
        await redisClient.del('jobposts:*');
        res.status(200).json({ message: "Job post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting job post", error });
    }
};

exports.getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await jobPostService.getAllJobPosts(); // Implementa esto en tu servicio
        res.status(200).json(jobPosts);
    } catch (error) {
        console.error("Error al obtener los job posts:", error);
        res.status(500).json({ message: "Error retrieving job posts", error: error.message });
    }
};

exports.getJobPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobPost = await jobPostService.getJobPostById(id); // Implementa esto en tu servicio
        if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }
        res.status(200).json(jobPost);
    } catch (error) {
        console.error("Error al obtener el job post por ID:", error);
        res.status(500).json({ message: "Error retrieving job post by ID", error: error.message });
    }
};
