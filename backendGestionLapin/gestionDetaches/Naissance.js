/*
- Recuperer la liste de toutes les informations dant la table accouplemnt dont resultat accouplement = enceinte 
- comparer la date d'enregistrement de l'accouplement à la date actuelle 
- si  > 28 , n'envoie pas de notification
- si  = 28 jours, envoie la notification
- si  < 28 jours, n'envoie pas
- faire appres le statistique d'accouplment, de naissance chaque mois
*/
const { Accouplement, Notification } = require("../Models/association");
const cron = require("node-cron");

const findAllLapinAccouplement = async () => {
  try {
    const accouplement = await Accouplement.findAll({
      where: { resultatAccouplement: "ENCEINTE" },
    });
    return accouplement;
  } catch (error) {
    console.log(
      "Erreur lors de la recuperation des données sur l'accouplement"
    );
  }
};

const notification = async (lapinMaleId, lapinFemeleId) => {
  try {
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

async function predireJourNaissance() {
  const resultatsAccouplement = await findAllLapinAccouplement();

  for (const resultatAccouplement of resultatsAccouplement) {
    const {
      dateAccouplement,
      lapinExistantMaleId,
      lapinExistantFemelleId,
      lapinAutreFermeMaleId,
      lapinAutreFermeFemelleId,
    } = resultatAccouplement;

    const currentDate = new Date();
    const targetDate = dateAccouplement;


    // Calculez la différence en millisecondes entre la date actuelle et la date cible
    const differenceInMillis = currentDate - targetDate;

    // Convertissez la différence en jours
    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);

    // Vérifiez si la différence est supérieure ou égale à 28 jours
    if (differenceInDays >= 28) {
      console.log("La date a atteint 28 jours ou plus.");
    } else {
      console.log("La date n'a pas encore atteint 28 jours.");
    }
  }
}
