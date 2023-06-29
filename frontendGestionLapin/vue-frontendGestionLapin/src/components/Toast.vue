<template>
  <div :class="classe" role="alert">
    <p class="pr-2">
      <img
        src="../assets/effet/alert.gif"
        alt=""
        class="w-10 h-10 object-cover"
      />
    </p>
    <p class="font-medium">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { initFlowbite } from "flowbite";
export default {
  name: "Toast",
  props: ["message", "classe"],

  data() {
    return {};
  },

  mounted() {
    initFlowbite();
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
