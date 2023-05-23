const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LapinAutreFerme = sequelize.define("LapinAutreFerme", {
  lapinautrefermeID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  carteRfidId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  sexe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orientation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etapeDeveloppement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provenance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "EN VIE",
  },
 
});

module.exports = LapinAutreFerme;
