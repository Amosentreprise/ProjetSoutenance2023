<template>
  <div class="bg-white min-h-screen">
    <Nav class="shadow-sm"/>
    <Presentation class="w-full flex justify-center"/>
    <h1 class="text-2xl text-center text-secondary pb-4">Nos Fonctionnalites</h1>    
  <div v-for="card in cards" :key="card.id" >
    <Fonctionalites  :description="card.description"
        :fonctionnalite="card.fonctionnalite"
        :src="card.image"
        v-if="card.id === index"/>
    </div>
  
   
  
    <Footer/>
  </div>
</template>

<script>
import { Carousel } from "flowbite";
import Nav from "../../components/Nav.vue";
import Presentation from "../../components/Presentation.vue";
import Fonctionalites from "../../components/Fonctionalites.vue";
import Footer from "../../components/Footer.vue";
import Button from "../../components/Button.vue";
import codeqr from "../../assets/Welcome/codeqr.jpg";
import hommeAfaire from "../../assets/Welcome/hommeAfaire.jpg";
import lapin1 from "../../assets/Welcome/lapin1.jpeg";
import lapin2 from "../../assets/Welcome/lapin2.jpg";
import scannage from "../../assets/Welcome/scannage.jpg";
import FooterVue from "../../components/Footer.vue";

export default {
  components: {
    Nav,
    Presentation,
    Fonctionalites,
    Footer,
    Button,
    Carousel,
  },
  data() {
    return {
      nameButton: "Demarrer",
      index: 0,
      cards: [
        {
          id: 0,
          fonctionnalite: "BIENVENUE SUR L'application",
          description:
            "Une application simple qui vous aidera à mieux gerer votre élevage de lapin. Elle a juste besoin de certaine information sur le lapin.",
          image: lapin2,
        },
        {
          id: 1,
          fonctionnalite: "Eleveur ?",
          description: "Pense à autre chose l'application se charge de tout.",
          image: hommeAfaire,
        },
        {
          id: 2,
          fonctionnalite: "Homme d'affaire ?",
          description:
            "Crée un compte et ajoute un eleveur pour te gérer la ferme. Tu peux voir les statisques",
          image: hommeAfaire,
        },
        {
          id: 3,
          fonctionnalite: "Tu veux eviter les problemes de consanguinités ?",
          description:
            "La plateforme predire le cycle de reproduction, te donne des recommandations pour eviter les problemes de consanguité lors de l'accouplement.",
          image: lapin1,
        },
        {
          id: 4,
          fonctionnalite: "Enregistrement de lapin",
          description:
            "A chaque enregitrement, le système te genère un code qr. Telecharge juste le code qr, Greffe ce code qr au niveau de ton lapin.",
          image: codeqr,
        },
        {
          id: 5,
          fonctionnalite:
            "Informe la plateforme des actions que tu fais sur un lapin",
          description:
            "Faire juste le scannage de ce code qr pour gerer la vente et le decès ",
          image: scannage,
        },
      ],
    };
  },
  mounted() {
    setInterval(this.nextChild, 3000);
  },
  methods: {
    nextChild() {
      if (this.index === this.cards.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    },
  },
};
</script>
