import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const state = {
  jokes: []
};
const mutations = {
  putJoke(state, joke) {
    if (!state.jokes.find(item => item.id === joke.id) || joke.id < 0)
      state.jokes.push(joke);
  }
};

const getters = {
  getJokes: state => language => {
    return state.jokes.filter(
      item =>
        item.lang.localeCompare(language, undefined, {
          sensitivity: "accent"
        }) === 0
    );
  }
};
const actions = {
  /* In documentation there is ID represented as autoincrement + 1 pointer which cant by skipped.
  Joke id cant be removed or manipulated to interrupt sequence n+1 starting from zero.
  Better then asking for random generating joke with api function is better create array of Ids and 
  exclude ids already given. We will sure that jokes will not duplicated and every request will response unique joke
  for our app.
  */
  getJokeRandom({ commit, state, getters }, language = "en") {
    let arrayOfIds = [];
    const options = getters.getOptions;
    const lang = language.toLowerCase();
    if (options?.jokes?.idRange?.[lang].length !== 2) {
      commit("showAlert", "There are not jokes for selected language.");
      return false;
    }
    for (let i = 0; i < options.jokes.idRange[lang][1]; i++) {
      if (
        state.jokes.findIndex(item => item.lang === lang && item.id === i) ===
        -1
      ) {
        arrayOfIds.push(i);
      }
    }
    if (arrayOfIds.length === 0) {
      commit("showAlert", "Limit of jokes for current language was reached.");
      return false;
    }
    const randomIndex = Math.floor(Math.random() * arrayOfIds.length);
    const url = "joke/Any?idRange=" + arrayOfIds[randomIndex] + "&lang=" + lang;
    axios
      .get(url)
      .then(resp => {
        if (!resp.data.error) {
          commit("putJoke", resp.data);
        }
        commit("showAlert", resp.data.error?.additionalInfo ?? "");
      })
      .catch(err => {
        console.log(err);
      });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
