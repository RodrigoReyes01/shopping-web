const { JobPost } = require('../models'); // Importar el modelo de JobPost
const { Op } = require('sequelize'); // Importar operadores de Sequelize

exports.getFilteredResults = async (req, res) => {
  const { industry, location, salary } = req.body;

  try {
    const filters = {
      industry,
      location,
    };

    // Manejo de los rangos salariales
    if (salary === '45000-60000') {
      filters.salary = {
        [Op.between]: [45000, 60000],
      };
    } else if (salary === '60000-80000') {
      filters.salary = {
        [Op.between]: [60000, 80000],
      };
    } else if (salary === '80000-100000') {
      filters.salary = {
        [Op.between]: [80000, 100000],
      };
    } else if (salary === '100000-120000') {
      filters.salary = {
        [Op.between]: [100000, 120000],
      };
    } else if (salary === '120000-150000') {
      filters.salary = {
        [Op.between]: [120000, 150000],
      };
    } else if (salary === '150000-200000') {
      filters.salary = {
        [Op.between]: [150000, 200000],
      };
    }

    // Realizar la búsqueda en la base de datos con los filtros aplicados
    const jobPosts = await JobPost.findAll({
      where: filters,
    });

    res.status(200).json(jobPosts);  // Devolver los resultados en formato JSON
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Error fetching results' });
  }
};
