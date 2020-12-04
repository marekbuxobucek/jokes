import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const state = {
  jokes: [],
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

const mutations = {
  addApiJoke(state, joke) {
    if (joke.id >= 0 && !state.jokes.find((item) => item.id === joke.id)) {
      joke.group = 'api';
      state.jokes.push(joke);
    }
  },
  addMyJoke(state, joke) {
    joke.id = helpers.filterJokesByGroup(state.jokes, 'my').length;
    joke.group = 'my';
    state.jokes.push(joke);
  },
};

const getters = {
  getJokes: (state) => (language, group = '') => {
    return helpers.filterJokes(state.jokes, language, group);
  },
};
const actions = {
  /* Better then asking for random generating joke with api function is create array of Ids and
  exclude ids already given. We will sure that jokes will not duplicated and every request will response unique joke
  for our app.
  */
  getJokeRandom({ commit, getters }, language = 'en') {
    let arrayOfIds = [];
    const options = getters.getOptions;
    const lang = language.toLowerCase();
    if (options?.jokes?.idRange?.[lang].length !== 2) {
      commit('showAlert', 'There are not jokes for selected language.');
      return false;
    }
    const jokes = getters.getJokes(lang, 'api');
    for (let i = 0; i < options.jokes.idRange[lang][1]; i++) {
      if (jokes.findIndex((item) => item.lang === lang && item.id === i) === -1) {
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
