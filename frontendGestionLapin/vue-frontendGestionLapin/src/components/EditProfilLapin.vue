<template>
  <div class="w-full min-h-screen relative">
    <form class="w-auto md:w-[600px] mx-auto">
      <h1 class="text-center text-xl font-medium text-gray-900">
        Mettre à jour les informations sur votre Lapin
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
        @click="submit"
      />
    </form>
  </div>
</template>

<script>
import Button from "./Button.vue";
import { initFlowbite } from "flowbite";
import axios from "axios";
export default {
  name: "EditLapin",
  components: {
    Button,
  },

  data() {
    return {
      BtnName: "ENREGISRER",
      fermeId: null,
      carteRfidId: null,
      raceID: "",
      races: [],

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
        {
          id: 5,

          label: "Id du père",
          Value: "Pas de père",
          options: [
            {
              id: 13,
              name: "303",
            },
            {
              id: 14,
              name: "400",
            },
            {
              id: 15,
              name: "20",
            },
          ],
        },
        {
          id: 6,

          label: "Id de la mère",
          Value: "Pas de mère",
          options: [
            {
              id: 13,
              name: "303",
            },
            {
              id: 14,
              name: "1000",
            },
            {
              id: 15,
              name: "20",
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
          placeholder: "Provenance",
          Value: "",
          labelname: "Provenance",
        },
      ],
    };
  },

  async mounted() {
    initFlowbite();
    // Récupération du token depuis le local storage
    const token = localStorage.getItem("token");
    const races = await axios.get("http://localhost:3000/api/races", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.races = races.data.races;

    //Compact infos dans les champs

    this.fermeId = this.$route.params.fermeId;
    const fermeId = this.fermeId;
    this.carteRfidId = this.$route.params.carteRfidId;
    const carteRfidId = this.carteRfidId;

    const compact = await axios.get(
      `http://localhost:3000/api/${fermeId}/lapin/${carteRfidId}/detail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    this.Forms[0].Value = compact.data.lapin.carteRfidId;
    this.FormTypeSelect[0].Value = compact.data.lapin.sexe;
    this.FormTypeSelect[1].Value = compact.data.lapin.orientation;
    this.FormTypeSelect[2].Value = compact.data.lapin.etapeDeveloppement;
    this.Forms[1].Value = compact.data.lapin.cage;
    this.Forms[2].Value = compact.data.lapin.provenance;
    this.raceID = compact.data.lapin.RaceRaceID;
    this.FormTypeSelect[4].Value = compact.data.lapin.mereId;
    this.FormTypeSelect[3].Value = compact.data.lapin.pereId;
  },

  methods: {
    submit() {
      const Lapin = {
        carteRfidId: this.Forms[0].Value,
        sexe: this.FormTypeSelect[0].Value,
        orientation: this.FormTypeSelect[1].Value,
        etapeDeveloppement: this.FormTypeSelect[2].Value,
        cage: this.Forms[1].Value,
        provenance: this.Forms[2].Value,
        raceId: this.raceID,
        mereId: this.FormTypeSelect[4].Value,
        pereId: this.FormTypeSelect[3].Value,
      };
      // Récupération du token depuis le local storage
      const token = localStorage.getItem("token");

      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      const carteRfidId = localStorage.getItem("carteRfidId");
      const lapinId = localStorage.getItem("lapinId");
      axios
        .put(
          `http://localhost:3000/api/${fermeId}/lapin/${carteRfidId}/${lapinId}/modification`,
          Lapin,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
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
