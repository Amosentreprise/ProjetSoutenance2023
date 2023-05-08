const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Proprietaire = sequelize.define("Proprietaire", {
  proprietaireID: {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  numerosTel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});



module.exports = Proprietaire;
