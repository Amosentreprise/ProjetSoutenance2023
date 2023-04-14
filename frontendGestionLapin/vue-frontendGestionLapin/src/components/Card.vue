<template>
    <div class="flex justify-evenly w-full h-auto ">

    <div class="leading-normal">
     <h1 class="mb-1 text-2xl font-bold text-other pt-10">{{ fonctionnalite }}</h1>
     <p class="mb-2 text-other pt-6 w-96">{{ description }}</p>
    </div>
    <div>
      <img :src="src" :alt="description" class="w-auto h-[250px] object-cover rounded-md">
    </div>

    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['fonctionnalite', 'description', 'src'],
};



</script>