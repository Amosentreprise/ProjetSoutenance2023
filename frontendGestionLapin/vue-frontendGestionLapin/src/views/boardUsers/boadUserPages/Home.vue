<template>
    <div class=" w-full">
        <div class="flex flex-wrap justify-between">
            <span class="text-xl font-poppins font-medium">{{ nameFerme }}</span>
            <Button :name="nameBtn" class="button bg-secondary hover:bg-secondaryhover text-white"/>
        </div>
        <div class="flex flex-wrap">
            <div v-for="card in cards" :key="card.title">
<Rapport :classe="card.classe" :title="card.title" :corps="card.corps" :image="card.image" :classetitle="card.classetitle"/>
            </div>
            


        </div>
    </div>
</template>

<script>
import Button from '../../../components/Button.vue';
import Rapport from '../../../components/Rapport.vue';
import imagelapin from '../../../assets/Welcome/lapin1.jpeg'
import eleveur from '../../../assets/Welcome/hommeAfaire.jpg'
import ferme from '../../../assets/Welcome/ferme.jpg'
import axios from "axios";
export default {
    name: 'FrontendGestionLapinHome',
    components: {
        Button,Rapport
    },

    data() {
        return {
            nameFerme:'',
            nameBtn: 'GENERER UN RAPPORT',
            userId: null,
            fermeId:null,

            cards: [
                {
                    classe: 'bg-white border-l-4 border-secondary shadow-md rounded-md p-4 m-4',
                    title: 'Nombre de fermes',
                    corps: "3",
                    image: ferme,
                    classetitle:'font-medium text-secondary'
                },  {
                    classe: 'bg-white border-l-4 border-blue-500 shadow-md rounded-md  p-4 m-4',
                    title: "Nombre d'eleveurs",
                    corps: "20",
                    image: eleveur,
                    classetitle:'font-medium text-blue-500 '
                },
                 {
                    classe: 'bg-white border-l-4 border-pink-500 shadow-md rounded-md  p-4 m-4',
                    title: "Nombre de lapins",
                    corps: "128",
                     image: imagelapin,
                    classetitle:'font-medium text-pink-500'
                }
            ]
        };
    },

    mounted() {

         const token = localStorage.getItem("token");

    this.fermeId = this.$route.params.fermeId;
    const fermeId = this.fermeId;
    this.userId = this.$route.params.userId;
    const userId = this.userId;

    axios
      .get(`http://localhost:3000/api/dashboard/${userId}/ferme/${fermeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.nameFerme= response.data.ferme.nomFerme;
        localStorage.setItem("nameFerme", this.nameFerme)
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
        

        
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>