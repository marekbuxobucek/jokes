<template>
  <div id="app" class="container">
    <div class="hook-add" @click="formVisible = true"><strong>+</strong></div>
    <div class="row logo-wrap">
      <div class="lottery"></div>
      <img alt="Joke logo" src="./assets/smile.png" />
    </div>
    <div class="row block-title">
      <h3>Find or create funniest Joke</h3>
    </div>
    <div class="row">
      <group />
    </div>
    <div class="row">
      <language />
    </div>
    <jokes />
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
import group from './components/joke/filter/group';
import language from './components/joke/filter/language';
export default {
  name: 'App',
  data() {
    return {
      formVisible: false,
    };
  },
  computed: {
    actLang() {
      return this.$store.getters.getActLang;
    },
  },
  components: {
    jokes,
    group,
    language,
    jokeForm: () => import('./components/joke/form'),
    alert: () => import('./components/alert'),
  },
  methods: {
    getJokeRandom() {
      this.$store.dispatch('getJokeRandom', this.actLang);
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
