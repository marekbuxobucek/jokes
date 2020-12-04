<template>
  <div class="jokes">
    <component v-for="(joke, index) in jokes" :joke="joke" :key="index" :is="joke.type" />
  </div>
</template>
<script>
import twopart from './twopart';
import single from './single';
export default {
  name: 'Jokes',
  components: {
    twopart,
    single,
  },
  computed: {
    actLang() {
      return this.$store.getters.getActLang;
    },
    actGroup() {
      return this.$store.getters.getActGroup;
    },
    jokes() {
      return this.$store.getters.getJokes(this.actLang, this.actGroup.key);
    },
  },
};
</script>
