// Backend/repositories/JobPostRepository.js
const { JobPost } = require('../models');

class JobPostRepository {
  constructor() {
    this.db = JobPost; // Usar la instancia importada de `JobPost`
  }

  // Obtener todos los jobposts
  async getAllJobPosts() {
    return await this.db.findAll();
  }

  // Obtener un jobpost por ID
  async getJobPostById(id) {
    return await this.db.findByPk(id);
  }

  // Obtener jobposts con condiciones específicas
  async getFilteredJobPosts(conditions) {
    return await this.db.findAll({ where: conditions });
  }

  // Crear un nuevo jobpost
  async createJobPost(data) {
    return await this.db.create(data);
  }

  // Actualizar un jobpost por ID
  async updateJobPost(id, data) {
    const jobPost = await this.db.findByPk(id);
    if (jobPost) {
      await jobPost.update(data);
      return jobPost;
    }
    return null;
  }

  // Eliminar un jobpost por ID
  async deleteJobPost(id) {
    const jobPost = await this.db.findByPk(id);
    if (jobPost) {
      await jobPost.destroy();
      return true;
    }
    return false;
  }
}

module.exports = JobPostRepository; 

