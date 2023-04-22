<template>
  <div class="relative">
    <SideBar :nameDashboard="nameDashboard" :ActionName="ActionName">
      <template v-slot:options>
        <ul class="py-4">
          <li
            class="pl-6 pr-4 py-3 hover:bg-hoverboard"
            :class="{ 'bg-primary': option.id === selectedOption }"
            @click="selectOption(option.id)"
            v-for="option in options"
            :key="option.id"
            v-show="option.role === '2'"
          >
            <span
              class="flex items-center"
              @click="liens(option.id)"
            >
              <Icon :icon="option.icon" class="w-6 h-6 mr-2" />
              <small>{{ option.nom }}</small>
        </span>
          </li>
          <Ferme
            v-if="showFerme"
            class="absolute top-20 right-3"
            @mouseleave="showFerme = false"
          />
          <li @click="logout" class="pl-6 pr-4 py-3 hover:bg-hoverboard">
            <span class="flex items-center">
              <Icon :icon="deconnexionIcon" class="w-6 h-6 mr-2" />
              <small>{{ deconnexionName }}</small>
            </span>
          </li>
        </ul>
      </template>
      <template v-slot:other>
        <span class="bg-gray-200 rounded-full p-2 mr-2">
          <svg class="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
            <path
              d="M12 21c1.1 0 2-.9 2-2H10c0 1.1.9 2 2 2zm6-6V8c0-3.9-2.5-7.2-6-8.5V0h-4v.5C8.5.8 6 4.1 6 8v7l-3.3 3.3c-.5.5-.7 1.2-.5 1.9L4 22h16l.8-4.8c.2-.7 0-1.4-.5-1.9L18 15z"
            />
          </svg>
        </span>
        <span class="bg-gray-200 rounded-full p-2" @mouseover="showMenu = true">
          <Icon :icon="userIcon" class="w-6 h-6" />
        </span>
        <ProfileMenu
          v-if="showMenu"
          class="absolute top-20 right-3"
          @mouseleave="showMenu = false"
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
