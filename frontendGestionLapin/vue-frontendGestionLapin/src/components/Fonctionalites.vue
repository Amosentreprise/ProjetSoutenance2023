<template>
  <div class="min-h-screen w-full">

    <!--Section 1-->

    <div class="divSection bg-primary">
      <div class="sousdivsection">
        <div class="flex m-auto order-1 md:order-none">
          <img
            :src="imageSection1"
            alt="image lapin"
            class="w-auto h-[400px] object-cover rounded-md"
            data-aos="zoom-in"
            data-aos-duration="1500"
          />
        </div>
        <div class="textdivsection" data-aos="zoom-in" data-aos-duration="1500">
          <h1 class="text-3xl md:text-4xl text-black font-milky w-30 z-9">
            Suivi individuel de lapin
          </h1>
          <p class="text-xl font-montsserat mt-2">{{ descriptionSection1 }}</p>
          <Button
            :name="nameButton"
            class="mt-10 button bg-secondary hover:bg-secondaryhover text-white rounded-md"
          />
        </div>
      </div>
    </div>
    
    <!--Section 2-->
    <div class="divSection bg-white">
      <div class="sousdivsection">
        <div class="textdivsection" data-aos="zoom-in" data-aos-duration="1500">
          <h1 class="text-3xl md:text-4xl text-black font-milky w-30 z-9">
            Notification en temps réel
          </h1>
          <p class="text-xl font-montsserat mt-2">{{ descriptionSection2 }}</p>
          <Button
            :name="nameButton"
            class="mt-10 button bg-secondary hover:bg-secondaryhover text-white rounded-md"
          />
        </div>
        <div class="flex m-auto order-1 md:order-none">
          <img
            :src="imageSection2"
            alt="image lapin"
            class="w-auto h-[400px] object-cover rounded-md"
            data-aos="zoom-in"
            data-aos-duration="1500"
          />
        </div>
      </div>
    </div>
    
    <!--Section 3-->
    <div class="divSection bg-primary">
      <div class="sousdivsection">
        <div class="flex m-auto order-1 md:order-none">
          <img
            :src="imageSection3"
            alt="image lapin"
            class="w-auto h-[400px] object-cover rounded-md"
            data-aos="zoom-in"
            data-aos-duration="1500"
          />
        </div>
        <div class="textdivsection" data-aos="zoom-in" data-aos-duration="1500">
          <h1 class="text-3xl md:text-4xl text-black font-milky w-30 z-9">
            Les statisques
          </h1>
          <p class="text-xl font-montsserat mt-2">{{ descriptionSection3 }}</p>
          <Button
            :name="nameButton"
            class="mt-10 button bg-secondary hover:bg-secondaryhover text-white rounded-md"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import imageSection1 from "../assets/Welcome/statistique.gif";
import imageSection2 from "../assets/Welcome/bell.gif";
export default {
  name: "Card",

  components: {
    Button,
  },
  data() {
    return {
      nameButton: "Explorer plus",
      imageSection1: imageSection1,
      descriptionSection1:
        "Optimisez votre élevage en suivant précisément chaque lapin de votre ferme. Enregistrez et analysez les données essentielles telles que l'étape de développement, les performances de reproduction et la généalogie pour une gestion efficace.",
      imageSection2: imageSection2,
      descriptionSection2:
        "Restez constamment informé en temps réel. Recevez des alertes instantanées concernant la santé, la reproduction et les naissances de vos lapins. Soyez proactif et obtenez des résultats optimaux en surveillant en permanence votre élevage.",
      imageSection3: imageSection1,
      descriptionSection3:
        "Obtenez une vision claire et précise de votre activité grâce à nos fonctionnalités statistiques avancées. Prenez des décisions éclairées pour optimiser votre élevage et maximiser votre succès.",
    };
  },
};
</script>
