<template>
  <div class="w-full mt-6 h-auto bg-primary">
    <h2 class="text-xl font-medium text-center mb-8">
      Renseigner la date de vente et le prix de vente
    </h2>
    <form class="w-auto md:w-[800px] mx-auto">
      <div class="mb-4">
        <label for="date" class="block font-medium mb-2">Date de vente</label>
        <input type="date" id="date" v-model="date" class="input" />
      </div>
      <div class="mb-4">
        <label for="price" class="block font-medium mb-2"
          >Prix de vente (en fcfa)</label
        >
        <input type="number" id="price" v-model.number="price" class="input" />
      </div>
      <div class="text-center">
        <Button
          :name="nameBtn"
          class="button bg-secondary text-white"
          @click="submitForm"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Button from "../../../components/Button.vue";
import axios from "axios";
export default {
  components: {
    Button,
  },
  data() {
    return {
      nameBtn: "ENREGISTRER",
      date: "",
      price: null,
    };
  },
  methods: {
    submitForm() {
      // Validation du formulaire
      if (!this.date || !this.price) {
        alert("Veuillez remplir tous les champs");
        return;
      }
      if (this.price <= 0) {
        alert("Le prix de vente doit être supérieur à 0");
        return;
      }
      // Envoi des données du formulaire à l'API ou au serveur
      const VenteLapin = {
        dateVente: this.date,
        prix: this.price,
      };
      console.log(VenteLapin);
      const token = localStorage.getItem("token");
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      const carteRfidId = localStorage.getItem("carteRfidId");
      const lapinId = localStorage.getItem("lapinId");
      axios
        .post(
          `http://localhost:3000/api/${fermeId}/lapin/${carteRfidId}/${lapinId}/vente`,
          VenteLapin,
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
  },
};
</script>
