<template>
    <div class="h-screen w-full flex flex-col justify-center">
        <div>
       <Card 
        :description="cards[2].description"
        :fonctionnalite="cards[2].fonctionnalite"
        :src="cards[2].image"
        
       />
     
       </div>

       <div class="flex justify-center ">
         <Button :name="nameButton" class="bg-secondary text-white mt-4"/>
       </div>
       
    </div>
</template>

<script>
import { Carousel } from 'flowbite'
import Card from "../../components/Card.vue"
import Button from "../../components/Button.vue"
import image1 from "../../assets/Welcome/image1.jpeg";
import image2 from "../../assets/Welcome/image2.jpeg";



export default {
   
    components: {
        Card,
        Button,
        Carousel
    },
    data() {
        return {
            nameButton:'Demarrer',
            cards: [{
                id:0,
                fonctionnalite: 'FONCTIONNALITE 1',
                description: 'FONCTIONNALITE1',
                image:image1
           },{
                id:1,
                fonctionnalite: 'FONCTIONNALITE 2',
                description: 'kjdcjvdbnjn',
                image:image2
           },{
                id:2,
                fonctionnalite: 'FONCTIONNALITE 3',
                description: 'loremkckkkkkkkkkkkkkkk',
                image:image1
           }]
        };
    },
}


</script>