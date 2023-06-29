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
          <li v-for="ferme in fermes" :key="ferme.fermeID">
            {{ ferme.nomFerme
            }}<Button
              v-if="ferme.fermeID != fermeActu"
              :name="btnName"
              @click="basculer(ferme.fermeID)"
              class="ml-2 bg-secondary cursor-pointer text-white"
            />
            <Button
              v-if="ferme.fermeID != fermeActu"
              :name="btnName2"
              @click="deleteFerme(ferme.fermeID)"
              class="ml-2 bg-red-500 hover:bg-red-400 cursor-pointer text-white"
            />
            <span
              v-if="ferme.fermeID == fermeActu"
              class="p-4 font-medium text-blue-500"
              >Connectée</span
            >
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
      name2: "Ajouter une ferme",
      name3: "Ajouter un eleveur",
      nameferme: "",
      fermes: [],
      btnName: "Basculer",
      btnName2: "Suprimer",
      fermeActu: 0,
    };
  },
  computed: {
    currentComponent() {
      return this.$store.state.currentComponent2;
    },
  },
  mounted() {
    this.fermeActu = this.$route.params.fermeId;
    console.log(this.fermeActu);
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
        this.fermes = ferme.data;
        console.log(ferme.data);
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
          this.$store.state.nameDashboard = localStorage.getItem("nameFerme");

          this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Home`);
        })
        .catch((error) => console.log(error));
    },
    async deleteFerme(fermeId) {
      const token = localStorage.getItem("token");
      try {
        const deleteFerme = await axios.delete(
          `http://localhost:3000/api/Deleteferme/${fermeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (deleteFerme.status == 200) {
          const ferme = await axios.get("http://localhost:3000/api/fermes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.fermes = ferme.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    showFermeForm() {
      this.$store.commit("setCurrentComponent2", "AddFerme");
      this.$store.commit("setActionName", "/ GestionFerme / AddFerme");
    },
    showEleveurForm() {
      this.$store.commit("setCurrentComponent2", "AddEleveur");
      this.$store.commit("setActionName", "/ GestionFerme / AddEleveur");
    },
  },
};
</script>
