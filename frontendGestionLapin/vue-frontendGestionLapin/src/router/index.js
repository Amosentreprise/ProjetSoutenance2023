import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Welcomme",
    component: () => import("../views/commons/Welcome.vue"),
  },
  {
    path: "/Connexion",
    name: "Connexion",
    component: () => import("../views/commons/Connexion.vue"),
  },

  {
    path: "/ForgetPassword",
    name: "PasswordForget",
    component: () => import("../views/commons/PasswordForget.vue"),
  },
  {
    path: "/Inscription",
    name: "Inscription",
    component: () => import("../views/commons/Inscription.vue"),
  },
  {
    path: "/Erreur-500",
    name: "Erreur500",
    component: () => import("../views/pageGenerique/Erreur500.vue"),
  },
  {
    path: "/non-autorise",
    name: "Erreur401",
    component: () => import("../views/pageGenerique/Erreur401.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "Page not found",
    component: () => import("../views/pageGenerique/Erreur404.vue"),
  },
  {
    path: "/dashboard/:userId/ferme/:fermeId/",
    name: "BoardUser",
    component: () => import("../views/boardUsers/boardUser.vue"),
    children: [
      {
        path: "Home",
        name: "Home",
        component: () => import("../views/boardUsers/boadUserPages/Home.vue"),
      },
      {
        path: "Profil",
        name: "Profil",
        component: () => import("../views/boardUsers/boadUserPages/Profil.vue"),
      },
      {
        path: "ChangePassword",
        name: "ChangePassword",
        component: () => import("../components/ChangePassword.vue"),
      },
      {
        path: "EditProfil",
        name: "EditProfil",
        component: () => import("../components/EditProfil.vue"),
      },
      {
        path: "AddEleveur",
        name: "AddEleveur",
        component: () =>
          import("../views/boardUsers/boadUserPages/AddEleveur.vue"),
      },
      {
        path: "LapinView",
        name: "LapinView",
        component: () =>
          import("../views/boardUsers/boadUserPages/LapinView.vue"),
      },
      {
        path: "Diagnostic",
        name: "Diagnostic",
        component: () =>
          import("../views/boardUsers/boadUserPages/Diagnostic.vue"),
      },
      {
        path: "Enregistrement",
        name: "Enregistrement",
        component: () =>
          import("../views/boardUsers/boadUserPages/Enregistrement.vue"),
      },
      {
        path: "GererMesFermes",
        name: "GererMesFermes",
        component: () => import("../components/Ferme.vue"),
      },
      {
        path: "Notifications",
        name: "Notifications",
        component: () => import("../components/Notification.vue"),
      },
      {
        path: "CycleDeVie",
        name: "CycleDeVie",
        component: () => import("../views/boardUsers/boadUserPages/CycleVie.vue"),
      },
      {
        path: ":carteRfidId/VenteLapin/:lapinId",
        name: "VenteLapin",
        component: () =>
          import("../views/boardUsers/boadUserPages/VenteLapin.vue"),
      },
      {
        path: ":carteRfidId/DecesLapin/:lapinId",
        name: "DecesLapin",
        component: () =>
          import("../views/boardUsers/boadUserPages/DecesLapin.vue"),
      },
      {
        path: ":carteRfidId/EditLapin/:lapinId",
        name: "EditLapin",
        component: () => import("../components/EditProfilLapin.vue"),
      },
      {
        path: ":carteRfidId/ProfilLapin",
        name: "ProfilLapin",
        component: () =>
          import("../views/boardUsers/boadUserPages/ProfilLapin.vue"),
      },
      {
        path: "AddFerme",
        name: "AddFerme",
        component: () =>
          import("../views/boardUsers/boadUserPages/AddFerme.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
