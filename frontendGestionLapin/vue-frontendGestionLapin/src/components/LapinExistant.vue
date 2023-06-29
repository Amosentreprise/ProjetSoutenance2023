<template>
  <div class="w-full min-h-screen relative">
    <form class="w-auto md:w-[600px] mx-auto">
      <h1 class="text-center text-xl font-medium text-gray-900">
        Enregistrement de lapin Existant
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

      <div class="mt-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-white"
          >Identifiant du pere</label
        >
        <select class="input mt-2 p-2" v-model="maleVal">
          <option value="Pas de pere" selected>Pas de pere</option>
          <option
            v-for="male in males"
            :key="male.carteRfidId"
            :value="male.carteRfidId"
          >
            {{ male.carteRfidId }}
          </option>
        </select>
      </div>
      <div class="mt-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-white"
          >Identifiant de la mere</label
        >
        <select class="input mt-2 p-2" v-model="femeleVal">
          <option value="Pas de mere" selected="">Pas de mere</option>
          <option
            v-for="femele in femeles"
            :key="femele.carteRfidId"
            :value="femele.carteRfidId"
          >
            {{ femele.carteRfidId }}
          </option>
        </select>
      </div>

      <Button
        :name="BtnName"
        class="button bg-secondary hover:bg-secondaryhover mt-6 mx-auto text-white"
        @click="saveData"
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
      />
      <Modal
        :nameBtn="btnDownload"
        :event="downloadCodeQr"
        :message="message"
        :image="image"
      />
    </form>
  </div>
</template>

<script>
import { initFlowbite } from "flowbite";
import Modal from "./Modal.vue";

import Button from "./Button.vue";
import loading from "../assets/icones/loading.png";
import loading2 from "../assets/icones/loading2.gif";

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
      image: loading2,
      state: false,
      raceID: "",
      races: [],
      males: [],
      maleVal: "",
      femeles: [],
      femeleVal: "",
      message: "",
      btnDownload: "TELECHARGER",
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

          label: "Niveau de vie",
          Value: "Choisir une option",
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
          placeholder: "EX : 10, A1",
          Value: "",
          labelname: "Numéro de cage",
        },
      ],
    };
  },

  mounted() {
    initFlowbite();
    // Récupération du token et l'id de la ferme depuis le local storage
    const token = localStorage.getItem("token");
    const fermeId = localStorage.getItem("fermeId");
    //recuperation des races depuis la tables races
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
    //recuperation id male
    axios
      .get(`http://localhost:3000/api/${fermeId}/lapinmaleid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.males = response.data;
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    //recuperation id femelle
    axios
      .get(`http://localhost:3000/api/${fermeId}/lapinfemelleid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.femeles = response.data;
        console.log(response);
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
        raceId: this.raceID,
        mereId: this.femeleVal,
        pereId: this.maleVal,
      };
      console.log(Lapin);
      const fermeId = localStorage.getItem("fermeId");
      const token = localStorage.getItem("token");

      axios
        .post(`http://localhost:3000/api/${fermeId}/lapin/Existant`, Lapin, {
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
