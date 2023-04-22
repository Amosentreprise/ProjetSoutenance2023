<template>
  <div class="min-h-screen w-full flex justify-center bg-primary relative overflow-hidden">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-80 h-80 absolute -top-20 -left-2 opacity-5">
  <path fill="#FF0066" d="M66.9,-22.6C76.1,6.7,65.8,41.5,45.9,53.8C25.9,66.1,-3.6,55.8,-23.4,39.6C-43.2,23.5,-53.3,1.4,-47.8,-22.7C-42.3,-46.9,-21.2,-73.2,3.8,-74.4C28.8,-75.6,57.7,-51.9,66.9,-22.6Z" transform="translate(100 100)" />
</svg>
<div class="flex flex-col md:flex md:flex-row md:justify-evenly items-center w-full">
    <div class="order-1 md:order-none  ">
      <img
        :src="src"
        :alt="description"
        class="w-auto h-[200px] md:h-[250px] object-cover rounded-md"
      />
    </div>

    <div class="order-2 md:order-none leading-6 md:leading-loose">
      <h1 class="mb-1 text-2xl font-bold pt-10 px-2 md:px-0">
        {{ fonctionnalite }}
      </h1>
      <p class="mb-2 px-2 pt-6 w-50 md:w-80 md:px-0">{{ description }}</p>
      <Button :name="nameButton" class="mt-10 button bg-secondary hover:bg-secondaryhover my-auto text-white rounded-md"/>
       <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-80 h-80 absolute bottom-0 -right-2 opacity-5">
  <path fill="#FF0066" d="M66.9,-22.6C76.1,6.7,65.8,41.5,45.9,53.8C25.9,66.1,-3.6,55.8,-23.4,39.6C-43.2,23.5,-53.3,1.4,-47.8,-22.7C-42.3,-46.9,-21.2,-73.2,3.8,-74.4C28.8,-75.6,57.7,-51.9,66.9,-22.6Z" transform="translate(100 100)" />
</svg>
    </div>
  </div>
  </div>
  
 
</template>

<script>
import Button from './Button.vue';
export default {
  name: "Card",
  props: ["fonctionnalite", "description", "src"],
  components: {
   Button 
  },
  data() {
    return {
       nameButton:'Explorer plus'
    };
  },
};
</script>
