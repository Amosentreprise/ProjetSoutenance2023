/* 
    ==TACHES A FAIRE == 
    1. Verifier que l'utilisateur est connecté
    2. Verifier ensuite que la ferme sur laquelle il est connecte l'appartient
    3. Recuperer la liste de tous les ferme que ce utilisateur possede et calculer le nombre 
    4. Recuperer la liste des eleveurs qui sont dans la ferme actuellement connecte de l'eleveur
    5. Recuperer la liste de tous les lapins qui sont dans la ferme actuel et envoyer le nombre totals de lapin en faisant une somme entre lapinExistant et lapinautreferme
    6. en fonction de cette liste, retourner le nombre de lapin mort, vivant, en vie 
    7. en fonction des lapins vendus, calculer le prix total de vente et renvoyer une reponse 

*/
const {
  Ferme,
  Eleveur,
  LapinAutreFerme,
  LapinExistant,
  VenteLapin,
} = require("../Models/association");



exports.getStatistiques = async (req, res) => {
  const userId = req.userId;
  const { fermeId } = req.params;
  try {
    const ferme = await Ferme.findOne({
      where: {
        ProprietaireProprietaireID: userId,
      },
    });

    if (!ferme) {
      return res.status(404).json({ message: "cette ferme n'esxiste pas" });
    }
    //recuperer liste fermes
    const listeFerme = await Ferme.findAll({
      where: {
        ProprietaireProprietaireID: userId,
      },
    });
    const nombreFerme = listeFerme.length;

    //recuperer liste eleveurs dans une ferme
    const listeEleveur = await Eleveur.findAll({
      where: {
        FermeFermeID: fermeId,
      },
    });

    const nomPrenomEleveurs = listeEleveur.filter(
      (eleveur) => eleveur.nom && eleveur.prenom
    );
    const nombreEleveur = listeEleveur.length;

    //recuperer la liste de tous les lapins existant

    const listeLapinExistant = await LapinExistant.findAll({
      where: {
        FermeFermeID: fermeId,
      },
    });

    const nombrelapinExistant = listeLapinExistant.length;

    const nombrelapinExistantVivant = listeLapinExistant.filter(
      (lapin) => lapin.status === "EN VIE"
    ).length;
    const nombrelapinExistantMort = listeLapinExistant.filter(
      (lapin) => lapin.status === "DECEDE"
    ).length;
    const nombrelapinExistantVendu = listeLapinExistant.filter(
      (lapin) => lapin.status === "VENDU"
    ).length;

    //recuperer la liste de tous les lapins provenant d'une autre ferme

    const listeLapinAutreFerme = await LapinAutreFerme.findAll({
      where: {
        FermeFermeID: fermeId,
      },
    });

    const nombrelapinAutreFerme = listeLapinAutreFerme.length;

    const nombrelapinAutreFermeVivant = listeLapinAutreFerme.filter(
      (lapin) => lapin.status === "EN VIE"
    ).length;
    const nombrelapinAutreFermeMort = listeLapinAutreFerme.filter(
      (lapin) => lapin.status === "DECEDE"
    ).length;
    const nombrelapinAutreFermeVendu = listeLapinAutreFerme.filter(
      (lapin) => lapin.status === "VENDU"
    ).length;

    const nombreTotalLapin = nombrelapinAutreFerme + nombrelapinExistant;
    const nombreLapinTotalMort =
      nombrelapinExistantMort + nombrelapinAutreFermeMort;
    const nombreLapinTotalVendu =
      nombrelapinExistantVendu + nombrelapinAutreFermeVendu;
    const nombreLapinTotalVivant =
      nombrelapinExistantVivant + nombrelapinAutreFermeVivant;

    // Émettez la nouvelle notification via Socket.io
   

    res.status(200).json({
      nombreFermeTotal: nombreFerme,
      nombreEleveurFermeTotal: nombreEleveur,
      nomPrenomEleveurs: nomPrenomEleveurs,
      nombreLapinExistant: nombrelapinExistant,
      nombreLapinExistantMort: nombrelapinExistantMort,
      nombreLapinExistantVivant: nombrelapinExistantVivant,
      nombreLapinExistantVendu: nombrelapinExistantVendu,
      nombreLapinAutreFerme: nombrelapinAutreFerme,
      nombreLapinAutreFermeMort: nombrelapinAutreFermeMort,
      nombreLapinAutreFermeVivant: nombrelapinAutreFermeVivant,
      nombreLapinAutreFermeVendu: nombrelapinAutreFermeVendu,
      nombreLapinTotal: nombreTotalLapin,
      nombreLapinTotalVendu: nombreLapinTotalVendu,
      nombreLapinTotalVivant: nombreLapinTotalVivant,
      nombreLapinTotalMort: nombreLapinTotalMort,
    });
  } catch (error) {
       console.error(error);
       res.status(500).json({
         message: "ERREUR SERVEUR",
       });
  }
};
