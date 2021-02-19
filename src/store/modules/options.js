import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import { GROUP_ALL } from '../../mixins/joke';
import { toConfig } from '../../mappers/configMapper';
import { unify } from '../../utils/Mapper';
Vue.use(Vuex);

const state = {
  options: {
    idRange: [],
    categories: [],
    types: [],
    flags: [],
  },
  actGroup: { id: GROUP_ALL },
  actLang: 'en',
};
const mutations = {
  setOptions(state, options) {
    const optionsU = unify(options, toConfig);
    if (optionsU) state.options = optionsU;
  },
  setActLang(state, lang) {
    if (state.options.idRange?.[lang]) state.actLang = lang;
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
          commit('setOptions', resp.data?.jokes);
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
