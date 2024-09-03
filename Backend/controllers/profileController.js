const { User } = require('../models');

// Controlador para obtener el nombre de un usuario basado en su ID
exports.getUserName = async (req, res) => {
  const userId = req.params.id;
  console.log("Entre a la funcion de tener nombre");
  try {
    const user = await User.findByPk(userId, {
      attributes: ['name'] // Solo traemos el atributo 'name'
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user); // Respondemos con los datos del usuario
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
