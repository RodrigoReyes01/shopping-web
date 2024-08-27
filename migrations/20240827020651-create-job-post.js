'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobpost: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      announcement_code: {
        type: Sequelize.STRING
      },
      term: {
        type: Sequelize.STRING
      },
      eligibility: {
        type: Sequelize.TEXT
      },
      audience: {
        type: Sequelize.TEXT
      },
      start_date: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      job_description: {
        type: Sequelize.TEXT
      },
      job_requirement: {
        type: Sequelize.TEXT
      },
      required_qual: {
        type: Sequelize.TEXT
      },
      salary: {
        type: Sequelize.STRING
      },
      application_procedure: {
        type: Sequelize.TEXT
      },
      opening_date: {
        type: Sequelize.TEXT
      },
      deadline: {
        type: Sequelize.TEXT
      },
      notes: {
        type: Sequelize.TEXT
      },
      about_company: {
        type: Sequelize.TEXT
      },
      attach: {
        type: Sequelize.TEXT
      },
      year: {
        type: Sequelize.INTEGER
      },
      month: {
        type: Sequelize.INTEGER
      },
      IT: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobPosts');
  }
};