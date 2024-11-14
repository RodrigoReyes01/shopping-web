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

        // Invalidar el caché del job post específico
        await redisClient.del(`jobposts:${id}`);

        // Opcional: Invalidar cachés relacionados con búsquedas
        const searchKeys = await redisClient.keys('jobposts:*'); // Obtener todas las claves relacionadas con búsquedas
        for (const key of searchKeys) {
            if (key.includes('Technology') || key.includes('Remote')) {
                // Invalidar claves relevantes (ajusta los filtros según tu lógica de negocio)
                await redisClient.del(key);
            }
        }

        res.status(200).json(updatedJobPost);
    } catch (error) {
        console.error("Error al actualizar el job post:", error);
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

        // Elimina la clave del caché relacionada
        await redisClient.del(`jobposts:${id}`);

        res.status(200).json({ message: "Job post deleted successfully" });
    } catch (error) {
        console.error("Error al eliminar el job post:", error);
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
        // Busca en el caché primero
        const cachedJobPost = await redisClient.get(`jobposts:${id}`);
        if (cachedJobPost) {
            return res.status(200).json(JSON.parse(cachedJobPost));
        }

        // Si no está en caché, busca en la base de datos
        const jobPost = await jobPostService.getJobPostById(id);
        if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }

        // Almacena en caché para futuras solicitudes
        await redisClient.set(`jobposts:${id}`, JSON.stringify(jobPost));

        res.status(200).json(jobPost);
    } catch (error) {
        console.error("Error al obtener el job post:", error);
        res.status(500).json({ message: "Error retrieving job post", error });
    }
};

