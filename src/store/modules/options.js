import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const state = {
  options: {
    jokes: {
      idRange: [],
      categories: [],
      types: [],
      flags: [],
    },
  },
  actGroup: { id: 0 },
  actLang: 'en',
};
const mutations = {
  setOptions(state, options) {
    state.options = options;
  },
  setActLang(state, lang) {
    if (state.options.jokes.idRange?.[lang]) state.actLang = lang;
  },
  setActGroup(state, group) {
    state.actGroup = group;
  },
};
const getters = {
  getOptions: (state) => {
    return state.options;
  },
  getActLang: (state) => {
    return state.actLang;
  },
  getActGroup: (state) => {
    return state.actGroup;
  },
};
const actions = {
  getOptions({ commit }) {
    axios
      .get('info')
      .then((resp) => {
        if (!resp?.data?.error) {
          commit('setOptions', resp.data);
        } else {
          commit('showAlert', resp.data.error?.additionalInfo ?? '');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
