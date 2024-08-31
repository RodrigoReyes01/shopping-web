//Backend/models/jobpost.js

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobPost.init({
    jobpost: DataTypes.TEXT,
    date: DataTypes.TEXT,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    announcement_code: DataTypes.STRING,
    term: DataTypes.STRING,
    eligibility: DataTypes.TEXT,
    audience: DataTypes.TEXT,
    start_date: DataTypes.TEXT,
    duration: DataTypes.STRING,
    location: DataTypes.STRING,
    job_description: DataTypes.TEXT,
    job_requirement: DataTypes.TEXT,
    required_qual: DataTypes.TEXT,
    salary: DataTypes.STRING,
    application_procedure: DataTypes.TEXT,
    opening_date: DataTypes.TEXT,
    deadline: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    about_company: DataTypes.TEXT,
    attach: DataTypes.TEXT,
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    IT: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'JobPost',
  });
  return JobPost;
};