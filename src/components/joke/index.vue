<template>
  <div class="joke row" :class="joke.type">
    <template v-if="joke.type === 'single'">
      <jokePart class="part-first" :plainText="joke.joke" :joke="joke" />
    </template>
    <template v-else>
      <jokePart class="part-first" :plainText="joke.setup" :joke="joke" />
      <jokePart class="part-second" :plainText="joke.delivery" :joke="joke" />
    </template>
  </div>
</template>

<script>
import jokePart from "./part";
export default {
  name: "joke",
  components: { jokePart },
  props: {
    joke: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style scoped>
@media (max-width: 768px) {
  .joke {
    padding-bottom: 1rem;
  }
}
</style>
