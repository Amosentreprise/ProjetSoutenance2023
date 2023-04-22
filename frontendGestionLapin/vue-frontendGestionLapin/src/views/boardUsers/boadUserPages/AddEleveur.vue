<template>
  <div class="flex">
    <form class="w-[400px] m-auto mt-10">
      <div>
        <div>
          <div v-for="form in Forms" :key="form.id">
            <input
              :type="form.type"
              class="input shadow-md"
              :placeholder="form.placeholder"
              v-model="form.Value"
            />
          </div>
        </div>
        <div>
          <Button
            :name="BtnName"
            class="block w-full button bg-secondary text-white mt-3"
            @click="AddEleveur"
          />
        </div>
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
      BtnName: "VALIDER",

      Forms: [
        {
          id: 1,
          type: "text",
          placeholder: "Nom de l'eleveur",
          Value: "",
        },
        {
          id: 2,
          type: "text",
          placeholder: "Prenom de l'eleveur",
          Value: "",
        },
        {
          id: 3,
          type: "tel",
          placeholder: "Son numero",
          Value: "",
        },
      ],
    };
  },
  methods: {
    AddEleveur() {
      // Récupération du token depuis le local storage
      const fermeId = localStorage.getItem("fermeId");
      const token = localStorage.getItem("token");

      axios
        .post(
          `http://localhost:3000/api/ferme/${fermeId}/eleveur`,
          {
            nomEleveur: this.Forms[0].Value,
            prenomEleveur: this.Forms[1].Value,
            numerosEleveur: this.Forms[2].Value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
