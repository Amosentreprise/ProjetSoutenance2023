<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-xl font-bold mb-2">Accès non autorisé</h1>
      <p class="text-gray-700 mb-4">Vous n'avez pas la permission d'accéder à cette page.</p>
      <router-link to="/" class="px-4 py-2 bg-secondary text-white rounded-md">Retourner à l'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style scoped>
/* Utilisez Tailwind pour personnaliser le style si nécessaire */
</style>
