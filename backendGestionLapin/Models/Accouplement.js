/* l'id, les clé etangere, resultat de l'accouplemnt par defaut en attente, date d'accouplement */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Accouplement = sequelize.define("Accouplement", {

    accouplementID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    dateAccouplement: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    resultatAccouplement: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue : "EN ATTENTE"
    },
})

module.exports = Accouplement;