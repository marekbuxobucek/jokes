<template>
  <div class="joke joke-twopart row" :class="[joke.type, joke.group]">
    <jokePart class="part-first" :plainText="joke.setup" :joke="joke" />
    <jokePart class="part-second" :plainText="joke.delivery" :joke="joke" />
  </div>
</template>

<script>
import jokePart from './part';
export default {
  name: 'jokeTwopart',

  components: { jokePart },

  props: {
    joke: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
