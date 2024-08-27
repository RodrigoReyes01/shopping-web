const { User } = require('../models');

// Registro de usuario
exports.register = async (req, res) => {
  const { name, email, password, age, gender, education, motives } = req.body;
  try {
    const user = await User.create({ name, email, password, age, gender, education, motives });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
