<template>
  <div class="jokes">
    <component v-for="(joke, index) in jokes" :joke="joke" :key="index" :is="joke.type + 'Joke'" />
  </div>
</template>
<script>
import twopartJoke from './twopart';
import singleJoke from './single';
export default {
  name: 'Jokes',
  props: {
    groupKey: {
      type: String,
      default: '',
    },
  },
  components: {
    twopartJoke,
    singleJoke,
  },
  computed: {
    actLang() {
      return this.$store.getters.getActLang;
    },
    jokes() {
      return this.$store.getters.getJokes(this.actLang, this.groupKey);
    },
  },
};
</script>
