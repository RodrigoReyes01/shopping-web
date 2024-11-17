// Backend/repositories/UserRepository.js
const User = require('../models/user');

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = UserRepository;

