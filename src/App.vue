<template>
  <div id="app" class="container">
    <div class="hook-add" @click="formVisible = true"><strong>+</strong></div>
    <div class="row logo-wrap">
      <div class="lottery"></div>
      <img alt="Joke logo" src="./assets/smile.png" />
    </div>
    <div class="row">
      <group @selected="setJokeGroup" />
    </div>
    <div class="row">
      <ul class="list-selector selector-lang">
        <li
          v-for="(lang, iso) in options.jokes.idRange"
          :key="iso"
          @click="setLanguage(iso)"
          :class="{ active: actLang === iso }"
        >
          {{ iso }}
        </li>
      </ul>
    </div>
    <jokes :group-key="jokeGroup.key" />
    <div class="row btn-wrap">
      <button class="btn btn-outline-primary btn--blue" @click="getJokeRandom">
        Get more fun!
      </button>
    </div>
    <jokeForm v-if="formVisible" :visible="formVisible" @close="formVisible = !formVisible" />
    <alert />
  </div>
</template>

<script>
import jokes from './components/joke';
import group from './components/joke/group';
export default {
  name: 'App',
  data() {
    return {
      formVisible: false,
      jokeGroup: '',
    };
  },
  components: {
    jokes,
    group,
    jokeForm: () => import('./components/joke/form'),
    alert: () => import('./components/alert'),
  },
  computed: {
    actLang() {
      return this.$store.getters.getActLang;
    },
    options() {
      return this.$store.getters.getOptions;
    },
  },
  created() {
    this.$store.dispatch('getOptions');
  },
  methods: {
    setJokeGroup(jokeGroup) {
      this.jokeGroup = jokeGroup.key;
    },
    getJokeRandom() {
      this.$store.dispatch('getJokeRandom', this.actLang);
    },
    setLanguage(iso) {
      this.$store.commit('setActLang', iso);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.logo-wrap {
  position: relative;
  justify-content: center;
}
.list-selector {
  display: inline-flex;
  width: 100%;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.list-selector > li {
  display: flex;
  border: 2px solid #0084ff;
  border-radius: 0 10px;
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  letter-spacing: 1px;
}
.list-selector > li.active {
  background-color: #0084ff;
  border: 2px solid #cccccc;
  color: white;
}
.list-selector > li:hover {
  border-color: #0062cc;
  cursor: pointer;
  text-decoration: underline;
}
.btn-wrap {
  justify-content: center;
  margin-top: 15px;
}
.logo-wrap > img {
  height: 300px;
  width: auto;
}
.hook-add {
  position: fixed;
  top: 8%;
  right: 0%;
  transform: translate(-100%, -100%);
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border-radius: 50%;
  color: #ffffff;
  background-color: #0084ff;
  border: 2px solid #cccccc;
}
.hook-add:hover {
  background-color: #0069d9;
  border-color: #0062cc;
  cursor: pointer;
}
</style>
