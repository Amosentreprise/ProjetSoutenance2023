const express = require("express");
const sequelize = require("./config/database");
const http = require("http");
const socketIO = require("socket.io");
const socketHandler = require("./Socket/socketHandler");
const socketAuthMiddleware = require("./middleware/socketAuthMiddleware");
require('./gestionDetaches/EtapeVie')
require('./gestionDetaches/Recomandation');
//L'outil pour traiter les dornées envoyés dans le corps de la requete
const bodyParser = require("body-parser");

//importations des fichiers routes
const routes = require("./Routers/routes");
const routerLapin = require("./Routers/routeLapin");
const routerMaladie = require("./Routers/routeDiagnosticMaladie");
const routerStatistique = require("./Routers/routeStatistique");

//Initialisation SERVEUR DE BASE DE DONNES

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

//Initialisation SERVEUR D'APPLICATION
const app = express();

/*l'erreur cors*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api", routes);
app.use("/api", routerLapin);
app.use("/api", routerMaladie);
app.use("/api", routerStatistique);

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

//io.use(socketAuthMiddleware); // Utilisez le middleware d'authentification des sockets

//Les evenements socket
io.on("connection", (socket) => {
  socketHandler(socket);
 
});

server.listen(3000, () => {
  console.log(
    "Serveur Express avec Socket.IO en cours d'exécution sur le port 3000"
  );
});
