const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CodeQR = sequelize.define("CodeQR", {
  codeqrID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  qr_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CodeQR;
