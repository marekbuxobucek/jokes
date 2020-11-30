import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import joke from './modules/joke';
import options from './modules/options';
import alert from './modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    joke,
    alert,
    options,
  },
  plugins: [createPersistedState({ paths: ['options', 'actLang', 'myJokes'] })],
});
