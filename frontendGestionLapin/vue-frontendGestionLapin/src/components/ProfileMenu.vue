<template>
  <div
    data-popover
    id="popover-profileMenu"
    role="tooltip"
    class="absolute z-10 invisible transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0"
  >
    <div class="p-2 w-auto h-auto  font-montsserat">
      <div
        v-for="option in options"
        :key="option.id"
        v-show="option.role === '2'"
      >
        <div
          class="flex items-center shadow-sm hover:bg-hoverboard p-2 cursor-pointer"
          @click="liens(option.id)"
        >
          <Icon :icon="option.icone" class="w-6 h-6 mr-2 text-secondary" />
          <span>{{ option.optionName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon.vue";
import {
  LogoutIcon,
  SwitchHorizontalIcon,
  UserAddIcon,
  UserCircleIcon,
} from "@heroicons/vue/solid";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      options: [
        {
          id: 0,
          icone: UserCircleIcon,
          optionName: "Voir mon profil",
          role: "2",
        },
        {
          id: 1,
          icone: LogoutIcon,
          optionName: "Se deconnecter",
          role: "2",
        },
      ],
    };
  },
  methods: {
    liens(option) {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      if (option === 0) {
        this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Profil`);
        this.$store.commit("setActionName", "/ Profil");
      }

      if (option === 1) {
        localStorage.removeItem("token");
        this.$router.push("/Connexion");
      }
    },
  },
  mounted() {},
};
</script>
