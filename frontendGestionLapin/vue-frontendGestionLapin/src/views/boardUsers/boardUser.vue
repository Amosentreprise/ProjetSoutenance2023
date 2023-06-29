<template>
  <div class="relative overflow-hidden">
    <SideBar :nameFerme="nameDashboard" :ActionName="ActionName">
      <template v-slot:options>
        <ul class="py-4 text-xl font-medium">
          <li
            class="pl-6 pr-4 py-3 text-white hover:font-bold relative"
            :class="{ 'bg-secondaryhover': option.id === selectedOption }"
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
        <span
          class="relative inline-flex items-center hover:bg-gray-200 rounded-full p-2 mr-2"
          @click="notificationPage()"
          :class="notification"
        >
          <Icon :icon="BellIcon" class="w-6 h-6 text-secondaryhover" />
          <div
            class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2"
          >
            1
          </div>
        </span>
        <span
          class="hover:bg-gray-200 rounded-full p-2"
          data-popover-target="popover-profileMenu"
          data-popover-placement="bottom"
        >
          <Icon :icon="userIcon" class="w-6 h-6 text-secondary" />
        </span>
        <ProfileMenu />
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
import { initFlowbite } from "flowbite";
import io from "socket.io-client";

export default {
  components: {
    SideBar,
    ProfileMenu,
    Icon,
    Ferme,
  },

  data() {
    return {
      socket: null,
      showMenu: false,

      userIcon: UserCircleIcon,

      deconnexionIcon: LogoutIcon,
      deconnexionName: "Se deconnecter",
      fermeId: null,
      BellIcon: BellIcon,
      notification: "",

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
        }
        // ,
        // {
        //   id: 6,
        //   nom: "Consulter les actualités",
        //   icon: NewspaperIcon,
        //   role: "2",
        // },
      ],
    };
  },

  mounted() {
    
    initFlowbite();
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
        const nameferme = response.data.ferme.nomFerme;
        localStorage.setItem("nameFerme", nameferme);
        this.$store.state.nameDashboard = localStorage.getItem("nameFerme");

        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        window.location.href = "/non-autorise";
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
    },
    nameDashboard() {
      return this.$store.state.nameDashboard;
    },
    selectedOption() {
      localStorage.setItem("selectedOption", this.$store.state.selectedOption);

      return parseInt(localStorage.getItem("selectedOption"));
    },
  },
  created() {
    this.$store.state.nameDashboard = localStorage.getItem("nameFerme");
    const token = localStorage.getItem("token");
    //Utilisation de socket io
    this.socket = io("http://localhost:3000", {
      auth: {
        token: token,
      },
    }); // Se connecter à l'URL du serveur Socket.io
    // Écouter l'événement "welcome" pour recevoir la notification de bienvenue
    this.socket.on("welcome", (message) => {
      console.log(message);
    });

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
          localStorage.removeItem("nameFerme");
          window.location.href = "/Connexion";
        }
        return Promise.reject(error);
      }
    );
  },
  beforeDestroy() {
    // Déconnexion du socket lorsque le composant est détruit
    this.socket.disconnect();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("nameFerme");
      localStorage.removeItem("symptomeId");

      this.$router.push("/Connexion");
      this.socket.on("deconnexion", (response) => {
        console.log(response);
      });
    },
    liens(option) {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      if (option === 1) {
        this.$store.commit("setselectedOption", 1);
        console.log(this.$store.state.selectedOption);
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Home`);

        this.$store.commit("setActionName", "/ Dashboard"); // Utiliser la mutation pour changer la valeur de la variable
      }
      if (option === 2) {
        this.$store.commit("setselectedOption", 2);
        console.log(this.$store.state.selectedOption);
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/LapinView`);
        this.$store.commit("setActionName", "/ GestionLapin"); // Utiliser la mutation pour changer la valeur de la variable
      }
      if (option === 3) {
        this.$store.commit("setselectedOption", 3);
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/CycleDeVie`);
        this.$store.commit("setActionName", "/ CycleDeVie");
      }
      if (option === 4) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Diagnostic`);
        this.$store.commit("setselectedOption", 4);
        this.$store.commit("setActionName", "/ Diagnostic");
      }
      if (option === 5) {
        this.$store.commit("setselectedOption", 5);
        this.$router.push(
          `/dashboard/${userId}/ferme/${fermeId}/GererMesFermes`
        );
        this.$store.commit("setActionName", "/ GestionFerme");
      }
    },
    notificationPage() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      this.notification = "bg-gray-200";
      this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Notifications`);
      this.$store.commit("setActionName", "/ Notifications");
    },
  },
};
</script>
