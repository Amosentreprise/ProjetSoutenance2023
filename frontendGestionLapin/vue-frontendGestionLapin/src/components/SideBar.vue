<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="bg-secondary text-secondary w-40 md:w-64 flex-none" v-show="state == false">
      <div class="flex items-center justify-center h-16">
        
        <span class="text-lg text-white font-bold">{{ nameFerme }}</span>
        <span class="text-lg text-white font-bold">{{ adresseFerme }}</span>
      </div>
    
      <slot name="options" ></slot>
      
      
    </div>

    <!-- Main Content -->
    <div class="flex-1 bg-gray-100">
      <div
        class="flex justify-between items-center bg-white shadow-md py-4 px-6"
      >
        <div class="flex items-center">
          <Icon :icon="menuIcon" :fill="bg-secondary" @click="changeState"  class="w-6 h-6 mr-2 inline md:hidden" />
          <span class="font-medium text-lg text-secondary">{{ ActionName }}</span>
        </div>
        <div class="flex items-center">
          <slot name="other"></slot>
        </div>
      </div>
      <div class="p-6">
        <!-- Content goes here -->
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon.vue";
import { MenuIcon } from "@heroicons/vue/solid";
export default {
  name: "Sidebar",
  props: ["nameFerme", "ActionName",'adresseFerme'],
  components: {
    Icon,
  },
  data() {
    return {
      menuIcon: MenuIcon,
      state: false,
    };
  },
  methods: {
    changeState() {
      if (this.state == false) {
         this.state = true;
      } else {
      this.state = false;
    }

   
    }
  }
};
</script>

<style>
/* Custom styles here */
</style>
