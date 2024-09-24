// Backend/repositories/JobPostRepository.js
class JobPostRepository {
    constructor(db) {
      this.db = db;
    }
  
    async getAllJobPosts() {
      return await this.db.JobPost.findAll();
    }
  
    async getJobPostById(id) {
      return await this.db.JobPost.findByPk(id);
    }
  
    async getFilteredJobPosts(conditions) {
      return await this.db.JobPost.findAll({ where: conditions });
    }
  
    // Otros métodos necesarios para interactuar con JobPost
  }
  
  module.exports = JobPostRepository;
  