const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');



const User = sequelize.define("User", {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});





module.exports = User;