const { JobPost } = require('../models');

exports.getPlazaById = async (req, res) => {
  const { id } = req.params;  // Aquí se captura el id de la URL
  try {
    const plaza = await JobPost.findByPk(id);  // Busca por el campo "id"
    if (!plaza) {
      return res.status(404).json({ message: 'Plaza not found' });
    }
    res.status(200).json(plaza);
  } catch (error) {
    console.error('Error fetching plaza details:', error);
    res.status(500).json({ message: 'Error fetching plaza details' });
  }
};
