<template>
  <div class="w-full mt-6 h-full bg-primary relative">
    <h1 class="text-xl font-medium text-center mb-8">Renseignez les informations sur le décès du lapin</h1>
    <form  class="w-auto md:w-[800px] mx-auto">
      <div class="mb-4">
        <label class="block font-bold mb-2" for="date">Date du décès :</label>
        <input class="input" id="date" type="date" v-model="date" required>
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-2" for="cause">Cause du décès :</label>
        <textarea class="input resize-none" id="cause" v-model="cause" required></textarea>
      </div>
      <div class="text-center">
       <Button :name="nameBtn" class="button bg-secondary text-white" @click="submitForm"/>
      </div>
    </form>
  </div>
</template>

<script>
import Button from '../../../components/Button.vue';
import axios from "axios";
export default {
    name: "DecesLapin",
    components: {
    Button
  },
  data() {
      return {
    nameBtn:'ENREGISTRER',
      date: "",
      cause: ""
    };
  },
    methods: {
   
       submitForm() {
      // Validation du formulaire
   
      // Envoi des données du formulaire à l'API ou au serveur
      const DecesLapin = {
        dateDeces: this.date,
        cause: this.cause
      };
      console.log(DecesLapin);
      const token = localStorage.getItem("token");
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      const carteRfidId = localStorage.getItem("carteRfidId");
      const lapinId = localStorage.getItem("lapinId");
      axios
        .post(
          `http://localhost:3000/api/${fermeId}/lapin/${carteRfidId}/${lapinId}/deces`,
          DecesLapin,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
            // la variable "lapinQRCode" contient la chaîne de caractères correspondant à l'image QR code encodée en base64
            this.$router.push(
              `/dashboard/${userId}/ferme/${fermeId}/${carteRfidId}/ProfilLapin`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
  }

};
</script>

<style scoped>
/* Add your custom styles here */
</style>
