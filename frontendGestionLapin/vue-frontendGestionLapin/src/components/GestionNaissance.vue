<template>
  <div
    :id="id"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full font-montsserat">
      <div class="relative bg-white rounded-lg shadow">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          :data-modal-hide="datahide"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Enregistrer le resultat de la naissance
          </h3>
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Lapin 33 et lapine 300
          </h3>
          <form class="space-y-6">
            <div class="mb-4">
              <label for="date" class="block font-medium mb-2"
                >Date de naissance</label
              >
              <input type="date" id="date" v-model="date" class="input ring-2 ring-gray-500" />
            </div>
            <div class="mb-4">
              <label for="lapereau" class="block font-medium mb-2 "
                >Nombre de lapereau</label
              >
              <input
                type="number"
                id="lapereau"
                v-model.number="nombreLapereau"
                class="input ring-2 ring-gray-500"
              />
            </div>
            <div class="mb-4">
              <label class="block font-bold mb-2 " for="observation"
                >Observation</label
              >
              <textarea
                class="input resize-none ring-2 ring-gray-500"
                id="observation"
                v-model="observation"
                required
              ></textarea>
            </div>
            <Button
              :name="nameBtn"
              class="button bg-secondary text-white"
              @click="submitForm"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "FrontendGestionLapinGestionNaissance",
  components: {
    Button,
  },
  props:["id","datahide"],
  data() {
    return {
      nameBtn: "ENREGISTRER",
      nombreLapereau: null,
      date: "",
      observation: "",
    };
  },

  mounted() {},

  methods: {
    submitForm() {
      // Validation du formulaire
      if (!this.date || !this.observation || !this.nombreLapereau) {
        alert("Veuillez remplir tous les champs");
        return;
      }

      // Envoi des données du formulaire à l'API ou au serveur
      const NaissanceLapin = {
        dateNaissance: this.date,
        observation: this.observation,
        nombreLapereau: this.nombreLapereau,
      };
          console.log(NaissanceLapin);
      
        const fermeId = localStorage.getItem("fermeId");
          const userId = localStorage.getItem("userId");
      this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/CycleDeVie`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
