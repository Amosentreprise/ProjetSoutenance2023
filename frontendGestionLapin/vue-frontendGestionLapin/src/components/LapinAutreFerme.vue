<template>
  <div class="w-full min-h-screen relative">
    <form class="w-auto md:w-[600px] mx-auto">
      <h1 class="text-center text-xl font-medium text-gray-900">
        Enregistrement de lapin provenant d'une autre ferme
      </h1>
      <div v-for="form in Forms" :key="form.id" class="mt-2">
        <label
          for=""
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >{{ form.labelname }}</label
        >
        <input
          class="input p-2"
          :type="form.type"
          v-model="form.Value"
          :placeholder="form.placeholder"
        />
      </div>
      <div class="mt-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-white"
          >La race</label
        >
        <select class="input mt-2 p-2" v-model="raceID">
          <option v-for="race in races" :key="race.raceID" :value="race.raceID">
            {{ race.name }}
          </option>
        </select>
      </div>

      <div v-for="form in FormTypeSelect" :key="form.id" class="mt-2">
        <label
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >{{ form.label }}</label
        >
        <select class="input p-2" v-model="form.Value">
          <option selected>{{ form.Value }}</option>
          <option
            v-for="option in form.options"
            :key="option.id"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <Button
        :name="BtnName"
        class="button bg-secondary hover:bg-secondaryhover mt-6 mx-auto text-white"
        @click="saveData"
        :message="message"
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
      />
    </form>
    <Modal :nameBtn="btnDownload" :event="downloadCodeQr" :image="image" />
  </div>
</template>

<script>
import { initFlowbite } from "flowbite";
import Button from "./Button.vue";
import Modal from "./Modal.vue";

import loading from "../assets/icones/loading.png";
import axios from "axios";
export default {
  name: "LapinAutreFerme",
  components: {
    Button,
    Modal,
  },

  data() {
    return {
      BtnName: "ENREGISTRER",
      btnDownload: "TELECHARGER",
      image: loading,
      state: false,
      races: [],
      raceID: "",
      message: "",
      FormTypeSelect: [
        {
          id: 2,

          label: "Son sexe",
          Value: "Choisir une option",
          options: [
            {
              id: 3,
              name: "Mâle",
            },
            {
              id: 4,
              name: "Femelle",
            },
          ],
        },
        {
          id: 3,

          label: "Orientation",
          Value: "Choisir une option",
          options: [
            {
              id: 5,
              name: "ENGRAISSEMENT",
            },
            {
              id: 6,
              name: "ACCOUPLEMENT",
            },
          ],
        },
        {
          id: 4,
          Value: "Choisir une option",
          label: "Niveau de vie",
          options: [
            {
              id: 6,
              name: "0 - 2 Semaines",
            },
            {
              id: 7,
              name: "2 - 4 semaines",
            },

            {
              id: 8,
              name: "4 - 6 mois",
            },

            {
              id: 10,
              name: "6 - 2 ans",
            },
            {
              id: 11,
              name: "2 - 5 ans",
            },
            {
              id: 12,
              name: "5 ans et plus",
            },
          ],
        },
      ],

      Forms: [
        {
          id: 1,
          type: "text",
          placeholder: "EX : 1004",
          Value: "",
          labelname: "ID DE LA CARTE RFID DU LAPIN",
        },
        {
          id: 2,
          type: "text",
          placeholder: "EX : 10",
          Value: "",
          labelname: "Numéro de cage",
        },
        {
          id: 3,
          type: "text",
          placeholder: "EX : LOKOSSA",
          Value: "",
          labelname: "Provenance",
        },
      ],
    };
  },

  mounted() {
    initFlowbite();
    // Récupération du token depuis le local storage
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/races", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.races = response.data.races;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    saveData() {
      this.state = true;
      const Lapin = {
        carteRfidId: this.Forms[0].Value,
        sexe: this.FormTypeSelect[0].Value,
        orientation: this.FormTypeSelect[1].Value,
        etapeDeveloppement: this.FormTypeSelect[2].Value,
        cage: this.Forms[1].Value,
        provenance: this.Forms[2].Value,
        raceId: this.raceID,
      };
      console.log(Lapin);
      const fermeId = localStorage.getItem("fermeId");
      const token = localStorage.getItem("token");
      axios
        .post(`http://localhost:3000/api/${fermeId}/lapin/AutreFerme`, Lapin, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status == 201) {
            console.log(response);
            // la variable "lapinQRCode" contient la chaîne de caractères correspondant à l'image QR code encodée en base64

            this.image = response.data.lapinQRCode;
            this.message = "Enregistrement effectué avec succès.";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    downloadCodeQr() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/LapinView`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
