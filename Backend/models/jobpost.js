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

// Convertir _id a id al responder
JobPostSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString(); // Asegúrate de convertir _id a string
    delete ret._id;
  }
});

module.exports = mongoose.model('JobPost', JobPostSchema);


