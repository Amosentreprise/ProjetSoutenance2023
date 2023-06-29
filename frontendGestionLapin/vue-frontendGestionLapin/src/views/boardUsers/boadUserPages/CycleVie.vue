<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div
      v-if="
        (accouplements1.length === 0) &
        (accouplements2.length === 0) &
        (accouplements3.length === 0) &
        (accouplements4.length === 0)
      "
      class="text-gray-500 text-center font-poppins py-4"
    >
      <img src="../../../assets/effet/bounc.gif" alt="" class="mx-auto" />
      <span> Aucune recommandation pour le moment.</span>
    </div>

    <div v-else class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="bg-white relative shadow-sm sm:rounded-lg overflow-hidden">
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        ></div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3">LAPINS</th>

                <th scope="col" class="px-4 py-3">STATUS ACCOUPLEMENT</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b dark:border-gray-700"
                v-for="accouplement in accouplements1"
                :key="accouplement.accouplementID"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Le lapin {{ accouplement.lapinMale.carteRfidId }} de la cage
                  {{ accouplement.lapinMale.cage }} et la lapine
                  {{ accouplement.lapinFemelle.carteRfidId }} de la cage
                  {{ accouplement.lapinFemelle.cage }}
                </th>

                <td class="px-4 py-3">
                  {{ accouplement.resultatAccouplement }}
                </td>
                <td class="px-4 py-3">
                  <Button
                    v-if="accouplement.resultatAccouplement == resultat"
                    :name="btnAccouplement"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="accouplement.lapinFemelle.carteRfidId"
                    :data-modal-toggle="accouplement.lapinFemelle.carteRfidId"
                    @click="saveIdAccouplement(accouplement.accouplementID)"
                  />
                </td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <Button
                    :name="btnNaissance"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="accouplement.accouplementID"
                    :data-modal-toggle="accouplement.accouplementID"
                  />
                </td>
                <GestionAccouplement
                  :id="accouplement.lapinFemelle.carteRfidId"
                  :datahide="accouplement.lapinFemelle.carteRfidId"
                />
                <GestionNaissance
                  :datahide="accouplement.accouplementID"
                  :id="accouplement.accouplementID"
                />
              </tr>
              <tr
                class="border-b dark:border-gray-700"
                v-for="accouplement in accouplements2"
                :key="accouplement.accouplementID"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Le lapin {{ accouplement.lapinautreMale.carteRfidId }} de la
                  cage {{ accouplement.lapinautreMale.cage }} et la lapine
                  {{ accouplement.lapinautreFemelle.carteRfidId }} de la cage
                  {{ accouplement.lapinautreFemelle.cage }}
                </th>

                <td class="px-4 py-3">
                  {{ accouplement.resultatAccouplement }}
                </td>
                <td class="px-4 py-3">
                  <Button
                    v-if="accouplement.resultatAccouplement == resultat"

                    :name="btnAccouplement"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="accouplement.lapinautreMale.carteRfidId"
                    :data-modal-toggle="accouplement.lapinautreMale.carteRfidId"
                    @click="saveIdAccouplement(accouplement.accouplementID)"
                  />
                </td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <Button
                    :name="btnNaissance"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="accouplement.accouplementID"
                    :data-modal-toggle="accouplement.accouplementID"
                  />
                </td>
                <GestionAccouplement
                  :id="accouplement.lapinautreMale.carteRfidId"
                  :datahide="accouplement.lapinautreMale.carteRfidId"
                />
                <GestionNaissance
                  :datahide="accouplement.accouplementID"
                  :id="accouplement.accouplementID"
                />
              </tr>
              <tr
                class="border-b dark:border-gray-700"
                v-for="accouplement in accouplements3"
                :key="accouplement.accouplementID"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Le lapin {{ accouplement.lapinautreMale.carteRfidId }} de la
                  cage {{ accouplement.lapinautreMale.cage }} et la lapine
                  {{ accouplement.lapinFemelle.carteRfidId }} de la cage
                  {{ accouplement.lapinFemelle.cage }}
                </th>

                <td class="px-4 py-3">
                  {{ accouplement.resultatAccouplement }}
                </td>
                <td class="px-4 py-3">
                  <Button
                    v-if="accouplement.resultatAccouplement == resultat"

                    :name="btnAccouplement"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="accouplement.lapinFemelle.carteRfidId"
                    :data-modal-toggle="accouplement.lapinFemelle.carteRfidId"
                    @click="saveIdAccouplement(accouplement.accouplementID)"
                  />
                </td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <Button
                    :name="btnNaissance"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="accouplement.accouplementID"
                    :data-modal-toggle="accouplement.accouplementID"
                  />
                </td>
                <GestionAccouplement
                  :id="accouplement.lapinFemelle.carteRfidId"
                  :datahide="accouplement.lapinFemelle.carteRfidId"
                />
                <GestionNaissance
                  :datahide="accouplement.accouplementID"
                  :id="accouplement.accouplementID"
                />
              </tr>
              <tr
                class="border-b dark:border-gray-700"
                v-for="accouplement in accouplements4"
                :key="accouplement.accouplementID"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Le lapin {{ accouplement.lapinMale.carteRfidId }} de la cage
                  {{ accouplement.lapinMale.cage }} et la lapine
                  {{ accouplement.lapinautreFemelle.carteRfidId }} de la cage
                  {{ accouplement.lapinautreFemelle.cage }}
                </th>

                <td class="px-4 py-3">
                  {{ accouplement.resultatAccouplement }}
                </td>
                <td class="px-4 py-3">
                  <Button
                    v-if="accouplement.resultatAccouplement == resultat"

                    :name="btnAccouplement"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="
                      accouplement.lapinautreFemelle.carteRfidId
                    "
                    :data-modal-toggle="
                      accouplement.lapinautreFemelle.carteRfidId
                    "
                    @click="saveIdAccouplement(accouplement.accouplementID)"
                  />
                </td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <Button
                    :name="btnNaissance"
                    class="bg-secondary text-white hover:bg-secondaryhover"
                    :data-modal-target="accouplement.accouplementID"
                    :data-modal-toggle="accouplement.accouplementID"
                  />
                </td>
                <GestionAccouplement
                  :id="accouplement.lapinautreFemelle.carteRfidId"
                  :datahide="accouplement.lapinautreFemelle.carteRfidId"
                />
                <GestionNaissance
                  :datahide="accouplement.accouplementID"
                  :id="accouplement.accouplementID"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { initFlowbite } from "flowbite";
import GestionAccouplement from "../../../components/GestionAccouplement.vue";
import GestionNaissance from "../../../components/GestionNaissance.vue";
import axios from "axios";
import Button from "../../../components/Button.vue";
export default {
  components: {
    Button,
    GestionAccouplement,
    GestionNaissance,
  },
  data() {
    return {
      btnAccouplement: "Enregistrer l'accouplement",
      btnNaissance: "Enregistrer la naissance",
      accouplements1: [],
      accouplements2: [],
      accouplements3: [],
      accouplements4: [],
      resultat: "EN ATTENTE",
    };
  },

  async mounted() {
    initFlowbite();
    const token = localStorage.getItem("token");
    const fermeId = localStorage.getItem("fermeId");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/accouplement/${fermeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.accouplements1 = response.data.accouplement1;
      this.accouplements2 = response.data.accouplement2;
      this.accouplements3 = response.data.accouplement3;
      this.accouplements4 = response.data.accouplement4;

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async saveIdAccouplement(IdAccouplement) {
      console.log(IdAccouplement);
      this.$store.commit("setIdAccouplement", IdAccouplement);
      const token = localStorage.getItem("token");
      const fermeId = localStorage.getItem("fermeId");
      try {
        const accouplementId = this.$store.state.IdAccouplement;
        const infoAccouplement = await axios.get(
          `http://localhost:3000/api/accouplement/${fermeId}/${accouplementId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (infoAccouplement.status == 200) {
          console.log(infoAccouplement);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
