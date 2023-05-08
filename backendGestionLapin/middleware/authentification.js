const jwt = require("jsonwebtoken");
const { Proprietaire } = require("../Models/association");

const JWT_SIGN_SECRET = "1AHKLDJKJKKDMMMMMMD8400347483093039848589948SHJDCK";

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    // Extract the token from the request header

    if (!token) {
      return res.status(401).json({
        message: "Vous devez être authentifié pour accéder à cette ressource.",
      });
    }

    // Verify the token and extract the userId
    const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    const eleveurId = decodedToken.eleveurId;

    // Attach the userId to the request object for use in subsequent middleware or routes
    req.userId = userId;
    req.role = role;
    req.eleveurId = eleveurId;
    // Check if the user exists in the database
    const user = await Proprietaire.findByPk(userId);

    if (!user) {
      return res.status(401).json({ user });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({message : "connexion impossible",error});
  }
};

module.exports = authenticateUser;
