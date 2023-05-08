const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/authentification");

const controllers = require("../Controllers/controllers");

//Route pour l'inscription d'un utilisateur
router.post("/inscription", controllers.inscriptionProprietaire);


//Route pour la connexion d'un utilisateur
router.post("/connexion", controllers.connexionUser);

//recuperer la ferme pour lequel l'utilisateur est connecte 
router.get(
  '/dashboard/:userId/ferme/:fermeId',
  authenticateUser,
  controllers.getInfoFermeUser
);

// Route pour ajouter une ferme pour un proprietaire
router.post(
  "/Addferme",
  authenticateUser,
  controllers.ajouterFermeController
);


 //Route pour ajouter un eleveur pour une ferme
router.post(
  "/ferme/:fermeId/eleveur",
  authenticateUser,
  controllers.ajouterEleveurController
);



//route pour recuperer tous les fermes de l'utilisateur connecter
router.get('/fermes', authenticateUser, controllers.getAllFerme)

//route pour basculer vers une ferme
router.get("/switch/:fermeId", authenticateUser, controllers.switchFerme);

//route pour afficher les informations de l'utilisateur
router.get(
  "/dashboard/Profile",
  authenticateUser,
  controllers.profileController
);

//UPDATE INFORMATION
router.put("/change-password",authenticateUser, controllers.changePassword);
router.put("/edit-profil",authenticateUser, controllers.editProfil)

module.exports = router;
