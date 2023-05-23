const socketHandler = (socket) => {
  // Gérez vos événements socket ici

  console.log("Bienvenue");
  // Utilisez l'ID utilisateur pour afficher les informations spécifiques à l'utilisateur connecté
  const userId = socket.userId;
  console.log("Nouvelle connexion avec l'ID :", userId);
  socket.emit("welcome", "Bienvenue sur le site");
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.emit("deconnexion", "Vous etes deconnecte");
  });

  // Autres événements et logique de gestion des sockets
};

module.exports = socketHandler;
