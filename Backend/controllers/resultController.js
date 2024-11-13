const { JobPost } = require('../models');
const JobPostRepository = require('../repositories/JobPostRepository');
const JobPostService = require('../services/JobPostService');
const redisClient = require('../../config/redisClient');

// Instancia el repositorio y servicio
const jobPostRepository = new JobPostRepository({ JobPost });
const jobPostService = new JobPostService(jobPostRepository);

exports.getFilteredResults = async (req, res) => {
  let { industry, location, salary } = req.body;

  console.log("Request Body received:", { industry, location, salary });

  // Si el salario no es válido, ajusta el valor
  if (!salary || salary === '') {
    console.warn("Salary is empty or undefined, setting to 'all'.");
    salary = 'all'; // Ajusta según tu lógica (por ejemplo: '' significa sin filtro)
  }

  const cacheKey = `jobposts:${industry}:${location}:${salary}`;

  try {
    const cachedResults = await redisClient.get(cacheKey);
    if (cachedResults) {
      console.log("Resultados obtenidos del caché.");
      return res.status(200).json(JSON.parse(cachedResults));
    }

    const jobPosts = await jobPostService.getFilteredJobPosts({
      industry,
      location,
      salary: salary === 'all' ? undefined : salary, // Si es 'all', no filtrar salario
    });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(jobPosts));
    res.status(200).json(jobPosts);
  } catch (error) {
    console.error("Error en getFilteredResults:", error);
    res.status(500).json({ message: error.message });
  }
};