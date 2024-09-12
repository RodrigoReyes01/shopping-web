const { JobPost } = require('../models'); // Importar el modelo de JobPost
const { Op } = require('sequelize'); // Importar operadores de Sequelize

exports.getFilteredResults = async (req, res) => {
  const { industry, location, salary } = req.body;

  try {
    const conditions = [];

    if (industry) {
      conditions.push({
        industry: {
          [Op.like]: `%${industry}%`,  // Utiliza LIKE para coincidencias parciales
        },
      });
    }

    if (location) {
      conditions.push({
        location: {
          [Op.like]: `%${location}%`,  // Utiliza LIKE para coincidencias parciales
        },
      });
    }

    let salaryFilter;
    if (salary === '45000-60000') {
      salaryFilter = { [Op.between]: [45000, 60000] };
    } else if (salary === '60000-80000') {
      salaryFilter = { [Op.between]: [60000, 80000] };
    } else if (salary === '80000-100000') {
      salaryFilter = { [Op.between]: [80000, 100000] };
    } else if (salary === '100000-120000') {
      salaryFilter = { [Op.between]: [100000, 120000] };
    } else if (salary === '120000-150000') {
      salaryFilter = { [Op.between]: [120000, 150000] };
    } else if (salary === '150000-200000') {
      salaryFilter = { [Op.between]: [150000, 200000] };
    }

    if (salaryFilter) {
      conditions.push({
        salary: salaryFilter,
      });
    }

    // Obtener todos los resultados que coincidan con al menos una de las condiciones
    const jobPosts = await JobPost.findAll({
      where: {
        [Op.or]: conditions,
      },
    });

    // Asignar puntuación a cada resultado según cuántos filtros coinciden
    const scoredResults = jobPosts.map((jobPost) => {
      let score = 0;

      // Comparación flexible de industria
      if (industry && jobPost.industry.includes(industry)) score += 1;
      
      // Comparación flexible de ubicación
      if (location && jobPost.location.includes(location)) score += 1;

      // Comparación flexible de salario si el rango coincide
      if (salary && jobPost.salary >= salaryFilter[Op.between][0] && jobPost.salary <= salaryFilter[Op.between][1]) {
        score += 1;
      }

      return {
        ...jobPost.dataValues,
        score,
      };
    });

    // Ordenar los resultados por puntuación descendente
    scoredResults.sort((a, b) => b.score - a.score);

    res.status(200).json(scoredResults);  // Devolver los resultados en formato JSON
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Error fetching results' });
  }
};
