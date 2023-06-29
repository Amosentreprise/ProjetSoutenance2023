<template>
  <div class="flex justify-center items-center relative">
    <form class="w-auto md:w-[400px] mt-10">
      <div>
        <div>
          <div
            class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p class="font-bold">Attention</p>
            <p>
              Vous êtes actuellement sur la {{ nameferme }} donc si vous ajoutez
              un éleveur, ce sera pour cette ferme.
            </p>
          </div>
          <div v-for="form in Forms" :key="form.id">
            <input
              :type="form.type"
              class="input shadow-md mt-3 p-3"
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
            data-modal-target="popup-modal"
            data-modal-toggle="popup-modal"
          />
        </div>
      </div>
    </form>
    <Modal
      :nameBtn="btnDownload"
      :event="succesAdd"
      :message="message"
      :image="image"
    />
  </div>
</template>
<script>
import { initFlowbite } from "flowbite";
import Button from "../../../components/Button.vue";
import Modal from "../../../components/Modal.vue";
import erreur from "../../../assets/effet/error.gif";
import succes from "../../../assets/effet/check.gif";
import chargement from "../../../assets/effet/chargement.gif";
import axios from "axios";
export default {
  components: {
    Button,
    Modal,
  },
  data() {
    return {
      BtnName: "VALIDER",
      message: "password",
      nameferme: "",
      current: false,
      image: chargement,
      btnDownload: "OK",
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
  mounted() {
    initFlowbite();
    this.nameferme = localStorage.getItem("nameFerme");
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
          if (response.status == 201) {
            console.log(response);
            this.image = succes;
            const retourAlaLigne = "<br/>";
            this.message = `${response.data.message} ${retourAlaLigne} mot de passe : ${response.data.password}`;
            this.current = true;
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.image = erreur;
            this.message = error.response.data.message;
          }
        });
    },
    succesAdd() {
      if (this.current) {
        const fermeId = localStorage.getItem("fermeId");
        const userId = localStorage.getItem("userId");
        this.$store.commit("setCurrentComponent2", null);
           this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Home`);
      }
    },
  },
};
</script>
