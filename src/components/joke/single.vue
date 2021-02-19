<template>
  <div class="joke joke-single row" :class="[joke.type, joke.group]">
    <jokePart class="part-first" :plainText="joke.joke" :joke="joke" />
  </div>
</template>

<script>
import jokePart from './part';
export default {
  name: 'jokeSingle',

  components: { jokePart },

  props: {
    joke: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
