const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Eleveur = sequelize.define("Eleveur", {
  eleveurID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numerosTel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});



module.exports = Eleveur;
