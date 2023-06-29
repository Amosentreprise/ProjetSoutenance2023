<template>
  <div class="flex justify-center">
    <div>
      <img src="../assets/effet/search.gif" alt="" class="mx-auto" />
      <h2 class="font-milky">
        Selectionnez un symptône que vous avez observé au niveau de votre lapin
      </h2>
      <form>
        <div class="mt-2">
          <select class="input mt-2 p-2" v-model="symptomeID">
            <option
              v-for="symptome in symptomes"
              :key="symptome.symptomeID"
              :value="symptome.symptomeID"
              class="p-4 font-montssera"
            >
              {{ symptome.nom }}
            </option>
          </select>
        </div>
        <div class="flex mt-6">
          <Button
            :name="btnName"
            class="button bg-secondary hover:bg-secondaryhover text-white mx-auto"
            @click="pageResult()"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import axios from "axios";
export default {
  name: "DiagnosticRecherche",
  components: {
    Button,
  },

  data() {
    return {
      btnName: "RECHERCHER",
      symptomes: [],
      symptomeID: "",
    };
  },

  mounted() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/symptomes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.symptomes = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    pageResult() {
      localStorage.setItem("symptomeId", this.symptomeID);

      this.$store.commit("setCurrentComponent", "DiagnosticResultat");
    },
  },
};
</script>

<style lang="scss" scoped></style>
