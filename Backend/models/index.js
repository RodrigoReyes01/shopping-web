const Sequelize = require('sequelize');

const sequelize = new Sequelize('shoppingweb', 'user', 'password', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3308,
});

const User = require('./user')(sequelize, Sequelize.DataTypes);

const db = {
  User,
  sequelize,
  Sequelize,
};

module.exports = db;
