<template>
  <div class="w-full h-full flex justify-between">
    <div class="w-1/3">
      <h1 class="text-xl font-milky">Notifications</h1>
    </div>
    <div class="w-2/3">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="m-3 shadow-sm"
      >
        <div class="bg-white border-l-4 border-blue-500 p-3">
          <h1 class="text-xl font-montsserat">{{ notification.titre }}</h1>
          <p class="my-4 font-poppins">{{ notification.contenu }}</p>
          <div v-if="notification.type == 2">
            <Button
              :name="btnName"
              class="bg-secondary text-white"
              @click="gererAccouplement"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initFlowbite } from "flowbite";
import axios from "axios";
import Button from "./Button.vue";
export default {
  name: "Notification",
  components: {
    Button,
  },

  data() {
    return {
      btnName: "Voir plus",
      notifications: [
        // {
        //   id: 0,
        //   titre: "Changement d'etape de developpement",
        //   contenu: "Le lapin 300 n'est plus un nouveau né ",
        //   type: 1,
        // },
        {
          id: 1,
          titre: "Recommandation Pour accouplement",
          contenu:
            "Le lapin 103 de la cage A3 et la lapine 104 de la cage A3 peuvent s'accoupler",
          type: 2,
        },
      ],
    };
  },

  mounted() {
    initFlowbite();
    const token = localStorage.getItem("token");

    const fermeId = localStorage.getItem("fermeId");

    axios
      .get(`http://localhost:3000/api/notification/${fermeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((notification) => {
        console.log(notification);
      })
      .catch((error) => console.log(error));
  },

  methods: {
    gererAccouplement() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/CycleDeVie`);
      this.$store.commit("setActionName", "/ CycleDeVie");
    },
  },
};
</script>

<style lang="scss" scoped></style>
