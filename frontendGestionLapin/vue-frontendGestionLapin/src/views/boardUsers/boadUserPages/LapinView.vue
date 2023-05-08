<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <Button
        :name="btnName"
        class="bg-secondary text-white hover:bg-secondaryhover"
        @click="changePage"
      />

      <div
        class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">RECHERCHE</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full pl-10 p-2"
                  placeholder="Recherche"
                  required=""
                />
              </div>
            </form>
          </div>
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <div class="flex items-center space-x-3 w-full md:w-auto">
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="h-4 w-4 mr-2 text-gray-400"
                  viewbox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Filtre
                <svg
                  class="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
              <div
                id="filterDropdown"
                class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <h6
                  class="mb-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Selectionnez
                </h6>
                <ul
                  class="space-y-2 text-sm"
                  aria-labelledby="filterDropdownButton"
                >
                  <li class="flex items-center">
                    <input
                      id="apple"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-secondary focus:ring-secondary focus:ring-2"
                    />
                    <label
                      for="apple"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >Voir les lapines (56)</label
                    >
                  </li>
                  <li class="flex items-center">
                    <input
                      id="fitbit"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-secondary focus:ring-secondary focus:ring-2"
                    />
                    <label
                      for="fitbit"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >Voir les lapereaux (16)</label
                    >
                  </li>
                  <li class="flex items-center">
                    <input
                      id="razor"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-secondary focus:ring-secondary focus:ring-2"
                    />
                    <label
                      for="razor"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                      >Voir les lapins decédés (49)</label
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3">IDENTIFIANT</th>
                <th scope="col" class="px-4 py-3">NUMERO DE CAGE</th>
                <th scope="col" class="px-4 py-3">ORIENTATION</th>
                <th scope="col" class="px-4 py-3">SEXE</th>
                <th scope="col" class="px-4 py-3">ETAPE DE DEVELOPPEMENT</th>
                <th scope="col" class="px-4 py-3">STATUS</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b dark:border-gray-700"
                v-for="lapin in lapinsExistant"
                :key="lapin.lapinexistantID"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ lapin.carteRfidId }}
                </th>
                <td class="px-4 py-3">{{ lapin.cage }}</td>
                <td class="px-4 py-3">{{ lapin.orientation }}</td>
                <td class="px-4 py-3">{{ lapin.sexe }}</td>
                <td class="px-4 py-3">{{ lapin.etapeDeveloppement }}</td>
                <td class="px-4 py-3">{{ lapin.status }}</td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <Button
                    :name="btnVoirPlus"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    @click="
                      changeProfilLapin(
                        lapin.carteRfidId,
                        lapin.lapinexistantID
                      )
                    "
                  />
                </td>
              </tr>
              <tr
                class="border-b dark:border-gray-700"
                v-for="lapin in lapinsAutreFerme"
                :key="lapin.lapinautrefermeID"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ lapin.carteRfidId }}
                </th>
                <td class="px-4 py-3">{{ lapin.cage }}</td>
                <td class="px-4 py-3">{{ lapin.orientation }}</td>
                <td class="px-4 py-3">{{ lapin.sexe }}</td>
                <td class="px-4 py-3">{{ lapin.etapeDeveloppement }}</td>
                <td class="px-4 py-3">{{ lapin.status }}</td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <Button
                    :name="btnVoirPlus"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    @click="
                      changeProfilLapin(
                        lapin.carteRfidId,
                        lapin.lapinautrefermeID
                      )
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav
          class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white"
              >1-10</span
            >
            of
            <span class="font-semibold text-gray-900 dark:text-white"
              >1000</span
            >
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >1</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >2</a
              >
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >3</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >...</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >100</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import { initFlowbite } from "flowbite";
import axios from "axios";
import Button from "../../../components/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      btnName: "Enregistrer vos lapins",
      btnVoirPlus: "Voir plus",
      lapinsAutreFerme: [],
      lapinsExistant: [],
    };
  },

  mounted() {
    initFlowbite();
    const fermeId = localStorage.getItem("fermeId");
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/api/${fermeId}/lapins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((lapins) => {
        console.log(lapins);
        this.lapinsAutreFerme = lapins.data.lapinsAutreFerme;
        this.lapinsExistant = lapins.data.lapinsExistant;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    changePage() {
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      this.$router.push(`/dashboard/${userId}/ferme/${fermeId}/Enregistrement`);

      this.$store.commit("setActionName", "/ GestionLapin / Enregistrement");
    },
    changeProfilLapin(carteRfidId, lapinId) {
      localStorage.setItem("carteRfidId", carteRfidId);
      localStorage.setItem("lapinId", lapinId);
      const fermeId = localStorage.getItem("fermeId");
      const userId = localStorage.getItem("userId");
      this.$router.push(
        `/dashboard/${userId}/ferme/${fermeId}/${carteRfidId}/ProfilLapin`
      );
    },
  },
};
</script>

<style></style>
