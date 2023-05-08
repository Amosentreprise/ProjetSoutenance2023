const express = require('express');
const sequelize = require('./config/database')
//L'outil pour traiter les dornées envoyés dans le corps de la requete
const bodyParser = require("body-parser");

//importations des fichiers routes 
const routes = require('./Routers/routes');
const routerLapin = require("./Routers/routeLapin");

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api", routes);
app.use("/api", routerLapin);


app.listen(3000, () => {
    console.log("serveur d'application alumée")
})