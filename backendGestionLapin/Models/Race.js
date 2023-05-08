const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Race = sequelize.define("Race", {
  raceID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Race;
