const { JobPost } = require('../models');
const redisClient = require('../../config/redisClient');

exports.getFilteredResults = async (req, res) => {
  let { industry, location, salary } = req.body;

  console.log("Request Body received:", { industry, location, salary });

  // Ajusta el valor del salario si no está definido
  if (!salary || salary === '') {
    console.warn("Salary is empty or undefined, setting to 'all'.");
    salary = 'all'; // Ajusta según tu lógica
  }

  const cacheKey = `jobposts:${industry}:${location || 'all'}:${salary}`;

  try {
    // Verificar si hay resultados en el caché
    const cachedResults = await redisClient.get(cacheKey);
    if (cachedResults) {
      console.log("Resultados obtenidos del caché.");
      return res.status(200).json(JSON.parse(cachedResults));
    }

    // Construir el filtro dinámicamente para MongoDB
    const filter = {};
    if (industry) filter.industry = industry;
    if (location && location.trim() !== '') filter.location = location; // Excluir location si está vacío o solo contiene espacios

    if (salary !== 'all') {
      const salaryRange = salary.split('-'); // Supone que el salario es un rango como "45000-60000"
      if (salaryRange.length === 2) {
        filter.salary = { $gte: parseInt(salaryRange[0]), $lte: parseInt(salaryRange[1]) };
      } else {
        filter.salary = parseInt(salary); // Si es un valor exacto, úsalo directamente
      }
    }

    console.log("MongoDB Filter:", filter);

    // Consultar MongoDB con el filtro construido
    const jobPosts = await JobPost.find(filter);

    // Almacenar los resultados en el caché para futuras consultas
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(jobPosts));

    res.status(200).json(jobPosts);
  } catch (error) {
    console.error("Error en getFilteredResults:", error);
    res.status(500).json({ message: error.message });
  }
};
