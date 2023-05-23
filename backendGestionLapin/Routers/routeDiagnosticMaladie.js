const express = require("express");

const routerMaladie = express.Router();

const authenticateUser = require("../middleware/authentification");

const contollersMaladie = require("../Controllers/controllersDiagnosticMaladie");

routerMaladie.get("/symptomes", authenticateUser, contollersMaladie.getAllSymptomes);

routerMaladie.get(
  "/maladies/:symptomeID",
  authenticateUser,
  contollersMaladie.getMaladiesBySymptome
);


module.exports = routerMaladie;
