// Backend/services/JobPostService.js
const { Op } = require('sequelize');
const JobPostRepository = require('../repositories/JobPostRepository');

// Crear una instancia de `JobPostRepository`
const jobPostRepository = new JobPostRepository();

class JobPostService {
  constructor() {
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
          [Op.like]: `%${filters.location}%`, // Utiliza LIKE para coincidencias parciales
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

  // Crear un nuevo jobpost
  async createJobPost(data) {
    return await this.jobPostRepository.createJobPost(data);
  }

  // Actualizar un jobpost por ID
  async updateJobPost(id, data) {
    return await this.jobPostRepository.updateJobPost(id, data);
  }

  // Eliminar un jobpost por ID
  async deleteJobPost(id) {
    return await this.jobPostRepository.deleteJobPost(id);
  }
}

// Exportar una instancia de `JobPostService`
module.exports = JobPostService;
