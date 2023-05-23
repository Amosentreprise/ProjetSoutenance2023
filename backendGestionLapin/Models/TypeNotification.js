const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TypeNotification = sequelize.define("TypeNotification", {
  type_NotificationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TypeNotification;
