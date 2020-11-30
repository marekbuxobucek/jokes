import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const state = {
  apiJokes: [],
  myJokes: [],
};
const mutations = {
  addApiJoke(state, joke) {
    if (joke.id >= 0 && !state.apiJokes.find((item) => item.id === joke.id)) {
      joke.group = 'api';
      state.apiJokes.push(joke);
    }
  },
  addMyJoke(state, joke) {
    joke.id = state.myJokes.length;
    joke.group = 'my';
    state.myJokes.push(joke);
  },
};
const helpers = {
  filterJokesByLang(jokes, language) {
    return jokes.filter(
      (item) =>
        item.lang.localeCompare(language, undefined, {
          sensitivity: 'accent',
        }) === 0
    );
  },
  filterJokesByGroup(jokes, group) {
    if (group === '') {
      return jokes;
    }
    return jokes.filter(
      (item) =>
        item.group.localeCompare(group, undefined, {
          sensitivity: 'accent',
        }) === 0
    );
  },
  filterJokes(jokes, language, group) {
    return this.filterJokesByGroup(this.filterJokesByLang(jokes, language), group);
  },
};
const getters = {
  getJokes: (state) => (language, group = '') => {
    return helpers.filterJokes(state.apiJokes.concat(state.myJokes), language, group);
  },
};
const actions = {
  /* In documentation there is ID represented as autoincrement + 1 pointer which cant by skipped.
  Joke id cant be removed or manipulated to interrupt sequence n+1 starting from zero.
  Better then asking for random generating joke with api function is better create array of Ids and 
  exclude ids already given. We will sure that jokes will not duplicated and every request will response unique joke
  for our app.
  */
  getJokeRandom({ commit, state, getters }, language = 'en') {
    let arrayOfIds = [];
    const options = getters.getOptions;
    const lang = language.toLowerCase();
    if (options?.jokes?.idRange?.[lang].length !== 2) {
      commit('showAlert', 'There are not jokes for selected language.');
      return false;
    }
    for (let i = 0; i < options.jokes.idRange[lang][1]; i++) {
      if (state.apiJokes.findIndex((item) => item.lang === lang && item.id === i) === -1) {
        arrayOfIds.push(i);
      }
    }
    if (arrayOfIds.length === 0) {
      commit('showAlert', 'Limit of jokes for current language was reached.');
      return false;
    }
    const randomIndex = Math.floor(Math.random() * arrayOfIds.length);
    const url = 'joke/Any?idRange=' + arrayOfIds[randomIndex] + '&lang=' + lang;
    axios
      .get(url)
      .then((resp) => {
        if (!resp.data.error) {
          commit('addApiJoke', resp.data);
        }
        commit('showAlert', resp.data.error?.additionalInfo ?? '');
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
