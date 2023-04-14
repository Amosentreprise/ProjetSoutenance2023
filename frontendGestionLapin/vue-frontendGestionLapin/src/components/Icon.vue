<template>
  <component :is="icon" :fill="fill" :stroke="stroke" />
</template>

<script>
export default {
  props: {
    icon: {
      type: Object,
      required: true
    },
    fill: {
      type: String,
      default: 'currentColor'
    },
    stroke: {
      type: String,
      default: 'none'
    }
  }
}
</script>
