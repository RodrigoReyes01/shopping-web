// Backend/services/UserService.js
class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async registerUser(userData) {
      // Lógica adicional de negocio para el registro de usuarios (validaciones, etc.)
      return await this.userRepository.createUser(userData);
    }
  
    async loginUser(email, password) {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      return user;
    }
  
    // Otros métodos de negocio para User
  }
  
  module.exports = UserService;
  