<template>
  <div class="min-h-screen bg-gray-100">
    <div class="py-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-secondary">
              {{ fullName }}
            </h3>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1" v-show="role == '2'">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-secondary">{{ email }}</dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ phone }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between">
        <Button :name="ButtonName" class="bg-secondary text-white mt-2 " @click="changePage1"/>
        <Button :name="ButtonName2" class="bg-secondary text-white mt-2" @click="changePage2" />
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import Button from "../../../components/Button.vue";
import axios from "axios";
export default {
  name: "ProfilePage",

  components: {
    Button,
   
  },
  data() {
    return {
      ButtonName: "EDITER MON PROFIL",
      ButtonName2: "CHANGER MON MOT DE PASSE",
      user: {
        nom: "",
        prenom: "",
        email: "",
        phone: "",
      },
    };
  },
  computed: {
    fullName() {
      return `${this.user.nom} ${this.user.prenom}`;
    },

    email() {
      return this.user.email;
    },
    phone() {
      return this.user.phone;
    },

    role() {
      return localStorage.getItem("roleId");
    },
  },

  methods: {
    changePage1() {
    const fermeId = localStorage.getItem('fermeId')
       const userId = localStorage.getItem('userId')
         this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/EditProfil`);
      
    },
    changePage2() {
      const fermeId = localStorage.getItem('fermeId')
       const userId = localStorage.getItem('userId')
         this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/ChangePassword`);
    }
  },
  mounted() {
    // Récupération du token depuis le local storage
    const token = localStorage.getItem("token");

    // Ajout du token dans les headers d'une requête
    axios
      .get("http://localhost:3000/api/dashboard/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.proprietaire) {
          console.log(response.data.proprietaire);
          this.user.nom = response.data.proprietaire.nom;
          this.user.prenom = response.data.proprietaire.prenom;
          this.user.email = response.data.proprietaire.email;
          this.user.phone = response.data.proprietaire.numerosTel;
        }
        if (response.data.eleveur) {
          console.log(response.data.eleveur);
          this.user.nom = response.data.eleveur.nom;
          this.user.prenom = response.data.eleveur.prenom;

          this.user.phone = response.data.eleveur.numerosTel;
        }

        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

      
  },
};
</script>
