<template>
    <div class="flex min-h-screen w-full">
  <div class="m-auto">
    <div v-show="currentStep === 1">
      <!-- contenu de la première étape -->
      
      <div v-for="form1 in Form1" :key="form1.id">
          <input
            :type="form1.type"
            class="input shadow-md "
            :placeholder="form1.placeholder" 
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
          />
      </div>

    </div>
    <div class="flex justify-between">
         <Button :name="BtnPrev" @click="prevStep" v-show="currentStep > 1" class="button bg-secondary text-white" />
         <Button :name="BtnNext" @click="nextStep" v-show="currentStep < totalSteps" class="button bg-secondary text-white" />
     
    </div>
  </div>
    </div>


</template>

<script>
import Button from "../../components/Button.vue";
export default {
    components: {
    Button,
  },
  data() {
        return {
           BtnNext: "Suivant",
      BtnPrev: "Retour",
      currentStep: 1,
      totalSteps: 2, // le nombre total d'étapes dans votre formulaire
      Form1: [{
            id:1,
            type: 'text',
            placeholder: 'Nom',
           
            
        },
        {
            id:2,
            type: 'text',
            placeholder: 'Prénoms',
           
            
            },
        {
            id:3,
            type: 'email',
            placeholder: 'Email',
           
            
            },{
            id:4,
            type: 'tel',
            placeholder: 'Telephone',
           
            
            },{
            id:5,
            type: 'password',
            placeholder: 'Password',
           
            
            },{
            id:6,
            type: 'password',
            placeholder: 'Password',
           
            
            }],
      Forms2: [{
            id:7,
            type: 'text',
            placeholder: 'Nom de la ferme',
           
            
        },
        {
            id:8,
            type: 'text',
            placeholder: 'Adresse',
           
            
      }], 
    };
  },
  methods: {
   nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep += 1;
      }
    },
      prevStep() {
          if (this.currentStep > 1) {
              this.currentStep -= 1;
          }
      },
    submitForm() {
      // soumettre les données du formulaire à votre API ou votre serveur
    },
  },
};
</script>