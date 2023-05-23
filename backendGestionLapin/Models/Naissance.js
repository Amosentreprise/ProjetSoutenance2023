/*date de naissance, nombre de lapereau vivant, mort*/
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Naissance = sequelize.define("Naissance", {
    
    naissanceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    dateNaissance: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    nombreLapereau: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    observation: {
        type: DataTypes.STRING,
        allowNull:true,
    }
})

module.exports = Naissance;