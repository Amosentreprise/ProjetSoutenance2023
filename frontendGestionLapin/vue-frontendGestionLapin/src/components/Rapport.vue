<template>
         <div
            :class="classe"
            class="display flex"
          >
          <div class="flex flex-col items-center">
            <p :class="classetitle">{{ title }}</p>
            <p class="text-3xl p-4">{{ corps }}</p>
          </div>
          <div>
          <img :src="image" alt="" class="w-10 h-10 ml-3 mt-4 object-cover">
          </div>
          </div>

</template>

<script>
export default {
    name: 'Rapport',
    props:['classe','title','corps','image','classetitle'],

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>