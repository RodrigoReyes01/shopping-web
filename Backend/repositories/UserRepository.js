// Backend/repositories/UserRepository.js
class UserRepository {
    constructor(db) {
      this.db = db;
    }
  
    async createUser(userData) {
      return await this.db.User.create(userData);
    }
  
    async getUserByEmail(email) {
      return await this.db.User.findOne({ where: { email } });
    }
  
    // Otros métodos necesarios para interactuar con User
  }
  
  module.exports = UserRepository;
  