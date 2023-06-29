import { createStore } from "vuex";

const store = createStore({
  state: {
    // état initial
    ActionName: "/ Dashboard",
    currentComponent: "DiagnosticRecherche",
    //ma page ferme
    currentComponent2: null,
    //variables pour aficher le nom de la ferme courant
    nameDashboard: "",
    //variable permettant de recuperer l'id de l'accouplement
    IdAccouplement: 0,

    

    //Variable pour gerer focus pour montrer à l'eleveur qu'il est dans cette section
    selectedOption: 1,
  },
  getters: {},
  mutations: {
    // mutations pour modifier l'état
    setActionName(state, value) {
      state.ActionName = value;
    },
    setnameDashboard(state, value) {
      state.nameDashboard = value;
    },
    setCurrentComponent(state, value) {
      state.currentComponent = value;
    },
    setCurrentComponent2(state, value) {
      state.currentComponent2 = value;
    },
    setIdAccouplement(state, value) {
      state.IdAccouplement = value;
    },
    setnbLapinVivant(state, value) {
      state.nbLapinVivant = value;
    },
    setnbLapinDecede(state, value) {
      state.nbLapinDecede = value;
    },
    setnbLapinVendu(state, value) {
      state.nbLapinVendu = value;
    },
    setselectedOption(state, value) {
      state.selectedOption = value;
    },
  },
  actions: {},
  modules: {},
});

export default store;
