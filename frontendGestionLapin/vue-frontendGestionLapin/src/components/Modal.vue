<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-3xl shadow-md dark:bg-gray-700 w-[300px] h-auto">
        <div class="text-center">
          <img :src="image" alt="image" class="h-[300px] w-full object-cover" />
        </div>
        <div class="text-center text-black font-montsserat">{{ message }}</div>
        <div class="block px-2">
          <Button
            :name="nameBtn"
            class="button bg-secondary text-white w-full mt-2"
            @click="onButtonClick"
            data-modal-hide="popup-modal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initFlowbite } from 'flowbite'
import Button from "./Button.vue";
export default {
  name: "Modal",
  components: {
    Button,
  },
  props: ["message", "image", "nameBtn", "event"],

  data() {
    return {};
  },

    mounted() {
     initFlowbite();
  },

  methods: {
    onButtonClick() {
      if (this.event) {
        this.event();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
