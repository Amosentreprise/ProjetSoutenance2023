<template>
  <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center flex flex-col justify-center">
      <p class="mx-auto"><img src="../../assets/PageGenerique/404.gif" alt=""></p>
      <h1 class="mt-4 text-3xl font-milky tracking-tight text-gray-900 sm:text-5xl">Page non trouvé</h1>
      <p class="mt-6 text-base leading-7 text-gray-600">Desolé, nous n'avons pas trouvé la page que vous recherchez.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
       <Button :name="nameBtn" class="bg-secondary text-white" @click="pageAcceuil"/>
      </div>
    </div>
  </main>
</template>
<script>
import Button from '../../components/Button.vue';
export default {
  components: {
   Button,  
  },

  data() {
    return {
      nameBtn : "RETOUNER SUR LA PAGE D'ACCUEIL"
    };
  },
  methods: {
    pageAcceuil() {
      this.$router.push("/")
    }
  }
}

</script>
