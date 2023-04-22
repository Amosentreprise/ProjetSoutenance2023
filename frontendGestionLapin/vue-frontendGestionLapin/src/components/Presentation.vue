<template>
  <div class="min-h-screen w-full relative overflow-hidden">
    <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          class="w-96 absolute left-0 -top-20 opacity-10"
        >
          <path
            fill="#1BC16D"
            d="M45.8,-68.6C56.1,-64.7,59,-46.5,60.3,-31.2C61.5,-15.9,61.1,-3.6,59.8,8.9C58.4,21.3,56.1,33.9,50.1,46.6C44.1,59.3,34.5,72,22.5,74.5C10.6,77,-3.7,69.2,-14.5,60.9C-25.3,52.5,-32.7,43.6,-45.6,35.6C-58.6,27.7,-77.3,20.7,-84.6,8.6C-91.8,-3.5,-87.7,-20.8,-80.4,-36.6C-73.1,-52.5,-62.6,-66.8,-48.7,-69C-34.8,-71.3,-17.4,-61.4,0.2,-61.6C17.8,-61.9,35.5,-72.4,45.8,-68.6Z"
            transform="translate(100 100)"
          />
        </svg>

        
    <div class="flex flex-col md:flex-row w-full pl-3 pr-3 relative">
      <div class="m-auto order-2 md:order-none leading-6 md:leading-loose">
        <h1 class="text-3xl md:text-5xl text-black font-bold w-30 z-9">
          {{ Titre }}
        </h1>
        <p class="text-xl">{{ description }}</p>
        <Button
          :name="nameButton"
          class="mt-10 button bg-secondary hover:bg-secondaryhover text-white rounded-md"
        />
         <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          class="w-96 absolute -bottom-40 -right-0 opacity-10"
        >
          <path
            fill="#1BC16D"
            d="M45.8,-68.6C56.1,-64.7,59,-46.5,60.3,-31.2C61.5,-15.9,61.1,-3.6,59.8,8.9C58.4,21.3,56.1,33.9,50.1,46.6C44.1,59.3,34.5,72,22.5,74.5C10.6,77,-3.7,69.2,-14.5,60.9C-25.3,52.5,-32.7,43.6,-45.6,35.6C-58.6,27.7,-77.3,20.7,-84.6,8.6C-91.8,-3.5,-87.7,-20.8,-80.4,-36.6C-73.1,-52.5,-62.6,-66.8,-48.7,-69C-34.8,-71.3,-17.4,-61.4,0.2,-61.6C17.8,-61.9,35.5,-72.4,45.8,-68.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div class="flex m-auto order-1 md:order-none">
        
        <img :src="image" alt="image lapin" class="w-auto h-[400px] object-cover " />
      </div>
     
    </div>
  </div>
</template>
<script>
import Button from "../components/Button.vue";
import image from "../assets/Welcome/lapin2.jpg";

export default {
  components: {
    Button,
  },
  data() {
    return {
      Titre: "LAPIN",
      description: "une petite description",
      image: image,
      nameButton: "VOIR NOS FONCTIONNALITES",
    };
  },
};
</script>
