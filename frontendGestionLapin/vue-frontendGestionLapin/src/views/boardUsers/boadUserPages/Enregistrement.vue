<template>
  <div>
    <div class="flex justify-center">
      <Button
        :name="LapinExistant"
        @click="showLapinExistantForm"
        class="button bg-secondary text-white"
      />
      <Button
        :name="LapinProvenant"
        @click="showAutreProvenanceForm"
        class="button bg-secondary text-white"
      />
    </div>
    <div
      class="bg-yellow-100 border-l-4 border-red-500 text-red-700 p-4 m-4"
      role="alert"
      v-show="currentComponent == null"
    >
      <p class="font-bold">Information</p>
      <p>
        cliquer sur "Lapin Provenant d'une ferme" pour enregistrer les
        informations sur les lapins élévés depuis une autre ferme et sur "Lapin
        Existant " pour procéder à l'enregistrement des autres lapines
      </p>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import Button from "../../../components/Button.vue";
import LapinAutreFerme from "../../../components/LapinAutreFerme.vue";
import LapinExistant from "../../../components/LapinExistant.vue";
import { SerialPort } from 'serialport'
export default {
  components: {
    LapinAutreFerme,
    LapinExistant,
    Button,
  },
  data() {
    return {
      currentComponent: null,
      LapinExistant: "Lapin Existant",
      LapinProvenant: "Lapin Provenant d'une Ferme",
    };
  },
  methods: {
    showLapinExistantForm() {
      this.currentComponent = "LapinExistant";
      this.$store.commit(
        "setActionName",
        "/ GestionLapin / Enregistrement /LapinExistant"
      );
    },
    showAutreProvenanceForm() {
      this.currentComponent = "LapinAutreFerme";
      this.$store.commit(
        "setActionName",
        "/ GestionLapin / Enregistrement /LapinDepuisAutreFerme"
      );
    },
  },
  mounted() {
    const Readline = SerialPort.parsers.Readline;
    const port = new SerialPort("COM5", {
      baudRate: 9600,
    });
    const parser = new Readline();
    port.pipe(parser);
    port.on("data", (data) => {
      console.log("Données serie reçues :", data);
    });
  },
};
</script>
