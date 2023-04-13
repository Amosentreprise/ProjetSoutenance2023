
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
    path: "/Inscription",
    name: "Inscription",
    component: () => import("../views/commons/Inscription.vue"),
  },
  {
    path: "/BoardUser",
    name: "BoardUser",
    component: () => import("../views/boardUsers/boardUser.vue"),
    children: [
      {
        path: "/cd",
        name: "Home",
        component: () => import("../views/commons/Connexion.vue"),
      },]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;