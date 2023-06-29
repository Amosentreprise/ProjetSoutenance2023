<template>
  <div>
    <Button :name="btnName" class="button bg-secondary hover:bg-secondaryhover text-white" @click="pageRetour"/>
    <div class="">
      <h2 class="font-bold text-center">{{ symptome.nom }}</h2>
      <ul class="p-8">
        <li class="pt-2 text-sm font-poppins font-medium">
          Nom de la maladie :
          <span class="text-sm font-poppins text-orange-500">{{
            maladies.nom
          }}</span>
        </li>
        <li class="pt-2 text-sm font-poppins font-medium">
          Traitement :
          <span class="text-sm font-poppins text-orange-500">{{
            maladies.traitement
          }}</span>
        </li>
        <li class="pt-2 text-sm font-poppins font-medium">
          Prophylaxie :
          <span class="text-sm font-poppins text-orange-500">{{
            maladies.prophylaxie
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import axios from "axios";
export default {
  name: "DiagnosticResultat",
  components: {
    Button,
  },

  data() {
    return {
      maladies: {},
        symptome: {},
      btnName:'RETOUR'
    };
  },

  mounted() {
    const val = localStorage.getItem("symptomeId");
    const symptomeId = parseInt(val);
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3000/api/maladies/${symptomeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.maladies = response.data.Maladie;
        this.symptome = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },

    methods: {
        pageRetour() {
          this.$store.commit("setCurrentComponent", "DiagnosticRecherche");
    }
  },
};
</script>

<style lang="scss" scoped></style>
