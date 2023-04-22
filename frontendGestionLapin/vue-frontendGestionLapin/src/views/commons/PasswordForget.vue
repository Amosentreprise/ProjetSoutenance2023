<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="w-full">
      <h2 class="text-center text-2xl font-extrabold text-secondary p-4">
        Rénitialiser votre mot de passe
      </h2>
      <p class="mt-2 text-center text-sm">
        Ou
        <router-link to="/Connexion"
          ><span class="font-medium text-secondary cursor-pointer"
            >Revenir à la page de connexion</span
          ></router-link
        >
      </p>
    </div>

    <div class="mx-auto">
      <form class="w-[400px]">
        <div v-show="currentshow === 1">
          <div class="mt-1">
            <input type="tel" name="" id="" class="input" placeholder="numero de telephone" />
          </div>
        </div>

        <div v-show="currentshow === 2">
          
          <div>
            <input type="text" name="" id="otp" class="input" placeholder="Code de verification" />
          </div>
        </div>
        <div v-show="currentshow === 3">
          
          <div>
            <input type="password" name="" id="otp" class="input" placeholder="le nouveau mot de passe"/>
          </div>
        </div>

        <div>
          <Button
            :name="nameButton1"
            @click="nextStep"
            v-show="currentshow === 1"
            class="button bg-secondary text-white mt-2 w-full"
          />
          <Button
            :name="nameButton2"
            v-show="currentshow === 2"
            @click="nextStep"
            class="button bg-secondary text-white mt-2 w-full"
          />
          <Button
            :name="nameButton3"
            v-show="currentshow === 3"
            @click="submit"
            class="button bg-secondary text-white mt-2 w-full"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "../../components/Button.vue";
export default {
  name: "",
  components: {
    Button,
  },

  data() {
    return {
      nameButton1: "ENVOYER",
      nameButton2: "ENVOYER",
      nameButton3: "SUIVANT",

      currentshow: 1,
      totalstep: 3,
    };
  },

  mounted() {},

  methods: {
    nextStep() {
      if (this.currentshow < this.totalstep) {
        this.currentshow++;
      }
    },
    submit() {
      this.$router.push("/BoardUser");
    },
  },
};
</script>

<style lang="scss" scoped></style>
