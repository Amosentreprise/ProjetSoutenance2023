const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Symptome = sequelize.define("Symptome", {
  symptomeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Symptome;
