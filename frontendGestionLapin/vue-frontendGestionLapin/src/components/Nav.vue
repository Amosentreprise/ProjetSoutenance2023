<template>
    
<nav class="bg-white border-primary w-full">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <span class="flex items-center relative">
        <span class="self-center text-3xl whitespace-nowrap text-secondary hidden md:inline font-milky">e<span class="text-black">Lapin</span></span>
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          class="w-auto md:w-96 absolute -left-20 -top-30 opacity-10"
        >
          <path
            fill="#1BC16D"
            d="M45.8,-68.6C56.1,-64.7,59,-46.5,60.3,-31.2C61.5,-15.9,61.1,-3.6,59.8,8.9C58.4,21.3,56.1,33.9,50.1,46.6C44.1,59.3,34.5,72,22.5,74.5C10.6,77,-3.7,69.2,-14.5,60.9C-25.3,52.5,-32.7,43.6,-45.6,35.6C-58.6,27.7,-77.3,20.7,-84.6,8.6C-91.8,-3.5,-87.7,-20.8,-80.4,-36.6C-73.1,-52.5,-62.6,-66.8,-48.7,-69C-34.8,-71.3,-17.4,-61.4,0.2,-61.6C17.8,-61.9,35.5,-72.4,45.8,-68.6Z"
            transform="translate(100 100)"
          />
        </svg>
    </span>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden  w-full md:block md:w-auto font-montsserat text-xl" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
        <li v-for="lien in liens" :key="lien.id" class="mt-2">
         <span class="lien cursor-pointer hover:text-secondaryhover" >{{ lien.nom }}</span>
        </li>
        <li v-for="button in Buttons" :key="button.id" @click="changePage(button.id)">
            <Button :name="button.name" class="button bg-secondary hover:bg-secondaryhover text-white mr-2"/>
        </li>
       
      </ul>
    </div>
  </div>
   
</nav>
</template>
<script>

import { initFlowbite } from 'flowbite'
import Button from './Button.vue';
import logo from "../assets/Welcome/logo.png"

// initialize components based on data attribute selectors


export default {
    name: 'Nav',
    components: {
        Button
    },
    data() {
        return {
           logo:logo,
            Buttons: [{
                id: 0,
                name:"S'inscrire"
            },{
                id: 1,
                name:"Se connecter"
            }],
            liens: [{
                id:0,
                class: 'lien',
                nom:'Accueil'
            },
            {
                id:1,
                class: 'lien',
                nom:'Fonctionnalites'
            },{
                id:2,
                classe: 'lien',
                nom:'Contact'
                },
           ]
        };
  },
  mounted() {
    initFlowbite();
  },
  methods: {
    changePage(id) {
      if (id == 0) {
          this.$router.push("/Inscription"); 
      }
      if (id == 1) {
 this.$router.push("/Connexion");
          
        }
      }
    }
}

</script>