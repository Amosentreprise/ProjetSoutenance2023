//j'inporte mes bases de données
const { User, Proprietaire, Eleveur, Ferme } = require("../Models/association");
const bcrypt = require("bcrypt");

//UTILISATION DE TWILIO
// const accountSid = "ACe6af88851a6ff49c6dfdfe2f252111db"; //mon compte sid
// const authToken = "ad361f41861877afc667b96f3dc2f7b9"; //AUTHENTIFICATION TOKEN
// const client = require('twilio')(accountSid,authToken)

//Syncroniser les tables

//generer un token pour chaque utilisateur afin de garder l'utilisateur connecter
const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "1AHKLDJKJKKDMMMMMMD8400347483093039848589948SHJDCK";

function generateToken(user, role) {
  const token = jwt.sign({ userId: user, role: role }, JWT_SIGN_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
function generateTokenEleveur(userProprietaire, role, eleveur) {
  const token = jwt.sign(
    { userId: userProprietaire, role: role, eleveurId: eleveur },
    JWT_SIGN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

function generatePassword() {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return password;
}

exports.inscriptionProprietaire = async (req, res) => {
  const { telephone } = req.body;

  try {
    if (!telephone) {
      return res
        .status(400)
        .json({ message: "Le numéro de téléphone est obligatoire" });
    }

    //verifier si l'utilisateur existe dejà

    const userExist = await Proprietaire.findOne({
      where: { numerosTel: telephone },
    });
    if (userExist) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }
    //hasher le mot de passe

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const proprietaire = await Proprietaire.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      numerosTel: req.body.telephone,
      RoleId: 2,
    });

    await User.create({
      password: hashedPassword,
      ProprietaireProprietaireID: proprietaire.proprietaireID,
    });
    await Ferme.create({
      nomFerme: req.body.nomferme,
      adresse: req.body.adressferme,
      ProprietaireProprietaireID: proprietaire.proprietaireID,
    });

    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'inscription" });
  }
};
exports.connexionUser = async (req, res) => {
  const { telephone, password } = req.body;

  try {
    const proprietaire = await Proprietaire.findOne({
      where: { numerosTel: telephone },
      include: [
        {
          model: User,
          attributes: ["password", "userID", "ProprietaireProprietaireID"],
        },
        {
          model: Ferme,
          attributes: ["fermeID"],
        },
      ],
    });
    if (proprietaire) {
      //verification du mot de passe
      const match = await bcrypt.compare(password, proprietaire.User.password);

      if (match) {
        const token = generateToken(
          proprietaire.User.ProprietaireProprietaireID,
          proprietaire.RoleId
        );
       return res.status(200).json({
          token,
          fermeId: proprietaire.Fermes[0].fermeID,
          userId: proprietaire.User.ProprietaireProprietaireID,
          roleId: proprietaire.RoleId,
        });
      }
    }

    //verifier si le numeros est pour l'eleveur
    const eleveur = await Eleveur.findOne({
      where: { numerosTel: telephone },
      include: [
        { model: User, attributes: ["password", "userID"] },
        { model: Ferme, attributes: ["fermeID", "ProprietaireProprietaireID"] },
      ],
    });

    if (eleveur) {
      // Si le numéro de téléphone est associé à un éleveur,
      // vérifier si le mot de passe est correct
      const match = await bcrypt.compare(password, eleveur.User.password);

      if (match) {
        // Si le mot de passe est correct, générer un token
        const token = generateTokenEleveur(
          eleveur.Ferme.ProprietaireProprietaireID,
          eleveur.RoleId,
          eleveur.eleveurID
        );

        // Retourner le token, l'identifiant de la ferme et l'identifiant du propriétaire
        return res.status(200).json({
          token,
          fermeId: eleveur.Ferme.fermeID,
          userId: eleveur.Ferme.ProprietaireProprietaireID,
          roleId: eleveur.RoleId,
        });
      }
    }

    // Si aucun utilisateur n'a été trouvé avec ce numéro de téléphone et ce mot de passe, renvoyer une erreur
    return res
      .status(400)
      .json({ message: "Numéro de téléphone ou mot de passe incorrect" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
//ça reste affaire non autorisé pour eleveur à d'autre ferme via les params
exports.getInfoFermeUser = async (req, res) => {
  const fermeId = req.params.fermeId;
  const userId = req.params.userId;
  const userOnline = req.userId;

  try {
    // Récupération de la ferme correspondante à l'ID de l'utilisateur et à l'ID de la ferme
    if (userId == userOnline) {
      const ferme = await Ferme.findOne({
        where: {
          fermeID: fermeId,
          ProprietaireProprietaireID: userId,
        },
      });

      if (!ferme) {
        return res.status(404).json({ message: "Ferme non trouvée" });
      }

      // Renvoi de la réponse avec les informations de la ferme et du propriétaire

      return res.status(200).json({
        ferme,
        userOnline,
      });
    }


    return res
      .status(401)
      .json({ message: "vous n'êtes pas autorisé à acceder aux ressources" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.profileController = async (req, res) => {
  try {
    if (req.role == 2) {
      const proprietaire = await Proprietaire.findOne({
        where: { proprietaireID: req.userId },
      });
      res.status(200).json({ proprietaire });
    }
    if (req.role == 1) {
      const eleveur = await Eleveur.findOne({
        where: { eleveurID: req.eleveurId },
      });
      res.status(200).json({ eleveur });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.ajouterFermeController = async (req, res) => {
  try {
    //Validation des entres
    const value1 = req.body.nomferme;
    const value2 = req.body.adressferme;
    if (
      !value1 ||
      !value2
    ) {
      return res.status(400).json({
        message:
          "Les champs sont obligatoires. Veuillez remplir tous les champs",
      });
    }

    // Créer une nouvelle entrée de ferme dans la base de données
    const nouvelleFerme = await Ferme.create({
      nomFerme: req.body.nomferme,
      adresse: req.body.adressferme,
      ProprietaireProprietaireID: req.userId,
    });

    // Envoyer une réponse avec la nouvelle entrée de ferme créée
    return res
      .status(201)
      .json(nouvelleFerme /*{message: 'Ferme créée avec succès'}*/);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Erreur lors de la création de la nouvelle ferme." });
  }
};

exports.getAllFerme = async (req, res) => {
  try {
    // Récupération de l'id de l'utilisateur connecté
    const userId = req.userId;

    // Récupération de toutes les fermes appartenant à l'utilisateur connecté
    const fermes = await Ferme.findAll({
      where: {
        ProprietaireProprietaireId: userId,
      },
    });

    res.status(200).json(fermes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des fermes",
    });
  }
};
exports.switchFerme = async (req, res) => {
  try {
    // Récupération de l'id de l'utilisateur connecté
    const userId = req.userId;

    // Récupération de l'id de la ferme à basculer
    const fermeId = req.params.fermeId;
    const role = req.role;

    if (role === 2) {
      // Vérification que la ferme appartient bien à l'utilisateur connecté
      const ferme = await Ferme.findOne({
        where: {
          fermeID: fermeId,
          ProprietaireProprietaireId: userId,
        },
      });

      if (!ferme) {
       return res.status(404).json({
          message: "Cette ferme n'existe pas ou ne vous appartient pas",
        });
      }

      // Mise à jour de la session de l'utilisateur avec l'id de la nouvelle ferme

      return res
        .status(200)
        .json(
          ferme /*{ message: "Vous êtes maintenant connecté à la ferme sélectionnée" }*/
        );
    }

    return res.status(401).json({ message: "Accès non autorise" });
  } catch (error) {
    console.error(error);
   return res.status(500).json({
      message:
        "Une erreur est survenue lors de la bascule vers la nouvelle ferme",
    });
  }
};

exports.ajouterEleveurController = async (req, res) => {
  const { nomEleveur, prenomEleveur, numerosEleveur } = req.body;
  const { fermeId } = req.params;
  const userId = req.userId;

  try {
    // Vérifier si l'utilisateur connecté est le propriétaire de la ferme
    const ferme = await Ferme.findOne({
      where: { fermeId: fermeId, ProprietaireProprietaireID: userId },
    });
    if (!ferme) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à ajouter un éleveur à cette ferme.",
      });
    }
    // Vérifier si l'éléveur n'existe pas déjà
    const eleveurExist = await Eleveur.findOne({
      where: { numerosTel: numerosEleveur },
    });
    if (eleveurExist) {
      return res.status(400).json({ message: "Cet éléveur existe déjà." });
    }

    if (!nomEleveur || !prenomEleveur || !numerosEleveur) {
       return res.status(400).json({
         message:
           "Les champs sont obligatoires. Veuillez remplir tous les champs",
       });
     }

    // Créer un nouvel éléveur
    const eleveur = await Eleveur.create({
      nom: nomEleveur,
      prenom: prenomEleveur,
      numerosTel: numerosEleveur,
      FermeFermeID: fermeId,
      RoleId: 1,
    });

    // Générer un mot de passe pour l'éléveur
    const password = generatePassword();

    const message = `Votre mot de passe est ${password}.`;
     const format = "+229";
     const numero = eleveur.numerosTel;
      const to = "+22952109652";
     
     

    // client.messages
    //     .create({ body: message, from: "+16206999535", to: to })
    //     .then((message) => console.log(message.sid));

    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur pour l'éléveur
    const user = await User.create({
      password: hashedPassword,
      EleveurEleveurID: eleveur.eleveurID,
    });
    res
      .status(201)
      .json({ message: "Inscription d'eleveur reuissir", Eleveur, password });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'inscription" });
  }
};

//UPDATE
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (req.role == 2) {
      // Trouver l'utilisateur dans la base de données
      const proprietaire = await Proprietaire.findOne({
        where: { proprietaireID: req.userId },
        include: [{ model: User, attributes: ["password"] }],
      });

      // Vérifier que l'ancien mot de passe correspond à celui dans la base de données
      const match = await bcrypt.compare(
        oldPassword,
        proprietaire.User.password
      );
      if (!match) {
        return res
          .status(400)
          .json({ message: "Ancien mot de passe incorrect" });
      }
      // Chiffrer le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Mettre à jour le mot de passe dans la base de données
      await User.update(
        { password: hashedPassword },
        { where: { ProprietaireProprietaireID: req.userId } }
      );
      res.status(200).json({ message: "Mot de passe modifié avec succès" });
    }

    if (req.role == 1) {
      const eleveur = await Eleveur.findOne({
        where: { eleveurID: req.eleveurId },
        include: [{ model: User, attributes: ["password"] }],
      });

      const match = await bcrypt.compare(oldPassword, eleveur.User.password);

      if (!match) {
        return res
          .status(400)
          .json({ message: "Ancien mot de passe incorrect" });
      }
      // Chiffrer le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Mettre à jour le mot de passe dans la base de données
      await User.update(
        { password: hashedPassword },
        { where: { EleveurEleveurID: req.eleveurId } }
      );
      return res
        .status(200)
        .json({ message: "Mot de passe modifié avec succès" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.editProfil = async (req, res) => {
  const { nom, prenom, numerosTel, email } = req.body;
  try {
     if (req.role == 2) {
       const proprietaire = await Proprietaire.findOne({
         where: { proprietaireID: req.userId },
       });

       await proprietaire.update({
         nom,
         prenom,
         numerosTel,
         email,
       });
       return res
         .status(200)
         .json({ message: "Mise à jour effectuée avec succes" });
     }
     if (req.role == 1) {
       const eleveur = await Eleveur.findOne({
         where: { eleveurID: req.eleveurId },
       });

       await eleveur.update({
         nom,
         prenom,
         numerosTel,
       });
     }
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({message : 'Erreur serveur'})
    
  }
 
  

}
