/*== Faire des recommandations pour l'accouplement pour eviter les ploblèmes de consanguinité
1. Récuperer la liste de tout les lapins existants et autre ferme dont leur status = "EN VIE", 
orientation = "ACCOUPLEMENT", sexe = "Femelle" et etapeDeveloppement = "6 - 2 ans" ou etapeDeveloppement = "2 - 5ans"
ajouter un autre champs dans lapin pour eviter de recuperer les lapins sur lesquelle l'acouplement à ete predire
2.Pour chaque lapin 
 - Récuperer la ferme de la lapine
 - Recuperer les lapins mâles qui appartiennent à cette ferme
 - Filtrer les lapins qui ne sont pas de la meme lignée
 - Sélectionner un lapin au hasard parmi les lapins non de la même lignée
 - Recuperer l'id de ces lapins
 - Stocker dans la table accouplement
 - envoyer la notification
 NB: cette verification se fera chaque jour toutes les minutes
 ajouter un champs pour ne plus recuperer les lapins sur lequels on a faire la recommadation
 
 
*/
const {
  LapinAutreFerme,
  LapinExistant,
  Ferme,
  Notification,
  Accouplement,
} = require("../Models/association");
const { Op } = require("sequelize");
const cron = require("node-cron");

const findAllLapinFemelle = async () => {
  try {
    const lapinExistantFemele = await LapinExistant.findAll({
      where: {
        status: "EN VIE",
        orientation: "ACCOUPLEMENT",
        sexe: "Femelle",
        etapeDeveloppement: "6 - 2 ans",
      },
    });

    return lapinExistantFemele;
  } catch (error) {
    console.log("Plobleme lors de recuperation des lapins femelle");
  }
};
const findAllLapinAutreFerme = async () => {
  try {
    const lapinAutreFermeFemele = await LapinAutreFerme.findAll({
      where: {
        status: "EN VIE",
        orientation: "ACCOUPLEMENT",
        sexe: "Femelle",
        etapeDeveloppement: "6 - 2 ans",
      },
    });

    return lapinAutreFermeFemele;
  } catch (error) {
    console.log(
      "Plobleme lors de recuperation des lapins femelle provenant d'une autre ferme"
    );
  }
};

const saveValAccouplement = async (lapinMaleId, lapinFemelleId) => {
  try {
     const existingAccouplement = await Accouplement.findOne({
    //    where: {
    //      lapinExistantMaleId: lapinMaleId,
    //      lapinExistantFemelleId: lapinFemelleId,
    //    },
     });
    if (!existingAccouplement) {
      await Accouplement.create({
        lapinExistantMaleId: lapinMaleId,
        lapinExistantFemelleId: lapinFemelleId,
      });
       notification(lapinMaleId, lapinFemelleId);
   }
     
    
  } catch (error) {
    console.error(error);
    console.log(
      "Problème lors de l'enregistrement des valeurs dans la table accouplement"
    );
  }
};

const notification = async (lapinMaleId, lapinFemeleId) => {
  try {
    // // vérifier si une notification pour ce lapin existe déjà dans la table de notifications
    // const existingNotification = await Notification.findOne({
    //   where: { lapinExistant1Id: lapinMaleId, lapinExistant2Id: lapinFemeleId },
    // });

      await Notification.create({
        lapinExistant1Id: lapinMaleId,
        lapinExistant2Id: lapinFemeleId,
        TypeNotificationTypeNotificationId: 2,
      });
    
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur lors de l'enregistrement de la notification:", error);
    throw error;
  }
};

async function recommandation() {
  const lapinsFemelleExistant = await findAllLapinFemelle();
  const lapinsFemelleAutre = await findAllLapinAutreFerme();
  const lapines = [...lapinsFemelleExistant, ...lapinsFemelleAutre];

  for (const lapineMature of lapines) {
    const { lapinexistantID, lapinautrefermeID, carteRfidId, FermeFermeID } =
      lapineMature;

    //Récuperer la ferme de la lapine
    const ferme = await Ferme.findByPk(FermeFermeID);

    //Recuperer les lapins qui appartiennent à cette ferme
    const lapinsMatureExistantFerme = await LapinExistant.findAll({
      where: {
        FermeFermeID: ferme.fermeID,
        status: "EN VIE",
        orientation: "ACCOUPLEMENT",
        sexe: "Mâle",
        [Op.or]: [
          { etapeDeveloppement: "6 - 2 ans" },
          { etapeDeveloppement: "2 - 5 ans" },
        ],
      },
    });
    const lapinsMatureAutreFerme = await LapinAutreFerme.findAll({
      where: {
        FermeFermeID: ferme.fermeID,
        status: "EN VIE",
        orientation: "ACCOUPLEMENT",
        sexe: "Mâle",
        [Op.or]: [
          { etapeDeveloppement: "6 - 2 ans" },
          { etapeDeveloppement: "2 - 5 ans" },
        ],
      },
    });
    const lapinsMatureFerme = [
      ...lapinsMatureExistantFerme,
      ...lapinsMatureAutreFerme,
    ];

    //Filtrer les lapins qui ne sont pas de la meme lignée

    const lapinsNonLignes = lapinsMatureFerme.filter(
      (lapin) => lapin.carteRfidId !== carteRfidId
    );

    // Sélectionner un lapin au hasard parmi les lapins non de la même lignée
    const lapinAleatoire =
      lapinsNonLignes[Math.floor(Math.random() * lapinsNonLignes.length)];

    if (lapinAleatoire) {
      //Recuperer l'id de ces lapins
      const lapinMaleId = lapinAleatoire.lapinexistantID;
      const lapinFemeleId = lapinexistantID;
      //Stocker dans la table accouplement
      saveValAccouplement(lapinMaleId, lapinFemeleId);
       
    }
  }
}

cron.schedule("* * * * *", async () => {
  recommandation();
  console.log("Recommandation pour eviter les problèmes de lignées");
});
