const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modèle pour la table "deces"

const DecesLapin = sequelize.define("DecesLapin", {
  decesLapinID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  dateDeces: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cause: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = DecesLapin;

