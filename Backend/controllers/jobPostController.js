const JobPostService = require('../services/JobPostService');
const redisClient = require('../../config/redisClient');
const jobPostService = new JobPostService();

exports.createJobPost = async (req, res) => {
    try {
        const jobPosts = await jobPostService.createJobPost(req.body);
        await redisClient.del('jobposts:*'); // Invalida el caché global
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

        await redisClient.del(`jobposts:${id}`);
        const searchKeys = await redisClient.keys('jobposts:*');
        for (const key of searchKeys) {
            await redisClient.del(key); // Invalida todas las claves relevantes
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
        const cachedJobPost = await redisClient.get(`jobposts:${id}`);
        if (cachedJobPost) {
            return res.status(200).json(JSON.parse(cachedJobPost));
        }

        const jobPost = await jobPostService.getJobPostById(id);
        if (!jobPost) {
            return res.status(404).json({ message: "Job post not found" });
        }

        await redisClient.set(`jobposts:${id}`, JSON.stringify(jobPost));
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

        const jobPosts = await jobPostService.getFilteredJobPosts(filter);
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(jobPosts));
        res.status(200).json(jobPosts);
    } catch (error) {
        console.error("Error en getFilteredResults:", error);
        res.status(500).json({ message: error.message });
    }
};
