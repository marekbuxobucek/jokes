import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const state = {
  alert: "",
  interrupted: false
};
const mutations = {
  showAlert(state, msg) {
    state.alert = msg;
    state.interrupted = !state.interrupted;
  }
};
const getters = {
  getAlert: state => {
    return state.alert;
  },
  getAlertInterruption: state => {
    return state.interrupted;
  }
};
export default {
  state,
  getters,
  mutations
};
