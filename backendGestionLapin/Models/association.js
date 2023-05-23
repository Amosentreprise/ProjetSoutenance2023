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

const Maladie = require("./Maladie");
const Symptome = require("./Symptome");

const Notification = require("./Notification");
const TypeNotification = require("./TypeNotification");

const Accouplement = require("./Accouplement");
const Naissance = require("./Naissance");

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

//Association entre Notification type notification lapin
TypeNotification.hasMany(Notification);
Notification.belongsTo(TypeNotification);
Notification.belongsTo(LapinExistant, {
  foreignKey: "lapinExistant1Id"
});
Notification.belongsTo(LapinExistant, {
  foreignKey: "lapinExistant2Id",
});
Notification.belongsTo(LapinAutreFerme, {
  foreignKey: "lapinAutreFerme1Id",
});
Notification.belongsTo(LapinAutreFerme, {
  foreignKey: "lapinAutreFerme2Id",
});

//Association entre la table accouplement, lapinExistant, lapinAccouplement
Accouplement.belongsTo(LapinExistant, {
  foreignKey: "lapinExistantMaleId",
});
Accouplement.belongsTo(LapinExistant, {
  foreignKey: "lapinExistantFemelleId",
});
Accouplement.belongsTo(LapinAutreFerme, {
  foreignKey: "lapinAutreFermeMaleId",
});
Accouplement.belongsTo(LapinAutreFerme, {
  foreignKey: "lapinAutreFermeFemelleId",
});

//Association entre la table accouplement et la table naissance
Naissance.belongsTo(Accouplement);

// Association Symptome - Maladie
Symptome.belongsTo(Maladie); // Une Symptome appartient à une Maladie
Maladie.hasMany(Symptome); // Une Maladie peut avoir plusieurs Symptomes

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tous les modèles ont été synchronisés");
  })
  .catch((error) => {
    console.error("Erreur lors de la synchronisation des modèles :", error);
  });
//pré enregistrer les races et la table role

/*Role.bulkCreate([{ name: "eleveur" }, { name: "proprietaire" }])  .then(() => {    console.log("Rôles créés avec succès.");  })  .catch((error) => {    console.log("Erreur lors de la création des rôles : ", error);  });

const races = [
  { name: "Fauve de Bourgogne : couleur rousse, yeux marrons" },
  {
    name: "Race Californienne : couleur blanche avec taches sur 4 parties du corps, yeux rouges, très prolifique",
  },
  { name: "Néo-zélandairs: couleur blanche sans taches, yeux rouges" },

  {
    name: "Papillon français: couleur blanche avec des taches noires sur tout le corps",
  },

  { name: "Race locale: couleurs multiples, yeux marrons" },
];

 Race.bulkCreate(races)
   .then(() => {
     console.log("Races created successfully");
   })
   .catch((err) => {
     console.error("Error creating races: ", err);
   });
const maladie = [
  {
    nom: "Coccidiose",
    traitement: "Antibiotique",
    prophylaxie:
      "1 fois par mois traitement avec par exemple Amprolium ou Embazine",
  },
  {
    nom: "Pasteurellose",
    traitement: "Rhume: presser du jus d'affama dans les narines.",
    prophylaxie: "",
  },
  {
    nom: "Manque de vitamines A",
    traitement: "",
    prophylaxie:
      "Donner des matières riches en vitamines A (leucaena, feuille de patate douce et de carotte, huile de foie de morue.)",
  },
  {
    nom: "Gale (maladie contagieuse)",
    traitement:
      "Diazintol (1 ml par litre d'eau) Passer un mélange d'huile d'arachide et de soufre sur les parties atteintes. 6 cuillerées d'huile pour 5 g de soufre +2g de sel",
    prophylaxie:
      "Propreté et hygiène. 2 fois par mois traitement préventif: avec par exemple Diazintol à passer sur les oreilles, pattes et nez",
  },
  {
    nom: "Helminthes(vers)",
    traitement: "Vermifuge exemple Finiworm ou Wormazine",
    prophylaxie: "par Déparasitage tous les 2 mois.",
  },
];
Maladie.bulkCreate(maladie)
 .then(() => {
//     console.log("Races created successfully");
   })
   .catch((err) => {
//     console.error("Error creating races: ", err);
 });

const symptome = [
  {
    nom: "amaigrissement",
    MaladieMaladieID: 1,
  },
  {
    nom: "diarrhée avec mucus",
    MaladieMaladieID: 1,
  },
  {
    nom: "diarrhée",
    MaladieMaladieID: 2,
  },
  {
    nom: "rhume",
    MaladieMaladieID: 2,
  },
  {
    nom: "stérilité",
    MaladieMaladieID: 3,
  },
  {
    nom: "chute des poils",
    MaladieMaladieID: 4,
  },
  {
    nom: "formation de croûtes",
    MaladieMaladieID: 4,
  },
  {
    nom: "vers dans les fientes",
    MaladieMaladieID: 5,
  },
  {
    nom: "manque d'appétit",
    MaladieMaladieID: 5,
  },
];
Symptome.bulkCreate(symptome)
  .then(() => {
    console.log("Races created successfully");
  })
  .catch((err) => {
    console.error("Error creating races: ", err);
  });

const typeNotification = [
  {
    name: "Changement d'etape de developpement",
  },
  {
    name: "Recommandation pour accouplement",
  },
  {
    name: "Prediction du jour de naissance",
  },
];
TypeNotification.bulkCreate(typeNotification)
  .then(() => {
    console.log("Enregistrement efectué");
  })
  .catch((error) => {
    console.log(error);
  });*/

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
  DecesLapin,
  Maladie,
  Symptome,
  Notification,
  TypeNotification,
  Naissance,
  Accouplement
};
