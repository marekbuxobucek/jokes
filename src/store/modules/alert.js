import Vuex from 'vuex';
import Vue from 'vue';
import { ALERT_TYPE_INFO } from '../../mixins/alert';

Vue.use(Vuex);

const state = {
  alert: null,
  alertInterruption: false,
};
const mutations = {
  showAlert(state, { msg, type = ALERT_TYPE_INFO }) {
    state.alert = { msg: msg || 'Something went wrong', type };
    state.alertInterruption = !state.alertInterruption;
  },
};
const getters = {
  getAlert: (state) => {
    return state.alert;
  },
  getAlertInterruption: (state) => {
    return state.alertInterruption;
  },
};
export default {
  state,
  getters,
  mutations,
};
