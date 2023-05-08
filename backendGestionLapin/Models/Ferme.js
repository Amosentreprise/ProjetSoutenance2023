const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Ferme = sequelize.define("Ferme", {
  fermeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomFerme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});




module.exports = Ferme;
