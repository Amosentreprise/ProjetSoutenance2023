<template>
    <div class="bg-white p-4 w-40 h-100">
        
        <div v-for="option in options" :key="option.id" >
           <router-link :to="option.lien">
            <div class="flex items-center shadow-sm hover:bg-hoverboard p-2 cursor-pointer">
            <span>{{ option.icon }}</span>
            <span>{{ option.optionName }}</span>
            </div>
            </router-link>
        </div>

    </div>
</template>

<script>

export default {
    name: 'profileMenu',
data() {
    return {
        options: [{
            id:0,
            icone: '',
            lien: '',
            optionName:'Voir mon profil'
        },{
            id:1,
            icone: '',
            lien: '',
            optionName:'Ajouter un eleveur'
        },
        {
            id:2,
            icone: '',
            lien: '',
            optionName:'basculer vers une ferme'
        },{
            id:3,
            icone: '',
            lien: '/Connexion',
            optionName:'Se deconnecter'
        }],
    };
},
    
}
</script>