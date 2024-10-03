// Backend/models/jobpost.js
module.exports = (sequelize, DataTypes) => {
  const JobPost = sequelize.define('JobPost', { // Cambia a PascalCase
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    job_requirement: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  }, {
    tableName: 'job_posts', // Nombre explícito de la tabla
    timestamps: false, // Si no estás usando `createdAt` y `updatedAt`
  });

  return JobPost;
};
