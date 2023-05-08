<template>
  <div class="w-full h-auto flex flex-col">
    <span
      class="button bg-secondary hover:bg-secondaryhover text-white cursor-pointer text-center"
      >{{ name1 }}</span
    >

    <div class="flex">
      <div class="bg-white p-4 w-1/2 h-auto mx-auto">
        <h1 class="text-center font-poppins font-medium p-3">
          Liste de mes fermes
        </h1>
        <ul>
          <li v-for="item in fermeLenght" :key="item">
            {{ nomFerme[item - 1]
            }}<Button
              :name="btnName"
              @click="basculer(id[item - 1])"
              class="ml-2 bg-secondary cursor-pointer text-white"
            />
            <Button
              :name="btnName2"
              @click="delete id[item - 1]"
              class="ml-2 bg-red-500 hover:bg-red-400 cursor-pointer text-white"
            />
          </li>
        </ul>
      </div>
      <div class="w-1/2 bg-primary">
        <div class="flex justify-evenly">
          <span
            class="button bg-secondary hover:bg-secondaryhover text-white cursor-pointer"
            @click="showFermeForm"
            >{{ name2 }}</span
          >
          <span
            class="button bg-secondary hover:bg-secondaryhover text-white cursor-pointer"
            @click="showEleveurForm"
            >{{ name3 }}</span
          >
        </div>
        <div
          class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 m-4"
          role="alert"
          v-show="currentComponent == null"
        >
          <p class="font-bold">Information 1</p>
          <p>
            Vous êtes actuellement sur la {{ nameferme }}. Avez vous d'autre
            fermes ? Appuyer sur le bouton ajouter ferme pour ajouter vos fermes
            toujours avec les mêmes comptes
          </p>
        </div>
        <div
          class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 m-4"
          role="alert"
          v-show="currentComponent == null"
        >
          <p class="font-bold">Information 2</p>
          <p>
            vous pouvez également ajouter des éleveurs sur votre ferme. Ils vont
            uniquement assurer la gestion des lapins sur la plateforme. Appuyer
            sur le bouton Ajouter un eleveur
          </p>
        </div>
        <component :is="currentComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import axios from "axios";
import AddFerme from "../views/boardUsers/boadUserPages/AddFerme.vue";
import AddEleveur from "../views/boardUsers/boadUserPages/AddEleveur.vue";

export default {
  components: {
    Button,
    AddFerme,
    AddEleveur,
  },
  data() {
    return {
      name1: "Gérer mes fermes",
      name2: "Ajouter un ferme",
      name3: "Ajouter un eleveur",
      nameferme: "",
      currentComponent: null,
      id: [],
      nomFerme: [],
      fermeLenght: 0,
      btnName: "Basculer",
      btnName2: "Suprimer",
    };
  },
  mounted() {
    this.nameferme = localStorage.getItem("nameFerme");
    // Récupération du token depuis le local storage
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/fermes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((ferme) => {
        for (let index = 0; index < ferme.data.length; index++) {
          this.id.push(ferme.data[index].fermeID);
          this.nomFerme.push(ferme.data[index].nomFerme);
         
          this.fermeLenght = ferme.data.length;
          
        }

        console.log(ferme);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    basculer(id) {
      const token = localStorage.getItem("token");
      localStorage.setItem("fermeId", id);

      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");

      axios
        .get(`http://localhost:3000/api/switch/${fermeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((ferme) => {
          console.log(ferme.nomFerme);
          const nameFerme = ferme.data.nomFerme;
          localStorage.setItem("nameFerme", nameFerme);
          location.reload();
        })
        .catch((error) => console.log(error));
      this.$router.replace(`/dashboard/${userId}/ferme/${fermeId}/Home`);
    },
    delete(id) {},
    showFermeForm() {
      this.currentComponent = "AddFerme";
      this.$store.commit("setActionName", "/ GestionFerme / AddFerme");
    },
    showEleveurForm() {
      this.currentComponent = "AddEleveur";
      this.$store.commit("setActionName", "/ GestionFerme / AddEleveur");
    },
  },
};
</script>
