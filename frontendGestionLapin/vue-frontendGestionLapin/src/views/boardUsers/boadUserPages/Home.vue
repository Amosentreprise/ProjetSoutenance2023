<template>
  <div class="w-full">
    <div class="flex flex-wrap justify-between">
      <span class="text-xl font-poppins font-medium">{{ nameFerme }}</span>
      <Button
        :name="nameBtn"
        class="button bg-secondary hover:bg-secondaryhover text-white"
        @click="generateRapport"
      />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1">
      <div v-for="card in cards" :key="card.title">
        <Rapport
          :classe="card.classe"
          :title="card.title"
          :corps="card.corps"
          :image="card.image"
          :classetitle="card.classetitle"
        />
      </div>
    </div>
    <div class="flex flex-col md:flex md:flex-row">
      <Graphique />
      <LineGraphique class="ml-8" />
    </div>
  </div>
</template>

<script>
import Button from "../../../components/Button.vue";
import Rapport from "../../../components/Rapport.vue";
import Graphique from "../../../components/Graphique.vue";
import LineGraphique from "../../../components/LineGraphique.vue";
import imagelapin from "../../../assets/icones/rabbit.png";
import eleveur from "../../../assets/icones/farmer.png";
import ferme from "../../../assets/icones/farm.png";
import price from "../../../assets/icones/price.png";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: "FrontendGestionLapinHome",
  components: {
    Button,
    Rapport,
    Graphique,
    LineGraphique,
  },

  data() {
    return {
      nameFerme: "",
      nameBtn: "GENERER UN RAPPORT",
      userId: null,
      fermeId: null,
      nbLapinDecede: 10,
      nbLapinVivant: 30,
      nbLapinVendu: 2,

      cards: [
        {
          classe:
            "bg-white border-l-4 border-secondary shadow-md rounded-md p-4 my-4",
          title: "Nombre de fermes",
          corps: 3,
          currentNumber: 0,
          image: ferme,
          classetitle: "font-medium text-secondary",
        },
        {
          classe:
            "bg-white border-l-4 border-blue-500 shadow-md rounded-md  p-4 my-4",
          title: "Nombre d'eleveurs",
          corps: 20,
          currentNumber: 0,
          image: eleveur,
          classetitle: "font-medium text-blue-500 ",
        },
        {
          classe:
            "bg-white border-l-4 border-pink-500 shadow-md rounded-md  p-4 my-4",
          title: "Nombre de lapins",
          corps: 128,
          currentNumber: 0,
          image: imagelapin,
          classetitle: "font-medium text-pink-500",
        },
        {
          classe:
            "bg-white  border-l-4 border-yellow-300 shadow-md rounded-md p-4 my-4",
          title: "Prix Total de vente",
          corps: 20000,
          currentNumber: 1000,
          image: price,
          classetitle: "font-medium text-yellow-300",
        },
      ],
    };
  },

  mounted() {
    //Animation

    const token = localStorage.getItem("token");

    this.fermeId = this.$route.params.fermeId;
    const fermeId = this.fermeId;
    this.userId = this.$route.params.userId;
    const userId = this.userId;

    axios
      .get(`http://localhost:3000/api/dashboard/${userId}/ferme/${fermeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.nameFerme = response.data.ferme.nomFerme;
        localStorage.setItem("nameFerme", this.nameFerme);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    //Recuperation des statistques

    axios
      .get(`http://localhost:3000/api/statistiques/${fermeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          this.cards[0].corps = response.data.nombreFermeTotal;
          this.cards[1].corps = response.data.nombreEleveurFermeTotal;
          this.cards[2].corps = response.data.nombreLapinTotal;
          // const intervalId = setInterval(() => {
          //   if (this.cards[0].currentNumber < this.cards[0].corps) {
          //     this.cards[0].currentNumber++;
          //   }
          //   if (this.cards[1].currentNumber < this.cards[1].corps) {
          //     this.cards[1].currentNumber++;
          //   }
          //   if (this.cards[2].currentNumber < this.cards[2].corps) {
          //     this.cards[2].currentNumber++;
          //   } else {
          //     clearInterval(intervalId);
          //   }
          // }, 100);
        }
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    generateRapport() {
      const documentDefinition = {
        content: [
          { text: "Nom de la ferme", style: "header" },
          { text: "Ma ferme", style: "subheader" },
          { text: "Nombre de lapins", style: "header" },
          { text: "25", style: "subheader" },
          { text: "Date de génération", style: "header" },
          { text: new Date().toLocaleString(), style: "subheader" },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
          },
          subheader: {
            fontSize: 14,
            bold: false,
            margin: [0, 0, 0, 10],
          },
        },
      };

      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      pdfDocGenerator.download("rapportLapin.pdf");
    },
  },
};
</script>

<style lang="scss" scoped></style>
