<template>
  <div class="relative">
    <SideBar :nameFerme="nameDashboard" :ActionName="ActionName">
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
          <Icon :icon="BellIcon" class="w-6 h-6" />
        </span>
        <span class="bg-gray-200 rounded-full p-2" @mouseover="showMenu = true">
          <Icon :icon="userIcon" :fill="bg - secondary" class="w-6 h-6" />
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
  RefreshIcon,
  LogoutIcon,
  NewspaperIcon,
  UserGroupIcon,
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
      // adresseFerme:"gg",

      showMenu: false,

      userIcon: UserCircleIcon,
      selectedOption: 1,
      deconnexionIcon: LogoutIcon,
      deconnexionName: "Se deconnecter",
      fermeId: null,
      BellIcon: BellIcon,

      options: [
        {
          id: 1,
          nom: "Dashboard",
          icon: HomeIcon,
          role: "2",
        },
        {
          id: 2,
          nom: "Gestion des lapins",
          icon: EyeIcon,
          role: "2",
        },

        {
          id: 3,
          nom: "Cycle de vie des lapins",
          icon: RefreshIcon,
          role: "2",
        },
        {
          id: 4,
          nom: "Diagnostiquer une maladie",
          icon: ChartBarIcon,
          role: "2",
        },

        {
          id: 5,
          nom: "Gestion de fermes",
          icon: UserGroupIcon,
          role: "2",
        },
        {
          id: 6,
          nom: "Consulter les actualités",
          icon: NewspaperIcon,
          role: "2",
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
         localStorage.setItem("nameFerme",this.nameDashboard)
        // localStorage.setItem('nameFerme',this.nameDashboard)
        // this.adresseFerme = response.data.adresse;
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        window.location.href = "/Erreur-500";
      });

    const role = localStorage.getItem("roleId");
    if (role === "1") {
      this.options[0].role = "1";
      this.options[4].role = "1";
    }
  },
  computed: {
    ActionName() {
    return this.$store.state.ActionName;
   }
  },
  created() {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error.response.status === 401 &&
          error.response.data.error.name === "TokenExpiredError"
        ) {
          // Rediriger vers la page de connexion
          localStorage.removeItem("nameFerme")
          window.location.href = "/Connexion";
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
      localStorage.removeItem("nameFerme")
      this.$router.push("/Connexion");
    },
    liens(option) {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      if (option === 1) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Home`);
       
        this.$store.commit('setActionName', "/ Dashboard"); // Utiliser la mutation pour changer la valeur de la variable
      }
      if (option === 2) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/LapinView`);

        this.$store.commit('setActionName', "/ GestionLapin"); // Utiliser la mutation pour changer la valeur de la variable
      }
      if (option === 3) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}`);
      }
      if (option === 4) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}`);
      }
      if (option === 5) {
        this.$router.push(
          `/dashboard/${userId}/ferme/${fermeId}/GererMesFermes`
        );
        this.$store.commit('setActionName', "/ GestionFerme");
      }
    },
  },
};
</script>
