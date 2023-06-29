<template>
  <div
    class="bg-white shadow-md w-auto h-auto md:w-[300px] md:h-[300px] rounded-md flex"
  >
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  name: "FrontendGestionLapinGraphique",

  data() {
    return {};
  },

  mounted() {
    const token = localStorage.getItem("token");

    this.fermeId = this.$route.params.fermeId;
    const fermeId = this.fermeId;
    axios
      .get(`http://localhost:3000/api/statistiques/${fermeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const data = {
            labels: [
              `${response.data.nombreLapinTotalMort} Lapin(s) Decedé(s)`,
              `${response.data.nombreLapinTotalVivant} Lapin(s) Vivant(s)`,
              `${response.data.nombreLapinTotalVendu} Lapin(s) Vendu(s)`,
            ],
            datasets: [
              {
                label: "Lapin",
                data: [
                  response.data.nombreLapinTotalMort,
                  response.data.nombreLapinTotalVivant,
                  response.data.nombreLapinTotalVendu,
                ],
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
              },
            ],
          };
          const ctx = document.getElementById("myChart");
          const myChart = new Chart(ctx, {
            type: "doughnut",
            data: data,
          });
          myChart;
        }
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

 
  },
  computed: {
    
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
