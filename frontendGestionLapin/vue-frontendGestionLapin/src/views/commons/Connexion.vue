<template>
  <div class="flex h-screen w-full bg-primary md:bg-secondary ">
    <div class="m-auto flex bg-primary  rounded-xl">
      <div class="mr-10 hidden md:block">
        <img
          src="../../assets/connexion/connexion.png"
          alt=""
          class="w-[500px] h-[400px] object-cover rounded-md"
        />
      </div>

      <form class="mt-9 w-auto p-8 md:w-[400px] pr-4">
        <h1 class="text-2xl font-bold mb-3 text-center text-secondary md:hidden block ">Accéder à votre compte</h1>
        <div v-for="input in inputs" :key="input.id">
          <input
            :type="input.type"
            class="input shadow-md"
            :placeholder="input.placeholder" 
            v-model="input.value"
         
          />
        </div>
      
        <div class="flex  items-start mt-4">
          <div class="flex items-center h-5 ">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 shadow-md"
            
            />
          </div>
          <label
            for="remember"
            class="ml-2 text-sm font-medium text-gray-900"
            >Se rappeler de moi
          </label>
         
        </div>
         <router-link to="/ForgetPassword">
          <span class="text-secondary text-sm font-medium cursor-pointer ml-0 md:ml-20">Mot de passe oublié ?</span>
          </router-link>
        <div class="mt-8 flex flex-col md:flex-row justify-between">
    
          <Button :name="BtnRegister" @click="register" class="ring-2 ring-secondary text-secondary hover:ring-0 hover:bg-secondary hover:text-white" />
        
         
          <Button :name="BtnLogin"  @click="submit" class="bg-secondary text-white hover:ring-2 hover:ring-secondary hover:bg-transparent hover:text-secondary"/>
       
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
      BtnRegister: "S'inscrire",
      BtnLogin: "Se connecter",

        inputs: [{
            id:1,
            type: 'Tel',
          placeholder: 'Votre numeros',
           
           value:''
            
        },
        {
            id:2,
            type: 'password',
            placeholder: 'Votre mot de pass',
            value:''
            
        }],
      temporaireName:[]
    };
  },
 
  methods: {
    submit() {
     axios.post('http://localhost:3000/api/connexion', {
         telephone: this.inputs[0].value,
         password: this.inputs[1].value,

     }).then(response => {
        console.log(response)
       localStorage.setItem('token', response.data.token);
        localStorage.setItem('fermeId', response.data.fermeId);
       localStorage.setItem('userId', response.data.userId);
       localStorage.setItem('roleId', response.data.roleId);

        const fermeId = localStorage.getItem('fermeId')
       const userId = localStorage.getItem('userId')
         this.$router.push(`/dashboard/${userId}/ferme/${fermeId}`);
       

  })
  .catch(error => {
    console.log(error);
  });
    
      
      
     
    
    },
    register() {
    this.$router.push('/Inscription');
    
   }
  }
  
};
</script>
