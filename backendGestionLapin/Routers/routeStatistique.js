const express = require("express");
const routerStatistique = express.Router();

const authenticateUser = require("../middleware/authentification");
const controllerStatistique = require("../Controllers/controllersStatistique");

routerStatistique.get(
  "/statistiques/:fermeId",
  authenticateUser,
  controllerStatistique.getStatistiques
);

module.exports = routerStatistique;
