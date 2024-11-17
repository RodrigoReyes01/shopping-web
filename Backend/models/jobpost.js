// Backend/models/jobpost.js
const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true },
  job_description: { type: String },
  job_requirement: { type: String },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('JobPost', JobPostSchema);
