// Backend/controllers/resultController.js
const { JobPost } = require('../models');
const JobPostRepository = require('../repositories/JobPostRepository');
const JobPostService = require('../services/JobPostService');

// Instancias de repositorio y servicio
const jobPostRepository = new JobPostRepository({ JobPost });
const jobPostService = new JobPostService(jobPostRepository);

exports.getFilteredResults = async (req, res) => {
  const { industry, location, salary } = req.body;
  try {
    const jobPosts = await jobPostService.getFilteredJobPosts({
      industry,
      location,
      salary,
    });
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
