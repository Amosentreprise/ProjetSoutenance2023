const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Maladie = sequelize.define("Maladie", {
  maladieID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  traitement: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prophylaxie: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Maladie;
