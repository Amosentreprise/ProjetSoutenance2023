<template>
  <div class="flex min-h-screen w-full">
    <div class="m-auto flex">
      <div class="mr-10">
        <img
          src="../../assets/inscription/signUp.png"
          alt=""
          class="w-auto h-[400px] object-cover rounded-md"
        />
      </div>
      <form class="w-[400px]">
        <div>
          <div v-show="currentStep === 1" class="w-full">
            <!-- contenu de la première étape -->

            <div v-for="form1 in Form1" :key="form1.id">
              <input
                :type="form1.type"
                class="input shadow-sm"
                :placeholder="form1.placeholder"
                v-model="form1.Value"
              />
            </div>
          </div>
          <div v-show="currentStep === 2">
            <!-- contenu de la deuxième étape -->
            <div v-for="form2 in Forms2" :key="form2.id">
              <input
                :type="form2.type"
                class="input shadow-md"
                :placeholder="form2.placeholder"
                v-model="form2.Value"
              />
            </div>
          </div>
          <div>
            
              <Button
                :name="BtnPrev"
                v-show="currentStep > 1"
                class="block w-full button bg-secondary text-white mt-3"
                @click="submitForm"
              />
          
            <Button
              :name="BtnNext"
              @click="nextStep"
              v-show="currentStep < totalSteps"
              class="block w-full button bg-secondary text-white mt-3"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "../../components/Button.vue";
import axios from "axios";
export default {
  components: {
    Button,
  },
  data() {
    return {
      BtnNext: "Suivant",
      BtnPrev: "VALIDER",
      currentStep: 1,
      totalSteps: 2, // le nombre total d'étapes dans votre formulaire
      Form1: [
        {
          id: 1,
          type: "text",
          placeholder: "Nom",
          Value:''
        },
        {
          id: 2,
          type: "text",
          placeholder: "Prénoms",
          Value:''
        },
        {
          id: 3,
          type: "email",
          placeholder: "Email",
          Value:''
        },
        {
          id: 4,
          type: "tel",
          placeholder: "Telephone",
          Value:''
        },
        {
          id: 5,
          type: "password",
          placeholder: "Password",
          Value:''
        },
        {
          id: 6,
          type: "password",
          placeholder: "Password",
          Value:''
        },
      ],
      Forms2: [
        {
          id: 7,
          type: "text",
          placeholder: "Nom de la ferme",
          Value:''
        },
        {
          id: 8,
          type: "text",
          placeholder: "Adresse",
          Value:''
        },
      ],
    };
  },
  methods: {
    nextStep() {
     
      if (this.currentStep < this.totalSteps) {
        this.currentStep += 1;
              
     
      }
    },
    
    submitForm() {
      // soumettre les données du formulaire à votre API ou votre serveur
      
   axios.post('http://localhost:3000/api/inscription', {
        nom: this.Form1[0].Value,
        prenom: this.Form1[1].Value,
        email: this.Form1[2].Value,
        telephone: this.Form1[3].Value,
        password: this.Form1[4].Value,
        nomferme: this.Forms2[0].Value,
        adressferme: this.Forms2[1].Value,
      }).then(response => {
   this.$router.push('/Connexion')
  })
  .catch(error => {
    console.log(error);
  });
    
      
    },
  },
};
</script>
