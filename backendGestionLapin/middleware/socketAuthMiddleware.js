// const jwt = require("jsonwebtoken");
// const JWT_SIGN_SECRET = "1AHKLDJKJKKDMMMMMMD8400347483093039848589948SHJDCK";

// const socketAuthMiddleware = (socket, next) => {
//   // Vérifiez l'authentification ici
//   const token = socket.handshake.auth.token;

//   if (token) {
//     // Vérifiez et décodez le token, puis attachez les informations à l'objet socket ou au contexte
//     const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
//     const userId = decodedToken.userId;
//     socket.userId = userId;
//     next();
//   } else {
//     // Si l'authentification échoue, vous pouvez appeler `next` avec un argument pour signaler une erreur
//     next(new Error("Authentification échouée"));
//   }
// };

// module.exports = socketAuthMiddleware;
