
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modèle pour la table "vente"

const VenteLapin = sequelize.define("VenteLapin", {
  venteLapinID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  dateVente: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = VenteLapin;



