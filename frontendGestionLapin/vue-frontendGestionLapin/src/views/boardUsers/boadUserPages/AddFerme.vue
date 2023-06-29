<template>
  <div class="flex justify-center items-center">
    <form class="w-auto md:w-[400px] m-auto mt-10">
      <div>
        <div>
          <Toast :message="message" v-show="showdiv == true" :classe="classToast"/>
          <div v-for="form in Forms" :key="form.id">
            <input
              :type="form.type"
              class="input shadow-md mt-3 p-3"
              :placeholder="form.placeholder"
              v-model="form.Value"
              required="required"
            />
          </div>
        </div>
        <div>
          <Button
            :name="BtnName"
            @click="AddFerme"
            class="block w-full button bg-secondary text-white mt-3"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Button from "../../../components/Button.vue";
import axios from "axios";
import Toast from "../../../components/Toast.vue";
import Modal from "../../../components/Modal.vue";

export default {
  components: {
    Button,
    Toast,
    Modal
  },
  data() {
    return {
      BtnName: "VALIDER",
      message: "",
      showdiv: null,
      classToast:"bg-red-500 flex text-white p-4 rounded-md",

      Forms: [
        {
          id: 1,
          type: "text",
          placeholder: "Nom de la ferme",
          Value: "",
          errors: [],
        },
        {
          id: 2,
          type: "text",
          placeholder: "Adresse",
          Value: "",
          errors: [],
        },
      ],
    };
  },
  computed: {},
  methods: {
    AddFerme() {
      // Récupération du token depuis le local storage

      const token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/Addferme",
          {
            nomferme: this.Forms[0].Value,
            adressferme: this.Forms[1].Value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 201) {
           this.message = "Ajout de ferme effectué avec succès";
            this.showdiv = true; // Affiche le div
            this.classToast = "bg-blue-500 flex text-white p-4 rounded-md"
            setTimeout(() => {
              this.showdiv = false; // Cache le div
              this.$store.commit("setCurrentComponent2", null);
              location.reload();
            }, 3000);
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 400) {
            this.message = error.response.data.message;
            this.showdiv = true; // Affiche le div
            setTimeout(() => {
              this.showdiv = false; // Cache le div
            }, 3000);
          }
        });
    },
   
  },
  mounted() {},
};
</script>
