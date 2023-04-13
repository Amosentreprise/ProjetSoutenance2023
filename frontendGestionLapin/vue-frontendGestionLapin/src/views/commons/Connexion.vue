<template>
  <div class="flex h-screen w-full">
    <div class="m-auto flex">
      <div class="mr-10">
        <img
          src="../../assets/connexion/login.png"
          alt=""
          class="w-auto h-[400px] object-cover rounded-md"
        />
      </div>

      <form class="mt-9 w-[400px]">
        <div v-for="input in inputs" :key="input.id">
          <input
            :type="input.type"
            class="input shadow-md"
            :placeholder="input.placeholder" 
          />
        </div>
      
        <div class="flex items-start mt-4">
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
          <span class="text-secondary text-sm font-medium cursor-pointer ml-28">Mot de passe oublié ?</span>
        </div>
        <div class="mt-8 flex flex-row justify-between">
          <Button :name="BtnRegister" class="ring-2 ring-secondary text-secondary hover:ring-0 hover:bg-secondary hover:text-white" />
          <Button :name="BtnLogin" class="bg-secondary text-white hover:ring-2 hover:ring-secondary hover:bg-transparent hover:text-secondary"/>
        </div>
      </form>
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
      BtnRegister: "S'inscrire",
      BtnLogin: "Se connecter",

        inputs: [{
            id:1,
            type: 'Tel',
            placeholder: 'Votre numeros',
           
            
        },
        {
            id:2,
            type: 'password',
            placeholder: 'Votre mot de pass',
           
            
      }],
    };
  },
};
</script>
