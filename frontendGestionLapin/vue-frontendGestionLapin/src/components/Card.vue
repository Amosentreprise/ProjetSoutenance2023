<template>
    <div class="flex justify-evenly w-full h-auto ">

    <div class="leading-normal">
     <h1 class="mb-2 text-2xl font-bold text-other pt-10">{{ fonctionnalite }}</h1>
     <p class="mb-3 text-other pt-6">{{ description }}</p>
    </div>
    <div>
      <img :src="src" :alt="description" class="w-auto h-[400px] object-cover rounded-md">
    </div>

    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['fonctionnalite', 'description', 'src'],
};



</script>