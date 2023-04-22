
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
    path: "/dashboard/:userId/ferme/:fermeId/",
    name: "BoardUser",
    component: () => import("../views/boardUsers/boardUser.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/boardUsers/boadUserPages/Home.vue"),
      },
      {
        path: "Profil",
        name: "Profil",
        component: () => import("../views/boardUsers/boadUserPages/Profil.vue"),
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