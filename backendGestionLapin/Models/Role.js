// Define the Role model

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



module.exports = Role;
