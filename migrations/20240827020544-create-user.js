/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,  // Obligatorio
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,  // Obligatorio
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,  // Obligatorio
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,  // Opcional
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,  // Opcional
      },
      education: {
        type: Sequelize.STRING,
        allowNull: true,  // Opcional
      },
      motives: {
        type: Sequelize.TEXT,
        allowNull: true,  // Opcional
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
    await queryInterface.dropTable('Users');
  }
};
