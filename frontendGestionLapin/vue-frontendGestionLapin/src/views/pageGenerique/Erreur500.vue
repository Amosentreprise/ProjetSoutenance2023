<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-3xl font-bold text-red-500 mb-4">Erreur 500 : Serveur indisponible</h2>
      <p class="text-lg mb-4">Désolé, il y a eu une erreur interne sur notre serveur. Nous sommes en train de travailler sur une solution. Veuillez réessayer plus tard.</p>
      <router-link to="/" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error500'
}
</script>

<style scoped>
/* Styles spécifiques à cette page */
</style>
