// Backend/controllers/authController.js
const { User } = require('../models');
const UserRepository = require('../repositories/UserRepository');
const UserService = require('../services/UserService');

// Instancias de repositorio y servicio
const userRepository = new UserRepository({ User });
const userService = new UserService(userRepository);

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.registerUser({ name, email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
