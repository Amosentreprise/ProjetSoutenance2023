<template>
  <div class="bg-white min-h-screen">
    <Nav class="shadow-sm" />
    <Presentation class="w-full flex justify-center" />
    <h1 class="text-5xl font-milky text-center text-secondary ">
      Nos Fonctionnalités
    </h1>
     
    <Fonctionalites />

    <Footer />
  </div>
</template>

<script>
import { Carousel } from "flowbite";
import Nav from "../../components/Nav.vue";
import Presentation from "../../components/Presentation.vue";
import Fonctionalites from "../../components/Fonctionalites.vue";
import Footer from "../../components/Footer.vue";
import Button from "../../components/Button.vue";


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
     
    };
  },
  mounted() {
    // setInterval(this.nextChild, 3000);
  },
  methods: {
    // nextChild() {
    //   if (this.index === this.cards.length - 1) {
    //     this.index = 0;
    //   } else {
    //     this.index++;
    //   }
    // },
  },
};
</script>
