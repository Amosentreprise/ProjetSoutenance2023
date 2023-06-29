<template>
  <div class="w-full flex flex-col justify-center realtive">
    <Button
      :name="btnRetour"
      class="button bg-secondary hover:bg-secondaryhover text-white"
      @click="changePage"
    />
    <div class="">
      <h2 class="font-bold text-center">{{ infoslapin.carteRfidId }}</h2>
      <ul class="p-8">
        <li class="pt-2 text-sm font-poppins font-medium">
          Numero de cage :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.cage
          }}</span>
        </li>
        <li class="pt-2 text-sm font-poppins font-medium">
          La race :
          <span class="text-sm font-poppins text-orange-500">{{
            raceLapin
          }}</span>
        </li>
        <li class="pt-2 text-sm font-poppins font-medium">
          Son sexe :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.sexe
          }}</span>
        </li>
        <li class="pt-2 text-sm font-poppins font-medium">
          Son orientation :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.orientation
          }}</span>
        </li>
        <li class="pt-2 text-sm font-poppins font-medium">
          Niveau de vie :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.etapeDeveloppement
          }}</span>
        </li>
        <li class="pt-2 text-sm font-poppins font-medium">
          status :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.status
          }}</span>
        </li>
        <li
          class="pt-2 text-sm font-poppins font-medium"
          v-if="infoslapin.pereId"
        >
          id du père :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.pereId
          }}</span>
        </li>
        <li
          class="pt-2 text-sm font-poppins font-medium"
          v-if="infoslapin.mereId"
        >
          id de la mère :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.mereId
          }}</span>
        </li>
        <li
          class="pt-2 text-sm font-poppins font-medium"
          v-if="infoslapin.provenance"
        >
          Provenance :
          <span class="text-sm font-poppins text-orange-500">{{
            infoslapin.provenance
          }}</span>
        </li>
      </ul>
    </div>
    <div class="flex justify-evenly">
      <Button
        :name="btnvente"
        class="button bg-secondary hover:bg-secondaryhover text-white"
        @click="showVenteForm"
      />
      <Button
        :name="btnDeces"
        class="button bg-red-600 hover:bg-red-500 text-white"
        @click="showDecesForm"
      />
      <Button
        :name="btnEdit"
        class="button bg-secondary hover:bg-secondaryhover text-white"
        @click="showEditForm"
      />
      <Button
        :name="btndelete"
        class="button bg-red-600 hover:bg-red-500 text-white"
        @click="showLapinViewpage"
      />
    </div>
  </div>
</template>

<script>
import Button from "../../../components/Button.vue";
import VenteLapin from "./VenteLapin.vue";
import DecesLapin from "./DecesLapin.vue";
import axios from "axios";
export default {
  name: "ProfilLapin",
  components: {
    Button,
    VenteLapin,
    DecesLapin,
  },

  data() {
    return {
      btnRetour: "Retour",
      btnvente: "ENREGISTRER LA VENTE",
      btnDeces: "ENREGISTRER LE DECES",
      btndelete: "SUPPRIMER",
      btnEdit: "MODIFIER LES INFORMATIONS",
      fermeId: null,
      carteRfidId: null,
      currentComponent: null,
      infoslapin: {},
      raceLapin: null,
    };
  },

  mounted() {
     this.$store.commit("setActionName", "/ GestionLapin / ProfilLapin");
    // Récupération du token depuis le local storage
    const token = localStorage.getItem("token");
    this.fermeId = this.$route.params.fermeId;
    const fermeId = this.fermeId;
    this.carteRfidId = this.$route.params.carteRfidId;
    const carteRfidId = this.carteRfidId;

    axios
      .get(`http://localhost:3000/api/${fermeId}/lapin/${carteRfidId}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.infoslapin = response.data.lapin;
        this.raceLapin = response.data.lapin.Race.name;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    changePage() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/LapinView`);
      this.$store.commit("setActionName", "/ GestionLapin");
    },
    showVenteForm() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      const carteRfidId = localStorage.getItem("carteRfidId");
      const lapinId = localStorage.getItem("lapinId");
      this.$store.commit("setActionName", "/ GestionLapin / VenteLapin");
      this.$router.push(
        `/dashboard/${userId}/ferme/${fermeId}/${carteRfidId}/VenteLapin/${lapinId}`
      );
    },
    showDecesForm() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      const carteRfidId = localStorage.getItem("carteRfidId");
      const lapinId = localStorage.getItem("lapinId");
      this.$store.commit("setActionName", "/ GestionLapin / DecesLapin");
      this.$router.push(
        `/dashboard/${userId}/ferme/${fermeId}/${carteRfidId}/DecesLapin/${lapinId}`
      );
    },
    showEditForm() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      const carteRfidId = localStorage.getItem("carteRfidId");
      const lapinId = localStorage.getItem("lapinId");
      this.$router.push(
        `/dashboard/${userId}/ferme/${fermeId}/${carteRfidId}/EditLapin/${lapinId}`
      );
    },
    showLapinViewpage() {
      const token = localStorage.getItem("token");
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      const carteRfidId = localStorage.getItem("carteRfidId");
      const lapinId = localStorage.getItem("lapinId");
      axios
        .delete(
          `http://localhost:3000/api/${fermeId}/lapin/${carteRfidId}/${lapinId}/supression`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            this.$router.push(
              `/dashboard/${userId}/ferme/${fermeId}/LapinView`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
