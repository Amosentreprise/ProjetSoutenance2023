<template>
  <div class="min-h-screen w-full relative overflow-hidden">
    <div class="flex flex-col md:flex-row w-full pl-3 pr-3 relative">
      <div
        class="m-auto order-2 md:order-none leading-6 md:leading-loose md:w-[500px] w-auto"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        <h1 class="text-3xl md:text-5xl text-black font-milky w-30 z-9">
          Bienvenu sur <span class="font-milky text-secondary">e</span>Lapin, la
          référence pour un élevage de lapins prospère.
        </h1>
        <p class="text-xl font-montsserat mt-4">{{ description }}</p>
        <Button
          :name="nameButton"
          class="mt-10 button bg-secondary hover:bg-secondaryhover text-white rounded-md"
        />
      </div>

      <div class="flex m-auto order-1 md:order-none">
        <img
          :src="image"
          alt="image lapin"
          class="w-auto h-[400px] object-cover rounded-md"
          data-aos="zoom-in"
          data-aos-duration="1500"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../components/Button.vue";
import image from "../assets/Welcome/lapin.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  components: {
    Button,
  },
  data() {
    return {
      Titre: "",
      description:
        "Découvrez comment notre plateforme transforme la santé et la productivité de votre élevage dès aujourd'hui.",
      image: image,
      nameButton: "VOIR NOS FONCTIONNALITES",
    };
  },
  mounted() {
    AOS.init();
  },
  methods: {},
};
</script>
