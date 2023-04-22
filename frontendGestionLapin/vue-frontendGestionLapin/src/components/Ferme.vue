<template>
  <div class="bg-white p-4 w-60 h-100">
    <ul>
      <li v-for="item in fermeLenght" :key="item" >
       {{ nomFerme[item - 1]
        }}<Button :name="btnName" @click="basculer(id[item - 1])" class="ml-2 bg-secondary cursor-pointer text-white"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from './Button.vue';
import axios from "axios";

export default {
  components: {
    Button,
  },
  data() {
    return {
      id: [],
      nomFerme: [],
      fermeLenght: 0,
      btnName: "Se connecter",
    };
  },
  mounted() {
    // Récupération du token depuis le local storage
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/fermes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((ferme) => {
        for (let index = 0; index < ferme.data.length; index++) {
          this.id.push(ferme.data[index].fermeID);
          this.nomFerme.push(ferme.data[index].nomFerme);
          this.fermeLenght = ferme.data.length;
        }
        console.log(ferme);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    basculer(id) {
      
      const token = localStorage.getItem("token");
      localStorage.setItem('fermeId', id);
     
      const fermeId = localStorage.getItem('fermeId');
      const userId = localStorage.getItem('userId');

      axios
        .get(`http://localhost:3000/api/switch/${fermeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((ferme) => {
          console.log(ferme);
        location.reload()
          
       
        })
        .catch((error) => console.log(error));
      this.$router.replace(`/dashboard/${userId}/ferme/${fermeId}`);
          
          
    },
  },
};
</script>
