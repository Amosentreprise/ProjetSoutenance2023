<template>
  <div class="relative">
    <SideBar :nameDashboard="nameDashboard" :ActionName="ActionName">
      <template v-slot:options>
        <ul class="py-4">
          <li
            class="pl-6 pr-4 py-3 text-white hover:font-bold relative"
            :class="{ 'bg-secondaryhover': option.id === selectedOption }"
            @click="selectOption(option.id)"
            v-for="option in options"
            :key="option.id"
            v-show="option.role === '2'"
          >
            <span
              class="flex flex-col md:flex-row items-center cursor-pointer"
              @click="liens(option.id)"
            >
              <Icon :icon="option.icon" class="w-6 h-6 mr-2" />
              <small>{{ option.nom }}</small>
        </span>
          </li>
        
          <li @click="logout" class="pl-6 pr-4 py-3 text-white hover:font-bold">
            <span class="flex items-center cursor-pointer">
              <Icon :icon="deconnexionIcon" class="w-6 h-6 mr-2" />
              <small>{{ deconnexionName }}</small>
            </span>
          </li>
        </ul>
      </template>
      <template v-slot:other>
        <span class="bg-gray-200 rounded-full p-2 mr-2">
          <Icon :icon="BellIcon"  class="w-6 h-6" />
        </span>
        <span class="bg-gray-200 rounded-full p-2" @mouseover="showMenu = true">
          <Icon :icon="userIcon" :fill="bg-secondary" class="w-6 h-6" />
        </span>
        <ProfileMenu
          v-if="showMenu"
          class="absolute top-20 right-3"
          @mouseleave="showMenu = false"
        />
          <Ferme
            v-if="showFerme"
            class="absolute bottom-10 left-20"
            @mouseleave="showFerme = false"
          />
      </template>
      <template v-slot:right>
        <router-view />
      </template>
    </SideBar>
  </div>
</template>
<script>
import SideBar from "../../components/SideBar.vue";
import ProfileMenu from "../../components/ProfileMenu.vue";
import Ferme from "../../components/Ferme.vue";

import Icon from "../../components/Icon.vue";
import {
  HomeIcon,
  EyeIcon,
  LogoutIcon,
  SwitchHorizontalIcon,
  SaveIcon,
  UserAddIcon,
  UserCircleIcon,
  ChartBarIcon,
  BellIcon,
} from "@heroicons/vue/solid";
import axios from "axios";

export default {
  components: {
    SideBar,
    ProfileMenu,
    Icon,
    Ferme,
  },

  data() {
    return {
      nameDashboard: "",
      ActionName: "Dashboard",
      showMenu: false,
      showFerme: false,
      userIcon: UserCircleIcon,
      selectedOption: 1,
      deconnexionIcon: LogoutIcon,
      deconnexionName: "Se deconnecter",
      fermeId: null,
      BellIcon:BellIcon,
      

      options: [
        {
          id: 1,
          nom: "Dashboard",
          icon: HomeIcon,
          role:'2'
        },
        {
          id: 2,
          nom: "Voir mes lapins",
          icon: EyeIcon,
          role:'2'
        },
        {
          id: 3,
          nom: "Enregistrement",
          icon: SaveIcon,
          role:'2'
        },
        {
          id: 4,
          nom: "Gestion des lapins",
          icon: SaveIcon,
          role:"2"
        },
        {
          id: 5,
          nom: "Diagnostiquer une maladie",
          icon: ChartBarIcon,
          role:'2'
        },
        {
          id: 6,
          nom: "Ajouter une ferme",
          icon: UserAddIcon,
          role:'2'
        },
        {
          id: 7,
          nom: "Basculer sur une ferme",
          icon: SwitchHorizontalIcon,
          role:'2'
        },
      ],
    };
  },

  mounted() {
    // Récupération du token depuis le local storage
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
        this.nameDashboard = response.data.ferme.nomFerme;
        // this.adresseFerme = response.data.adresse;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

       const role = localStorage.getItem('roleId');
      if (role === '1') {
        this.options[0].role = '1';
        this.options[5].role = '1';
        this.options[6].role = '1';
      }
  },
  computed: {
   
  },
   created() {
     axios.interceptors.response.use(
      (response) => {
        return response;
      },
       (error) => {
        if (error.response.status === 401) {
         this.$router.push("/Connexion"); // rediriger vers la page de connexion
       }
         return Promise.reject(error);
       }
     );
   },
  methods: {
    selectOption(id) {
      this.selectedOption = id;
    },
    
   
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/Connexion");
    },
    liens(option) {
       const fermeId = localStorage.getItem('fermeId')
       const userId = localStorage.getItem('userId')
       if (option === 1) {
         this.$router.push(`/dashboard/${userId}/ferme/${fermeId}`);
      }
       if (option === 2) {
         this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/LapinView`);
      }
       if (option === 3) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}`);
      }
       if (option === 4) {
       this.$router.push(`/dashboard/${userId}/ferme/${fermeId}`);
      }
       if (option === 5) {
         this.$router.push(`/dashboard/${userId}/ferme/${fermeId}`);
      }
       if (option === 6) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/AddFerme`);
      }
      if (option === 7) {
        this.showFerme = true;
      }
    },
  

  },
};
</script>
