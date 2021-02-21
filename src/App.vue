<template>
  <div id="main" class="container">
    <navigation @showAddJokeForm="isAddJokeFormVisible = true" />
    <div class="row logo-wrap">
      <div class="lottery"></div>
      <img alt="Joke logo" src="@/assets/smile.png" />
    </div>
    <div class="row block-title justify-content-center">
      <h3>Find or create funniest Joke</h3>
    </div>
    <div class="row">
      <group />
    </div>
    <div class="row">
      <language />
    </div>
    <jokes @showAddJokeForm="isAddJokeFormVisible = true" />
    <jokeForm v-if="isAddJokeFormVisible" :visible="isAddJokeFormVisible" @close="isAddJokeFormVisible = false" />
    <alert />
  </div>
</template>

<script>
import jokes from './components/joke';
import group from './components/joke/filter/group';
import language from './components/joke/filter/language';
import navigation from './components/navigation';

export default {
  name: 'App',

  components: {
    jokes,
    group,
    language,
    navigation,
    jokeForm: () => import('./components/joke/form'),
    alert: () => import('./components/alert'),
  },

  data() {
    return {
      isAddJokeFormVisible: false,
    };
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
.logo-wrap > img {
  height: 300px;
  width: auto;
}
</style>
