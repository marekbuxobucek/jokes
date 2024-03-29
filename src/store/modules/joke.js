import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import { GROUP_API, GROUP_MY, GROUP_ALL } from '../../mixins/joke';
import { ALERT_TYPE_DANGER, ALERT_TYPE_INFO } from '../../mixins/alert';
import { JOKE_DEFAULT_LANG } from '../../config';
import { toJoke } from '../../mappers/jokeMapper';
import { unify } from '../../utils/Mapper';
Vue.use(Vuex);

const state = {
  jokes: [],
  isLoadingJokes: false,
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
    if (group === GROUP_ALL) {
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
    const jokeF = unify(joke, toJoke);
    if (joke.id >= 0 && !helpers.filterJokes(state.jokes, joke.lang, GROUP_API).find((item) => item.id === joke.id)) {
      jokeF.group = GROUP_API;
      state.jokes.push(jokeF);
    }
  },
  addMyJoke(state, joke) {
    const jokeF = unify(joke, toJoke);
    jokeF.id = helpers.filterJokesByGroup(state.jokes, GROUP_MY).length;
    jokeF.group = GROUP_MY;
    state.jokes.push(jokeF);
  },
  setLoadingJokes(state, isLoading) {
    state.isLoadingJokes = !!isLoading;
  },
};

const getters = {
  getJokes: (state) => (language, group = GROUP_ALL) => {
    return helpers.filterJokes(state.jokes, language, group);
  },
  getIsLoadingJokes: (state) => state.isLoadingJokes,
};

const actions = {
  /* Better then asking for random generating joke with api function is create array of Ids and
  exclude ids already given. We will sure that jokes will not duplicated and every request will response unique joke
  for our app.
  */
  getJokeRandom({ commit, getters }, language = JOKE_DEFAULT_LANG) {
    let arrayOfIds = [];
    const options = getters.getOptions;
    const lang = language.toLowerCase();
    if (!options.idRange[lang]) {
      commit('showAlert', { msg: 'There are not jokes for selected language.', type: ALERT_TYPE_INFO });
      return false;
    }
    const jokes = getters.getJokes(lang, GROUP_API);
    for (let i = 0; i < options.idRange[lang]?.to; i++) {
      if (jokes.findIndex((item) => item.lang === lang && item.id === i) === -1) {
        arrayOfIds.push(i);
      }
    }
    if (arrayOfIds.length === 0) {
      commit('showAlert', { msg: 'Limit of jokes for current language was reached.', type: ALERT_TYPE_INFO });
      return false;
    }
    const randomIndex = Math.floor(Math.random() * arrayOfIds.length);
    const url = 'joke/Any?idRange=' + arrayOfIds[randomIndex] + '&lang=' + lang;

    commit('setLoadingJokes', true);
    axios
      .get(url)
      .then((resp) => {
        if (!resp.data.error) {
          commit('addApiJoke', resp.data);
        } else {
          commit('showAlert', {
            msg: resp.data.error?.additionalInfo ?? 'There has been some problem with loading jokes',
            type: ALERT_TYPE_DANGER,
          });
        }
        commit('setLoadingJokes', false);
      })
      .catch((err) => {
        console.log(err);
        commit('setLoadingJokes', false);
        commit('showAlert', { msg: err.message, type: ALERT_TYPE_DANGER });
      });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
