<template>
  <div
    class="bg-white shadow-md w-auto h-auto md:h-[300px] flex"
  >
    <canvas id="lineChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "LineGraphique",


  data() {
    return {};
  },

  mounted() {
    const ctx = document.getElementById("lineChart");
    const labels = ["Jannuary", "February", "March", "April", "May"]
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Mes accouplements",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.2,
        },
      ],
    };
    const lineChart = new Chart(ctx, {
      type: "line",
      data: data,
    });
    lineChart;
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
