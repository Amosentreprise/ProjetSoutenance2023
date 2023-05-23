const express = require("express");

const routerLapin = express.Router();

const authenticateUser = require('../middleware/authentification');

const contollersLapin = require('../Controllers/controllersLapin');

//get races
routerLapin.get('/races', authenticateUser, contollersLapin.getRaces)
//recuperer  les id carterdid des lapins MASCULIN
routerLapin.get(
  "/:fermeId/lapinmaleid",
  authenticateUser,
  contollersLapin.getMaleid
);
//recuperer  les id carterdid des lapins feminin
routerLapin.get(
  "/:fermeId/lapinfemelleid",
  authenticateUser,
  contollersLapin.getFemelleid
);

// enregistrement lapin existant
routerLapin.post("/:fermeId/lapin/Existant",authenticateUser, contollersLapin.saveRabitExisting);

// enregistrement lapin autreferme 
routerLapin.post("/:fermeId/lapin/AutreFerme",authenticateUser, contollersLapin.saveRabitOther)

// modification des infos sur un lapin 
routerLapin.put(
  "/:fermeId/lapin/:carteRfidId/:lapinId/modification",
  authenticateUser,
  contollersLapin.putInfosRabit
);


//enregistrement de la vente 
routerLapin.post(
  "/:fermeId/lapin/:carteRfidId/:lapinId/vente",
  authenticateUser,
  contollersLapin.saveVenteRabit
);

// enregistrement de deces 
routerLapin.post(
  "/:fermeId/lapin/:carteRfidId/:lapinId/deces",
  authenticateUser,
  contollersLapin.saveDecesRabit
);

// listes des lapins 
routerLapin.get("/:fermeId/lapins", authenticateUser , contollersLapin.getAllRabit)


//detail lapin
routerLapin.get(
  "/:fermeId/lapin/:carteRfidId/detail",
  authenticateUser,
  contollersLapin.getDetailRabit
);


//supprimer un lapin
routerLapin.delete(
  "/:fermeId/lapin/:carteRfidId/:lapinId/supression",
  authenticateUser,
  contollersLapin.deleteRabit
);


module.exports = routerLapin;

