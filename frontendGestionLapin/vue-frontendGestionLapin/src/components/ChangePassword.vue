<template>

  <div class="flex justify-center items-center">
 <form class="w-auto md:w-[400px]">
    <div v-for="form in Forms" :key="form.id">
      <input
        :type="form.type"
        class="input  mt-2 p-3"
        :placeholder="form.placeholder"
        v-model="form.Value"
      />
    </div>
    <Button
      :name="BtnName"
      @click="submit"
      class="block w-full button bg-secondary text-white mt-3"
    />
  </form>
  </div>
 
</template>

<script>
import Button from "./Button.vue";
import axios from "axios";
export default {
  name: "ChangePassword",
  components: {
    Button,
  },

  data() {
    return {
      BtnName: "Valider",
      Forms: [
        {
          id: 1,
          type: "password",
          placeholder: "ancien mot de passe",
          Value: "",
        },
        {
          id: 2,
          type: "password",
          placeholder: "nouveau mot de passe",
          Value: "",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    submit() {
      // Récupération du token depuis le local storage
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://localhost:3000/api/change-password",
          {
            oldPassword: this.Forms[0].Value,
            newPassword: this.Forms[1].Value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
              const fermeId = localStorage.getItem("fermeId");
          const userId = localStorage.getItem("userId");
          console.log(response);
          this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Profil`);
            
          }
        
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
