'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const dataPath = path.resolve(__dirname, '../job_posts.json');
    const jobPostsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    await queryInterface.bulkInsert('JobPosts', jobPostsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JobPosts', null, {});
  }
};
