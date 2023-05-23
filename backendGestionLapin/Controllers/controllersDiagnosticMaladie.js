const { Maladie, Symptome } = require("../Models/association");

exports.getAllSymptomes = async (req, res) => {
  try {
    const symptomes = await Symptome.findAll();
    res.status(200).json(symptomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des symptômes",
    });
  }
};

exports.getMaladiesBySymptome = async (req, res) => {
  try {
    const { symptomeID } = req.params;
    const symptome = await Symptome.findByPk(symptomeID, {
      include: [{ model: Maladie }],
    });
    res.status(200).json(symptome);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des maladies",
    });
  }
};






