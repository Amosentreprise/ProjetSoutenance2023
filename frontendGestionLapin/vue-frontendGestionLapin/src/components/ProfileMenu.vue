<template>
    <div class="bg-white p-4 w-60 h-100">
        
        <div v-for="option in options" :key="option.id" >
           <router-link :to="option.lien">
            <div class="flex items-center shadow-sm hover:bg-hoverboard p-2 cursor-pointer">
           <Icon :icon="option.icone" class="w-6 h-6 mr-2" />
            <span>{{ option.optionName }}</span>
            </div>
            </router-link>
        </div>

    </div>
</template>

<script>
import Icon from "./Icon.vue";
import {LogoutIcon,SwitchHorizontalIcon,UserAddIcon,UserCircleIcon} from "@heroicons/vue/solid";

export default {
    components: {
        Icon,
    },
    data() {
        return {
            options: [{
                id: 0,
                icone: UserCircleIcon,
                lien: '/BoardUser/Profil',
                optionName: 'Voir mon profil'
            }, {
                id: 1,
                icone: UserAddIcon,
                lien: '/BoardUser/AddEleveur',
                optionName: 'Ajouter un eleveur'
            },
            {
                id: 2,
                icone: SwitchHorizontalIcon,
                lien: '',
                optionName: 'basculer vers une ferme'
            }, {
                id: 3,
                icone: LogoutIcon,
                lien: '/Connexion',
                optionName: 'Se deconnecter'
            }],
        };
    },
};


</script>