//migrations/20240904162426-create-job_posts.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('job_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      job_description: {
        type: Sequelize.TEXT
      },
      job_requirement: {
        type: Sequelize.TEXT
      },
      salary: {
        type: Sequelize.DECIMAL(10, 2)
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('job_posts');
  }
};
