const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gestionLapinDB", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

module.exports = sequelize;