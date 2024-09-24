// Backend/services/JobPostService.js
const { Op } = require('sequelize'); // Importar los operadores de Sequelize

class JobPostService {
  constructor(jobPostRepository) {
    this.jobPostRepository = jobPostRepository;
  }

  async getAllJobPosts() {
    return await this.jobPostRepository.getAllJobPosts();
  }

  async getJobPostById(id) {
    const jobPost = await this.jobPostRepository.getJobPostById(id);
    if (!jobPost) {
      throw new Error('Job Post not found');
    }
    return jobPost;
  }

  async getFilteredJobPosts(filters) {
    const conditions = [];

    if (filters.location) {
      conditions.push({
        location: {
          [Op.like]: `%${filters.location}%`,  // Utiliza LIKE para coincidencias parciales
        },
      });
    }

    if (filters.salary) {
      let salaryFilter;
      switch (filters.salary) {
        case '45000-60000':
          salaryFilter = { [Op.between]: [45000, 60000] };
          break;
        case '60000-80000':
          salaryFilter = { [Op.between]: [60000, 80000] };
          break;
        case '80000-100000':
          salaryFilter = { [Op.between]: [80000, 100000] };
          break;
        case '100000-120000':
          salaryFilter = { [Op.between]: [100000, 120000] };
          break;
        case '120000-150000':
          salaryFilter = { [Op.between]: [120000, 150000] };
          break;
        case '150000-200000':
          salaryFilter = { [Op.between]: [150000, 200000] };
          break;
        default:
          salaryFilter = null;
      }

      if (salaryFilter) {
        conditions.push({
          salary: salaryFilter,
        });
      }
    }

    // Obtener todos los resultados que coincidan con al menos una de las condiciones
    return await this.jobPostRepository.getFilteredJobPosts({
      [Op.or]: conditions,
    });
  }

  // Otros métodos de negocio para JobPost
}

module.exports = JobPostService;
