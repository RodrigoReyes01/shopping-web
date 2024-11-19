// Backend/controllers/jobPostController.js
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const JobPostService = require('../services/JobPostService');
const redisClient = require('../../config/redisClient');
const jobPostService = new JobPostService();

exports.createJobPost = async (req, res) => {
    try {
        // Crear el nuevo job post en la base de datos
        const jobPosts = await jobPostService.createJobPost(req.body);

        // Invalidar todas las claves relacionadas con búsquedas
        const searchKeys = await redisClient.keys('jobposts:*'); // Obtener todas las claves relacionadas
        if (searchKeys.length > 0) {
            await redisClient.del(...searchKeys); // Eliminar todas las claves relacionadas
        }

        res.status(201).json(jobPosts);
    } catch (error) {
        console.error("Error al crear el job post:", error);
        res.status(500).json({ message: "Error creating job post", error: error.message });
    }
};


exports.updateJobPost = async (req, res) => {
    const { id } = req.params;
    try {
        // Convertir `id` a ObjectId
        const objectId = new ObjectId(id);

        const updatedJobPost = await jobPostService.updateJobPost(objectId, req.body);
        if (!updatedJobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }

        // Invalida el caché del job post específico
        await redisClient.del(`jobposts:${id}`);

        // Invalidar cachés relacionados con búsquedas
        const searchKeys = await redisClient.keys('jobposts:*'); // Obtener todas las claves relacionadas
        if (searchKeys.length > 0) {
            await redisClient.del(...searchKeys); // Elimina todas las claves relacionadas
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
        // Convertir `id` a ObjectId
        const objectId = new ObjectId(id);

        const deleted = await jobPostService.deleteJobPost(objectId);
        if (!deleted) {
            return res.status(404).json({ message: "Job post not found" });
        }

        // Elimina la clave del caché relacionada con el job post específico
        await redisClient.del(`jobposts:${id}`);

        // Invalidar cachés relacionados con búsquedas
        const searchKeys = await redisClient.keys('jobposts:*'); // Obtener todas las claves relacionadas
        if (searchKeys.length > 0) {
            await redisClient.del(...searchKeys); // Elimina todas las claves relacionadas
        }

        res.status(200).json({ message: "Job post deleted successfully" });
    } catch (error) {
        console.error("Error al eliminar el job post:", error);
        res.status(500).json({ message: "Error deleting job post", error });
    }
};



exports.getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await jobPostService.getAllJobPosts();
        res.status(200).json(jobPosts);
    } catch (error) {
        console.error("Error al obtener los job posts:", error);
        res.status(500).json({ message: "Error retrieving job posts", error: error.message });
    }
};

exports.getJobPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const jobPost = await jobPostService.getJobPostById(id); // Busca usando `id`
        if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }

        res.status(200).json(jobPost);
    } catch (error) {
        console.error("Error al obtener el job post:", error);
        res.status(500).json({ message: "Error retrieving job post", error });
    }
};


exports.getFilteredResults = async (req, res) => {
    let { industry, location, salary } = req.body;

    if (!salary || salary === '') {
        salary = 'all';
    }

    const cacheKey = `jobposts:${industry}:${location}:${salary}`;
    try {
        const cachedResults = await redisClient.get(cacheKey);
        if (cachedResults) {
            console.log("Resultados obtenidos del caché.");
            return res.status(200).json(JSON.parse(cachedResults));
        }

        const filter = {};
        if (industry) filter.industry = industry;
        if (location) filter.location = location;

        if (salary !== 'all') {
            const salaryRange = salary.split('-');
            if (salaryRange.length === 2) {
                filter.salary = { $gte: parseInt(salaryRange[0]), $lte: parseInt(salaryRange[1]) };
            } else {
                filter.salary = parseInt(salary);
            }
        }

        console.log("MongoDB Filter:", filter);

        const jobPosts = await jobPostService.getFilteredJobPosts(filter);

        // Actualiza el caché después de consultar MongoDB
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(jobPosts));

        res.status(200).json(jobPosts);
    } catch (error) {
        console.error("Error en getFilteredResults:", error);
        res.status(500).json({ message: error.message });
    }
};
