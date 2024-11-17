// Backend/services/JobPostService.js
const JobPostRepository = require('../repositories/JobPostRepository');

class JobPostService {
  constructor() {
    this.jobPostRepository = new JobPostRepository();
  }

  async getAllJobPosts() {
    return await this.jobPostRepository.getAllJobPosts();
  }

  async getJobPostById(id) {
    return await this.jobPostRepository.getJobPostById(id);
  }

  async createJobPost(data) {
    return await this.jobPostRepository.createJobPost(data);
  }

  async updateJobPost(id, data) {
    return await this.jobPostRepository.updateJobPost(id, data);
  }

  async deleteJobPost(id) {
    return await this.jobPostRepository.deleteJobPost(id);
  }
}

module.exports = JobPostService;
