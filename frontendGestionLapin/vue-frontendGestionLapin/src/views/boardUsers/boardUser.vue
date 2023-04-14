<template>
    <div class="relative">
<SideBar :nameDashboard="nameDashboard" :ActionName="ActionName">
    <template v-slot:options>
        <ul class="py-4">
        <li class="pl-6 pr-4 py-3 hover:bg-hoverboard" :class="{ 'bg-primary': option.id === selectedOption }" @click="selectOption(option.id)" v-for="option in options" :key="option.id">
          <router-link :to="option.lien" class="flex items-center ">
            <Icon :icon="option.icon" class="w-6 h-6 mr-2" />
            <small>{{ option.nom }}</small>
          </router-link>
        </li>
      </ul>
    </template>
    <template v-slot:other >
        <span class="bg-gray-200 rounded-full p-2 mr-2">
            <svg class="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 21c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6V8c0-3.9-2.5-7.2-6-8.5V0h-4v.5C8.5.8 6 4.1 6 8v7l-3.3 3.3c-.5.5-.7 1.2-.5 1.9L4 22h16l.8-4.8c.2-.7 0-1.4-.5-1.9L18 15z" />
            </svg>
        </span>
          <span class="bg-gray-200 rounded-full p-2" @mouseover="showMenu = true " >
           <Icon :icon="userIcon" class="w-6 h-6 " />
        </span>
          <ProfileMenu v-if="showMenu" class="absolute top-20 right-3" @mouseleave="showMenu = false"/>
    </template>
    <template v-slot:right>
        <router-view/>
    </template>
</SideBar>
    </div>
</template>
<script>
import SideBar from "../../components/SideBar.vue"
import ProfileMenu from "../../components/ProfileMenu.vue";

import Icon from "../../components/Icon.vue";
import { HomeIcon,EyeIcon,LogoutIcon,SwitchHorizontalIcon,SaveIcon,UserAddIcon,UserCircleIcon,ChartBarIcon} from "@heroicons/vue/solid";



export default {

    components: {
        SideBar,
        ProfileMenu,
        Icon,
        


    },
    data() {
        return {
            nameDashboard: 'Ferme A',
            ActionName: 'Dashboard',
            showMenu: false,
            userIcon: UserCircleIcon,
            selectedOption: 1,
            options: [
                {
                    id: 1,
                    lien: '/BoardUser/Home',
                    nom: 'Dashboard',
                    icon: HomeIcon,
                },
                {
                    id: 2,
                    lien: '/BoardUser/LapinView',
                    nom: 'Voir mes lapins',
                    icon: EyeIcon,
                },
                {
                    id: 3,
                    lien: '',
                    nom: 'Enregistrement',
                    icon:SaveIcon,
                },
                {
                    id: 4,
                    lien: '',
                    nom: 'Gestion des lapins',
                    icon: SaveIcon,
                },
                {
                    id: 5,
                    lien: '',
                    nom: 'Diagnotiquer une maladie',
                    icon: ChartBarIcon,
                }, {
                    id: 6,
                    lien: '/BoardUser/AddFerme',
                    nom: 'Ajouter une ferme',
                    icon: UserAddIcon,
                },
                {
                    id: 7,
                    lien: '',
                    nom: 'Basculer sur une ferme',
                    icon: SwitchHorizontalIcon,
                }, {
                    id: 8,
                    lien: 'Connexion',
                    nom: 'Se deconnecter',
                    icon: LogoutIcon,
                }
            ]

        };

    },
    methods: {
  selectOption(id) {
      this.selectedOption = id;
    },

    }
}

</script>