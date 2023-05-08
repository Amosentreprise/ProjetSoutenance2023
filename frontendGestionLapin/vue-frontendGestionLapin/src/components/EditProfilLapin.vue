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

      <div v-for="form in FormTypeSelect" :key="form.id" class="mt-2" >
        <label
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >{{ form.label }}</label
        >
        <select class="input p-2" v-model="form.Value" >
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
              name: "Masculin",
            },
            {
              id: 4,
              name: "Feminin",
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
              name: "4 - 6 semaines,",
            },

            {
              id: 10,
              name: "6 - 12 semaines,",
            },
            {
              id: 11,
              name: "3 - 6 mois,",
            },
            {
              id: 12,
              name: "6 mois et plus,",
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
          type: "EX : 10",
          placeholder: "Numéro de cage",
          Value: "",
          labelname: "Numéro de cage",
        },
        {
          id: 3,
          type: "EX : 10",
          placeholder: "Provenance",
          Value: "",
          labelname: "Provenace",
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

    //Compact infos dans les champs

    this.fermeId = this.$route.params.fermeId;
    const fermeId = this.fermeId;
    this.carteRfidId = this.$route.params.carteRfidId;
    const carteRfidId = this.carteRfidId;

    axios
      .get(`http://localhost:3000/api/${fermeId}/lapin/${carteRfidId}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);

        this.Forms[0].Value = response.data.lapin.carteRfidId;
        this.FormTypeSelect[0].Value = response.data.lapin.sexe;
        this.FormTypeSelect[1].Value = response.data.lapin.orientation;
        this.FormTypeSelect[2].Value = response.data.lapin.etapeDeveloppement;
        this.Forms[1].Value = response.data.lapin.cage;
        this.Forms[2].Value = response.data.lapin.provenance ;
        this.raceID = response.data.lapin.RaceRaceID ;
        this.FormTypeSelect[4].Value = response.data.lapin.mereId;
        this.FormTypeSelect[3].Value = response.data.lapin.pereId;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    submit() {
      const Lapin = {
        carteRfidId: this.Forms[0].Value,
        sexe: this.FormTypeSelect[0].Value,
        orientation: this.FormTypeSelect[1].Value,
        etapeDeveloppement: this.FormTypeSelect[2].Value,
        cage: this.Forms[1].Value,
        provenance: this.Forms[1].Value,
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
