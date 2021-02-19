<template>
  <div id="main" class="container">
    <navigation @showAddJokeForm="isAddJokeFormVisible = true" />
    <div class="row logo-wrap">
      <div class="lottery"></div>
      <img alt="Joke logo" src="@/assets/smile.png" />
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
    <jokes v-infinite-scroll="getJokeRandom" infinite-scroll-disabled="busy" infinite-scroll-distance="10" />
    <div class="row btn-fun">
      <button
        v-if="!isLoadingJokes && !isMyGroupActive"
        class="btn btn-outline-primary btn--blue"
        @click="getJokeRandom"
      >
        Get more fun!
      </button>
      <loading v-else />
    </div>
    <jokeForm v-if="isAddJokeFormVisible" :visible="isAddJokeFormVisible" @close="isAddJokeFormVisible = false" />
    <alert />
  </div>
</template>

<script>
import jokes from './components/joke';
import group from './components/joke/filter/group';
import language from './components/joke/filter/language';
import navigation from './components/navigation';
import loading from './components/Loading';
import infiniteScroll from 'vue-infinite-scroll';
import { GROUP_MY } from './mixins/joke';

export default {
  name: 'App',

  directives: { infiniteScroll },

  components: {
    jokes,
    group,
    language,
    navigation,
    loading,
    jokeForm: () => import('./components/joke/form'),
    alert: () => import('./components/alert'),
  },

  data() {
    return {
      isAddJokeFormVisible: false,
    };
  },

  computed: {
    actLang() {
      return this.$store.getters.getActLang;
    },
    isLoadingJokes() {
      return this.$store.getters.isLoadingJokes;
    },
    actGroup() {
      return this.$store.getters.getActGroup;
    },
    isMyGroupActive() {
      return this.actGroup.id === GROUP_MY;
    },
  },

  methods: {
    getJokeRandom() {
      this.$store.dispatch('getJokeRandom', this.actLang);
    },
  },
};
</script>

<style scoped>
#main {
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
.btn-fun {
  justify-content: center;
  margin-top: 15px;
}
.logo-wrap > img {
  height: 300px;
  width: auto;
}
</style>
