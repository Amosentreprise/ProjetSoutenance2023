<template>
    <div class="flex ">
        <form class="w-[400px] m-auto mt-10">
        <div>
          <div>
          
            <div v-for="form in Forms" :key="form.id">
              <input
                :type="form.type"
                class="input shadow-md"
                :placeholder="form.placeholder"
              />
            </div>
          </div>
          <div>
            <router-link to="/BoardUser">
              <Button
                :name="BtnName"
              
                class="block w-full button bg-secondary text-white mt-3"
              />
            </router-link>
           
          </div>
        </div>
      </form>
    </div>
</template>
<script>
 import Button from "../../../components/Button.vue";
export default {
    components: {
        Button,
    },
    data() {
        return {

            BtnName: "VALIDER",

            Forms: [
                {
                    id: 1,
                    type: "text",
                    placeholder: "Nom de l'eleveur",
                },
                {
                    id: 2,
                    type: "text",
                    placeholder: "Prenom de l'eleveur",
                },
            ],
        };
    },

};

</script>