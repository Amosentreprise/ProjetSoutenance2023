<template>
  <form class="w-[400px]">
    <div v-for="form in Forms" :key="form.id" class="w-full">
      <input
        :type="form.type"
        class="input shadow-md"
        :placeholder="form.placeholder"
        v-model="form.Value"
        v-show="form.role === '2'"
      />
    </div>
    <Button
      :name="BtnName"
      @click="submit"
      class="block w-full button bg-secondary text-white mt-3"
    />
  </form>
</template>

<script>
import Button from "./Button.vue";
import axios from "axios";
export default {
  name: "EditProfil",
  components: {
    Button,
  },

  data() {
    return {
      BtnName: "Valider",
      Forms: [
        {
          id: 1,
          type: "text",
          placeholder: "Nom",
          Value: "",
          role: "2",
        },
        {
          id: 2,
          type: "text",
          placeholder: "Prénoms",
          Value: "",
          role: "2",
        },
        {
          id: 3,
          type: "email",
          placeholder: "Email",
          Value: "",
          role: "2",
        },
        {
          id: 4,
          type: "tel",
          placeholder: "Telephone",
          Value: "",
          role: "2",
        },
      ],
    };
  },

  mounted() {
    const role = localStorage.getItem("roleId");
    if (role === "1") {
      this.Forms[2].role = "1";
    }
      const token = localStorage.getItem("token");

    // Ajout du token dans les headers d'une requête
    axios
      .get("http://localhost:3000/api/dashboard/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.proprietaire) {
         
          this.Forms[0].Value = response.data.proprietaire.nom;
          this.Forms[1].Value = response.data.proprietaire.prenom;
          this.Forms[2].Value = response.data.proprietaire.email;
          this.Forms[3].Value = response.data.proprietaire.numerosTel;
        }
        if (response.data.eleveur) {
         
          this.Forms[0].Value = response.data.eleveur.nom;
          this.Forms[1].Value= response.data.eleveur.prenom;
          this.Forms[3].Value = response.data.eleveur.numerosTel;
        }

        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    submit() {
      // Récupération du token depuis le local storage
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://localhost:3000/api/edit-profil",
          {
            nom: this.Forms[0].Value,
            prenom: this.Forms[1].Value,
            email: this.Forms[2].Value,
            numerosTel: this.Forms[3].Value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {

        })
        .catch(error => {
              console.log(error)
        })
      
    
        const fermeId = localStorage.getItem("fermeId");
          const userId = localStorage.getItem("userId");
       

          this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
