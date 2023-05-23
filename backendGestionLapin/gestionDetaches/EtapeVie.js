/* === Prédiction de l'étape de développemnt d'un lapin ===
1. Creer une fonction qui recupere la liste de tout les lapins qui sont en vie 
2. Créer une fonction pour comparer la date d'enregistrement à la date actuelle et changer d'etape de developpement quand 
la date atteint une autre etape de developpement
3. Créer une fonction pour faire une mise à jour de la base de donné quand l'etape de developpement change
4. Envoyer une notificationLapinExistant quand l'etape change
5. Mettre en place le système de cron pour une verification tous les jours et toutes les minutes
*/
//les tables de ma base de données

const {
  LapinAutreFerme,
  LapinExistant,
  Notification,
} = require("../Models/association");
const cron = require("node-cron");

//Recuperer la liste de tous mes lapins existants vivants
const fetchLapinExistantFromDB = async () => {
  try {
    const lapinExistant = await LapinExistant.findAll({
      where: { status: "EN VIE" },
    });
    const lapinAutreFerme = await LapinAutreFerme.findAll();

    return lapinExistant;
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur lors de la récupération des lapins :", error);
    throw error;
  }
};
//Recuperer la liste de tous mes lapins provenant d'une autre ferme vivants
const fetchLapinAutreFermeFromDB = async () => {
  try {
    const lapinAutreFerme = await LapinAutreFerme.findAll({
      where: { status: "EN VIE" },
    });

    return lapinAutreFerme;
  } catch (error) {
    // Gérer les erreurs
    console.error(
      "Erreur lors de la récupération des lapins provenant d'une autre ferme :",
      error
    );
    throw error;
  }
};

//Mise à jour de la base de données
const updateLapinEtape = async (lapinId, nouvelleEtape) => {
  try {
    const lapinExistant = await LapinExistant.findByPk(lapinId);
    if (lapinExistant.etapeDeveloppement !== nouvelleEtape) {
      await LapinExistant.update(
        { etapeDeveloppement: nouvelleEtape },
        { where: { lapinexistantID: lapinId } }
      );
      notificationLapinExistant(lapinExistant.lapinexistantID);
    }
  } catch (error) {
    // Gérer les erreurs
    console.error(
      "Erreur lors de la mise à jour de l'étape de développement du lapin :",
      error
    );
    throw error;
  }
};
const updateLapinAutreFermeEtape = async (lapinId, nouvelleEtape) => {
  try {
    const lapinAutreFerme = await LapinAutreFerme.findByPk(lapinId);
    if (lapinAutreFerme.etapeDeveloppement !== nouvelleEtape) {
      await LapinAutreFerme.update(
        { etapeDeveloppement: nouvelleEtape },
        { where: { lapinautrefermeID: lapinId } }
      );
       notificationAutreFerme(lapinAutreFerme.lapinautrefermeID);
    }
  } catch (error) {
    // Gérer les erreurs
    console.error(
      "Erreur lors de la mise à jour de l'étape de développement du lapin provenant d'une autre ferme :",
      error
    );
    throw error;
  }
};

const notificationLapinExistant = async (lapinId) => {
  try {
    await Notification.create({
      lapinExistant1Id: lapinId,
      TypeNotificationTypeNotificationId: 1,
    });
  } catch (error) {
    // Gérer les erreurs
    console.error(
      "Erreur lors de la mise à jour de l'étape de développement du lapin :",
      error
    );
    throw error;
  }
};
const notificationAutreFerme = async (lapinId) => {
  try {
    await Notification.create({
      lapinAutreFerme1Id: lapinId,
      TypeNotificationTypeNotificationId: 1,
    });
  } catch (error) {
    // Gérer les erreurs
    console.error(
      "Erreur lors de la mise à jour de l'étape de développement du lapin :",
      error
    );
    throw error;
  }
};

async function updateLapinAgeCategory() {
  const lapinsExistant = await fetchLapinExistantFromDB(); // Récupérer tous les lapins existants de la base de données
  const lapinsAutreFerme = await fetchLapinAutreFermeFromDB(); // Récupérer tous les lapins provenant d'une autre ferme de la base de données

  const currentDate = new Date();
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // 1 semaine en millisecondes
  const TWO_WEEKS = 2 * ONE_WEEK; // 2 semaines en millisecondes
  const FOUR_WEEKS = 4 * ONE_WEEK; // 4 semaines en millisecondes
  const SIX_MONTHS = 6 * 30 * ONE_WEEK; // 6 mois en millisecondes
  const TWO_YEARS = 2 * 365 * ONE_WEEK; // 2 ans en millisecondes
  const FIVE_YEARS = 5 * 365 * ONE_WEEK; // 5 ans en millisecondes

  //Pour chaque lapin existant
  lapinsExistant.forEach((lapinExistant) => {
    const { createdAt, etapeDeveloppement, NiveauVie } = lapinExistant;
    const ageInMillis = currentDate - new Date(createdAt);
    let ageCategory = etapeDeveloppement;

    if (ageInMillis >= FIVE_YEARS) {
      ageCategory = "5 ans et plus";
      // Mettre à jour l'étape de développement du lapinExistant dans la base de données
      updateLapinEtape(lapinExistant.lapinexistantID, ageCategory);
    
    } else if (ageInMillis >= TWO_YEARS) {
      ageCategory = "2 - 5 ans";
      // Mettre à jour l'étape de développement du lapinExistant dans la base de données
      updateLapinEtape(lapinExistant.lapinexistantID, ageCategory);
    } else if (ageInMillis >= SIX_MONTHS) {
      ageCategory = "6 - 2 ans";
      // Mettre à jour l'étape de développement du lapinExistant dans la base de données
      updateLapinEtape(lapinExistant.lapinexistantID, ageCategory);
  
    } else if (ageInMillis >= FOUR_WEEKS) {
      ageCategory = "4 - 6 mois";
      // Mettre à jour l'étape de développement du lapinExistant dans la base de données
      updateLapinEtape(lapinExistant.lapinexistantID, ageCategory);
    
    } else if (ageInMillis >= TWO_WEEKS) {
      ageCategory = "2 - 4 semaines";
      // Mettre à jour l'étape de développement du lapinExistant dans la base de données
      updateLapinEtape(lapinExistant.lapinexistantID, ageCategory);
      
    }
  });

  //Pour chaque lapin provenant d'une autre ferme
  lapinsAutreFerme.forEach((lapinAutreFerme) => {
    const { createdAt, etapeDeveloppement } = lapinAutreFerme;
    const ageInMillis = currentDate - new Date(createdAt);
    let ageCategory = etapeDeveloppement;

    if (ageInMillis >= FIVE_YEARS) {
      ageCategory = "5 ans et plus";
      // Mettre à jour l'étape de développement du lapinAutreFerme dans la base de données
      updateLapinAutreFermeEtape(
        lapinAutreFerme.lapinautrefermeID,
        ageCategory
      );
     
    } else if (ageInMillis >= TWO_YEARS) {
      ageCategory = "2 - 5 ans";
      // Mettre à jour l'étape de développement du lapinAutreFerme dans la base de données
      updateLapinAutreFermeEtape(
        lapinAutreFerme.lapinautrefermeID,
        ageCategory
      );
      
    } else if (ageInMillis >= SIX_MONTHS) {
      ageCategory = "6 - 2 ans";
      // Mettre à jour l'étape de développement du lapinAutreFerme dans la base de données
      updateLapinAutreFermeEtape(
        lapinAutreFerme.lapinautrefermeID,
        ageCategory
      );
     
    } else if (ageInMillis >= FOUR_WEEKS) {
      ageCategory = "4 - 6 mois";
      // Mettre à jour l'étape de développement du lapinAutreFerme dans la base de données
      updateLapinAutreFermeEtape(
        lapinAutreFerme.lapinautrefermeID,
        ageCategory
      );
      
    } else if (ageInMillis >= TWO_WEEKS) {
      ageCategory = "2 - 4 semaines";
      // Mettre à jour l'étape de développement du lapinAutreFerme dans la base de données
      updateLapinAutreFermeEtape(
        lapinAutreFerme.lapinautrefermeID,
        ageCategory
      );

    }
  });
}

cron.schedule("* * * * *", async () => {
  updateLapinAgeCategory();
  const lapinExistants = await fetchLapinExistantFromDB();
  console.log(lapinExistants);
  const lapinAutreFerme = await fetchLapinAutreFermeFromDB();
  console.log(lapinAutreFerme);
  console.log("Prediction de l'étape de developpement des lapins");
});
