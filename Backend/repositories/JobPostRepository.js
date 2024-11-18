// Backend/repositories/JobPostRepository.js
const JobPost = require('../models/jobpost'); // Importa el modelo correctamente
const mongoose = require('mongoose');


class JobPostRepository {
  async getAllJobPosts() {
    return await JobPost.find();
  }

  async getJobPostById(id) {
    return await JobPost.findById(id); // Mongoose automáticamente usa `_id`
  }


  async getFilteredJobPosts(conditions) {
    return await JobPost.find(conditions);
  }

  async createJobPost(data) {
    return await JobPost.create(data);
  }

  async updateJobPost(id, data) {
    return await JobPost.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteJobPost(id) {
      return await JobPost.findByIdAndDelete(id);
  }

}

module.exports = JobPostRepository;
