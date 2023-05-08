const sequelize = require("../config/database");

const User = require("./User");
const Proprietaire = require("./Proprietaire");
const Eleveur = require("./Eleveur");
const Ferme = require("./Ferme");
const Role = require("./Role");

const LapinExistant = require("./LapinExistant");
const LapinAutreFerme = require("./LapinAutreFerme");
const Race = require("./Race");
const CodeQR = require("./CodeQr");
const VenteLapin = require("./VenteLapin");
const DecesLapin = require("./DecesLapin");



Proprietaire.hasOne(User);
Proprietaire.hasMany(Ferme);

User.belongsTo(Proprietaire);
User.belongsTo(Eleveur);

Ferme.belongsTo(Proprietaire);
Ferme.hasMany(Eleveur);

Eleveur.hasOne(User);

Eleveur.belongsTo(Ferme);

// Dans le modèle Proprietaire
Proprietaire.belongsTo(Role);
// Dans le modèle Eleveur
Eleveur.belongsTo(Role);
// Dans le modèle Role
Role.hasMany(Proprietaire);
Role.hasMany(Eleveur);

//association entre lapin , race, codeqr , ferme
LapinExistant.belongsTo(Ferme);
LapinExistant.belongsTo(Race);
LapinExistant.belongsTo(CodeQR);

LapinAutreFerme.belongsTo(Ferme);
LapinAutreFerme.belongsTo(Race);
LapinAutreFerme.belongsTo(CodeQR);

Race.hasMany(LapinExistant);
Race.hasMany(LapinAutreFerme);

CodeQR.hasOne(LapinExistant);
CodeQR.hasOne(LapinAutreFerme);

Ferme.hasMany(LapinExistant);
Ferme.hasMany(LapinAutreFerme);

DecesLapin.belongsTo(LapinExistant);

VenteLapin.belongsTo(LapinExistant);

LapinExistant.hasMany(DecesLapin);
LapinAutreFerme.hasMany(DecesLapin);

LapinExistant.hasMany(VenteLapin);
LapinAutreFerme.hasMany(VenteLapin);





  
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tous les modèles ont été synchronisés");
  })
  .catch((error) => {
    console.error("Erreur lors de la synchronisation des modèles :", error);
  });
//pré enregistrer les races et la table role

//Role.bulkCreate([{ name: "eleveur" }, { name: "proprietaire" }])  .then(() => {    console.log("Rôles créés avec succès.");  })  .catch((error) => {    console.log("Erreur lors de la création des rôles : ", error);  });

 
const races = [
  { name: "Fauve de Bourgogne : couleur rousse, yeux marrons" },
  {
    name: "Race Californienne : couleur blanche avec taches sur 4 parties du corps, yeux rouges, très prolifique"
  },
  { name: "Néo-zélandairs: couleur blanche sans taches, yeux rouges" },
  
  {
    name: "Papillon français: couleur blanche avec des taches noires sur tout le corps"
  },
  
  { name: "Race locale: couleurs multiples, yeux marrons" },
];

// Race.bulkCreate(races)
//   .then(() => {
//     console.log("Races created successfully");
//   })
//   .catch((err) => {
//     console.error("Error creating races: ", err);
//   });
module.exports = {
  User,
  Proprietaire,
  Eleveur,
  Ferme,
  Role,
  LapinAutreFerme,
  LapinExistant,
  Race,
  CodeQR,
  VenteLapin,
  DecesLapin
};
