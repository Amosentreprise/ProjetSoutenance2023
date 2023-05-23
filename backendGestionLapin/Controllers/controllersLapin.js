//Inportation des models
const {
  Ferme,
  LapinAutreFerme,
  LapinExistant,
  CodeQR,
  Race,
  VenteLapin,
  DecesLapin,
} = require("../Models/association");
const { Op } = require('sequelize')
const qrcode = require("qrcode");

const { v4: uuidv4 } = require("uuid");

//get Races
exports.getRaces = async (req, res) => {
     try {
       const races = await Race.findAll();
       res.status(200).json({ races: races });
     } catch (err) {
       console.error(err);
       res
         .status(500)
         .json({
           message:
             "Une erreur s'est produite lors de la récupération des races",
         });
     }
};

//recuperer les id carterdid des lapins feminin

exports.getFemelleid = async (req, res) => {
    const { fermeId } = req.params;
  try {
    const femelleLapins = await LapinExistant.findAll({
      attributes: ["carteRfidId"],
      where: {
        sexe: "Femelle",
        FermeFermeID: fermeId,
      },
    });

    const autresFemelleLapins = await LapinAutreFerme.findAll({
      attributes: ["carteRfidId"],
      where: {
        sexe: "Femelle",
        FermeFermeID: fermeId,
      },
    });

    const result = [...femelleLapins, ...autresFemelleLapins];

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des lapins femelles",
    });
  }
};

//recuperer  les id carterdid des lapins MASCULIN
exports.getMaleid = async (req, res) => {
  const { fermeId } = req.params;
  try {
    const maleLapins = await LapinExistant.findAll({
      attributes: ["carteRfidId"],
      where: {
        sexe: "Mâle",
        FermeFermeID: fermeId,
      },
    });

    const autresMaleLapins = await LapinAutreFerme.findAll({
      attributes: ["carteRfidId"],
      where: {
        sexe: "Mâle",
        FermeFermeID: fermeId,
      },
    });

    const result = [...maleLapins, ...autresMaleLapins];

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des lapins mâles",
    });
  }
};



//Controllers enregistrement lapin existant
exports.saveRabitExisting = async (req, res) => {
   const { fermeId } = req.params;
   const userId = req.userId;
   const {
     carteRfidId,
     sexe,
     orientation,
     etapeDeveloppement,
     cage,
     raceId,
     mereId,
     pereId,
  } = req.body;
  
  try {
    // Vérification que la ferme appartient bien à l'utilisateur connecté
    const ferme = await Ferme.findOne({
      where: {
        fermeID: fermeId,
        ProprietaireProprietaireID: userId,
      },
    });

    if (!ferme) {
      return res.status(404).json({
        message: "Cette ferme n'existe pas ou ne vous appartient pas",
      });
    }
    //Validation des entres
    if (!carteRfidId || !sexe || !orientation || !etapeDeveloppement || !cage || !raceId || !mereId || !pereId) {
      return res.status(400).json({
        message: "Les champs sont obligatoires",
      });
    }

    // Générer un code QR unique
    const codeQR = uuidv4();

    // Générer le code QR pour le lapin
    const lapinQRCode = await qrcode.toDataURL(codeQR);

    // Créer le code QR en base de données
    const CodeQRsave = await CodeQR.create({ qr_code: lapinQRCode });

    // Récupérer l'ID du nouveau code QR créé
    const codeQRId = CodeQRsave.codeqrID;

    const lapinExistant = await LapinExistant.create({
      carteRfidId,
      sexe,
      orientation,
      etapeDeveloppement,
      cage,
      mereId,
      pereId,
      RaceRaceID: raceId,
      CodeQRCodeqrID: codeQRId,
      FermeFermeID: fermeId,
    });
    res.status(201).json({ lapinExistant, lapinQRCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    
  }
   
};
//Controllers enregistrement lapin autreferme
exports.saveRabitOther = async (req, res) => {
     const { fermeId } = req.params;
     const userId = req.userId;
     const {
       carteRfidId,
       sexe,
       orientation,
       etapeDeveloppement,
       cage,
       provenance,
       raceId,
     } = req.body;

     try {
       // Vérification que la ferme appartient bien à l'utilisateur connecté
       const ferme = await Ferme.findOne({
         where: {
           fermeID: fermeId,
           ProprietaireProprietaireID: userId,
         },
       });

       if (!ferme) {
         return res.status(404).json({
           message: "Cette ferme n'existe pas ou ne vous appartient pas",
         });
       }

       //Validation des entres
       if (!carteRfidId || !sexe || !orientation || !etapeDeveloppement || !cage || !raceId || !provenance) {
         return res.status(400).json({
           message: "Les champs sont obligatoires. Veuillez remplir tous les champs",
         });
       }
       // Générer un code QR unique
       const codeQR = uuidv4();

       // Générer le code QR pour le lapin
       const lapinQRCode = await qrcode.toDataURL(codeQR);

       // Créer le code QR en base de données
       const CodeQRsave = await CodeQR.create({ qr_code: lapinQRCode });
       // Récupérer l'ID du nouveau code QR créé
       const codeQRId = CodeQRsave.codeqrID;

       const lapinAutreFerme = await LapinAutreFerme.create({
         carteRfidId,
         sexe,
         orientation,
         etapeDeveloppement,
         cage,
         provenance,
         FermeFermeID: fermeId,
         RaceRaceID: raceId,
         CodeQRCodeqrID: codeQRId,
       });

       res.status(201).json({ lapinAutreFerme, lapinQRCode });
     } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Server Error" });
     }
};

//Controllers modification
exports.putInfosRabit = async (req, res) => {
  const { fermeId, lapinId, carteRfidId } = req.params;
  const userId = req.userId;

  try {
    // Vérification que la ferme appartient bien à l'utilisateur connecté
    const ferme = await Ferme.findOne({
      where: {
        fermeID: fermeId,
        ProprietaireProprietaireID: userId,
      },
    });

    if (!ferme) {
      return res.status(404).json({
        message: "Cette ferme n'existe pas ou ne vous appartient pas",
      });
    }

    // Vérification que le lapin existe dans la ferme
    const lapinExistant = await LapinExistant.findOne({
      where: {
        lapinexistantID: lapinId,
        carteRfidId:carteRfidId,
        FermeFermeID: fermeId,
      },
    });

    const lapinAutreFerme = await LapinAutreFerme.findOne({
      where: {
        lapinautrefermeID: lapinId,
        carteRfidId: carteRfidId,
        FermeFermeID: fermeId,
      },
    });

    if (!lapinExistant && !lapinAutreFerme) {
      return res.status(404).json({
        message: "Ce lapin n'existe pas dans la ferme",
      });
    }

    // Mise à jour des informations du lapin existant
    if (lapinExistant) {
      const {
        sexe,
        orientation,
        etapeDeveloppement,
        cage,
        raceId,
        mereId,
        pereId,
      } = req.body;
       await LapinExistant.update(
         {
           carteRfidId,
           sexe,
           orientation,
           etapeDeveloppement,
           cage,
           RaceRaceID: raceId,
           mereId,
           pereId,
         },
         { where: { lapinexistantID: lapinId, carteRfidId: carteRfidId } }
       );

      res.status(200).json({
        message: "Les informations du lapin existant ont été mises à jour",
        lapinExistant,
      });
    }

    // Mise à jour des informations du lapin provenant d'une autre ferme
    if (lapinAutreFerme) {
      const {
        sexe,
        orientation,
        etapeDeveloppement,
        cage,
        provenance,
        raceId,
      } = req.body;
      await LapinAutreFerme.update(
        {
          carteRfidId,
          sexe,
          orientation,
          etapeDeveloppement,
          cage,
          provenance,
          RaceRaceID: raceId,
        },
        { where: { lapinautrefermeID: lapinId, carteRfidId: carteRfidId } }
      );
       res.status(200).json({
         message: "Les informations du lapin provenant d'une autre ferme ont été mises à jour",
         lapinAutreFerme,
       });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }

};

//Controllers enregistrement de la vente
exports.saveVenteRabit = async (req, res) => {
  const { fermeId,carteRfidId,lapinId } = req.params;
  const userId = req.userId;
  
  try {
    // Vérification que la ferme appartient bien à l'utilisateur connecté
    const ferme = await Ferme.findOne({
      where: {
        fermeID: fermeId,
        ProprietaireProprietaireID: userId,
      },
    });

     if (!ferme) {
       return res.status(404).json({
         message: "Cette ferme n'existe pas ou ne vous appartient pas",
       });
    }
    //verifier l'existance du lapin 
      const lapinExistant = await LapinExistant.findOne({
        where: {
          lapinexistantID: lapinId,
          carteRfidId:carteRfidId,
          FermeFermeID: fermeId,
        },
      });

      const lapinAutreFerme = await LapinAutreFerme.findOne({
        where: {
          lapinautrefermeID: lapinId,
          carteRfidId:carteRfidId,
          FermeFermeID: fermeId,
        },
      });

      if (!lapinExistant && !lapinAutreFerme) {
        return res.status(404).json({
          message: "Ce lapin n'existe pas dans la ferme",
        });
    }
    
    if (lapinExistant) {
      const { dateVente, prix } = req.body;

      //Validation des entrés
      if (!dateVente || !prix) {
        return res.status(400).json({
          message: "Les champs sont obligatoires",
        });
      }
      const venteLapinExistant = await VenteLapin.create({
        dateVente,
        prix,
        LapinExistantLapinexistantID: lapinId,
      });
      await LapinExistant.update(
        {
          status: "VENDU",
        },
        { where: { lapinexistantID: lapinId } }
      );

       res.status(200).json({
         message: "Les informations de vente du lapin ont été enregistré avec succès",
         venteLapinExistant
       });
      
      
    }
    if (lapinAutreFerme) {
      const { dateVente, prix } = req.body;
      //Validation des entrees 
      if (!dateVente || !prix) {
        return res.status(400).json({
          message: "Les champs sont obligatoires",
        });
      }
      const venteLapinAutreFerme = await VenteLapin.create({
        dateVente,
        prix,
        LapinAutreFermeLapinautrefermeID: lapinId,
      });
         await LapinAutreFerme.update(
           {
             status: "VENDU",
           },
           { where: { lapinautrefermeID: lapinId } }
      );
      
       res.status(200).json({
         message: "Les informations de vente du lapin ont été enregistré avec succès",
         venteLapinAutreFerme
       });
      
    }

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Impossible d'enregistrer la vente." });
  }
};
//Controllers enregetremen de deces

exports.saveDecesRabit = async (req, res) => {
  const { fermeId,carteRfidId, lapinId } = req.params;
  const userId = req.userId;

   try {
     // Vérification que la ferme appartient bien à l'utilisateur connecté
     const ferme = await Ferme.findOne({
       where: {
         fermeID: fermeId,
         ProprietaireProprietaireID: userId,
       },
     });

     if (!ferme) {
       return res.status(404).json({
         message: "Cette ferme n'existe pas ou ne vous appartient pas",
       });
     }
     //verifier l'existance du lapin
     const lapinExistant = await LapinExistant.findOne({
       where: {
         lapinexistantID: lapinId,
         carteRfidId:carteRfidId,
         FermeFermeID: fermeId,
       },
     });

     const lapinAutreFerme = await LapinAutreFerme.findOne({
       where: {
         lapinautrefermeID: lapinId,
         carteRfidId:carteRfidId,
         FermeFermeID: fermeId,
       },
     });

     if (!lapinExistant && !lapinAutreFerme) {
       return res.status(404).json({
         message: "Ce lapin n'existe pas dans la ferme",
       });
     }

     if (lapinExistant) {
       const { dateDeces, cause } = req.body;

       //Validation des entres 
       if (!dateDeces || !cause) {
         return res.status(400).json({
           message: "Les champs sont obligatoires",
         });
       }
       const decesLapinExistant = await DecesLapin.create({
         dateDeces,
         cause,
         LapinExistantLapinexistantID: lapinId,
       });
       await LapinExistant.update(
         {
           status: "DECEDE",
         },
         { where: { lapinexistantID: lapinId } }
       );

       res.status(200).json({
         message:
           "Les informations de decès du lapin ont été enregistré avec succès",
         decesLapinExistant,
       });
     }
     if (lapinAutreFerme) {
       const { dateDeces, cause } = req.body;

       //Validation des entres
       if (!dateDeces || !cause) {
         return res.status(400).json({
           message: "Les champs sont obligatoires",
         });
       }
       const decesLapinAutreFerme = await DecesLapin.create({
         dateDeces,
         cause,
         LapinAutreFermeLapinautrefermeID: lapinId,
       });
       await LapinAutreFerme.update(
         {
           status: "DECEDE",
         },
         { where: { lapinautrefermeID: lapinId } }
       );

       res.status(200).json({
         message:
           "Les informations de decès du lapin ont été enregistré avec succès",
         decesLapinAutreFerme,
       });
     }

   } catch (error) {
     console.log(error);
     return res
       .status(500)
       .json({ error: "Impossible d'enregistrer le deces." });
   }
};
//Controllers listes des lapins
exports.getAllRabit = async (req, res) => {
  const { fermeId } = req.params;
  const userId = req.userId;
 const { searchId } = req.query;

  try {
    // Vérification que la ferme appartient bien à l'utilisateur connecté
    const ferme = await Ferme.findOne({
      where: {
        fermeID: fermeId,
        ProprietaireProprietaireID: userId,
      },
    });

    if (!ferme) {
      return res.status(404).json({
        message: "Cette ferme n'existe pas ou ne vous appartient pas",
      });
    }
     let lapinsExistant, lapinsAutreFerme;
    
    if (searchId) {
      // Récupérer les lapins correspondant à l'id de la carte RFID
      lapinsExistant = await LapinExistant.findAll({
        where: {
          FermeFermeID: fermeId,
          [Op.or]: [
            { carteRfidId: searchId },
            { pereId: searchId },
            { mereId: searchId },
          ],
        },
        include: [CodeQR, Race],
      });

      lapinsAutreFerme = await LapinAutreFerme.findAll({
        where: {
          FermeFermeID: fermeId,
          [Op.or]: [{ carteRfidId: searchId }],
        },
        include: [CodeQR, Race],
      });
    } else {
      // Récupérer les lapins existants de la ferme
       lapinsExistant = await LapinExistant.findAll({
        where: {
          FermeFermeID: fermeId,
        },
        include: [CodeQR, Race],
      });

      // Récupérer les lapins d'autres fermes de la ferme
       lapinsAutreFerme = await LapinAutreFerme.findAll({
        where: {
          FermeFermeID: fermeId,
        },
        include: [CodeQR, Race],
      });
    }

   
    res.status(200).json({ lapinsExistant, lapinsAutreFerme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }

};

//Controllers detail lapin
exports.getDetailRabit = async (req, res) => {
    const { fermeId, carteRfidId } = req.params;
    const userId = req.userId;

    try {
      // Vérification que la ferme appartient bien à l'utilisateur connecté
      const ferme = await Ferme.findOne({
        where: {
          fermeID: fermeId,
          ProprietaireProprietaireID: userId,
        },
      });

      if (!ferme) {
        return res.status(404).json({
          message: "Cette ferme n'existe pas ou ne vous appartient pas",
        });
      }

      // Recherche du lapin existant en fonction de son ID et de l'ID de la ferme
      const lapinExistant = await LapinExistant.findOne({
        where: {
          carteRfidId: carteRfidId,
          FermeFermeID: fermeId,
        },
        include: [
          {
            model: Race,
            attributes: ["name"],
          },]
      });

      if (lapinExistant) {
        return res.status(200).json({ lapin: lapinExistant });
      }

      // Recherche du lapin d'une autre ferme en fonction de son ID et de l'ID de la ferme
      const lapinAutreFerme = await LapinAutreFerme.findOne({
        where: {
          carteRfidId: carteRfidId,
          FermeFermeID: fermeId,
        },
        include: [
          {
            model: Race,
            attributes: ["name"],
          },
        ],
      });

      if (lapinAutreFerme) {
        return res.status(200).json({ lapin: lapinAutreFerme });
      }

      // Si aucun lapin n'est trouvé, renvoyer une erreur 404
      return res.status(404).json({ message: "Lapin non trouvé" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  

};

//Controllers supprimer un lapin
exports.deleteRabit = async (req, res) => {
  const { fermeId, lapinId, carteRfidId } = req.params;

  try {
    // Vérifier si le lapin appartient à la ferme
    const lapinExistant = await LapinExistant.findOne({
      where: { FermeFermeID: fermeId, lapinexistantID: lapinId, carteRfidId: carteRfidId },
    });

    // Si le lapin appartient à la ferme, supprimer
    if (lapinExistant) {
      await lapinExistant.destroy();
      res.status(200).json({ message: "Lapin supprimé avec succès" });
    } else {
      //vérifier s'il existe dans une autre ferme
      const lapinAutreFerme = await LapinAutreFerme.findOne({
        where: { FermeFermeID: fermeId, lapinautrefermeID: lapinId, carteRfidId: carteRfidId },
      });

      // Si le lapin existe dans une autre ferme, supprimer
      if (lapinAutreFerme) {
        await lapinAutreFerme.destroy();
        res.status(200).json({ message: "Lapin supprimé avec succès" });
      } else {
        // Si le lapin n'existe ni dans la ferme actuelle, ni dans une autre ferme, renvoyer une erreur
        res.status(404).json({ message: "Lapin introuvable" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};
