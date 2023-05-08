import { createStore } from "vuex";

const store = createStore({
  state: {
    // état initial
    ActionName: "/ Dashboard",
  },
  getters: {},
  mutations: {
    // mutations pour modifier l'état
    setActionName(state, value) {
      state.ActionName = value;
    },
  },
  actions: {},
  modules: {},
});

export default store;
