<template>
    <div class="w-full h-full m-auto">
         <component :is="currentComponent"></component>
    </div>
</template>

<script>
import DiagnosticRecherche from '../../../components/DiagnosticRecherche.vue';
import DiagnosticResultat from '../../../components/DiagnosticResultat.vue';
export default {
    name: 'LapinDiagnostic',
    components: {
        DiagnosticRecherche,
        DiagnosticResultat
    },

    data() {
        return {
            
            
        };
    },
    computed: {
     currentComponent() {
      return this.$store.state.currentComponent;
    },
   },
    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>