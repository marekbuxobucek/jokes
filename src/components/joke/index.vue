<template>
  <div class="joke row" :class="joke.type">
    <template v-if="joke.type === 'single'">
      <jokePart class="first-part" :plainText="joke.joke" :joke="joke" />
    </template>
    <template v-else>
      <jokePart class="first-part" :plainText="joke.setup" :joke="joke" />
      <jokePart class="second-part" :plainText="joke.delivery" :joke="joke" />
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

<style scoped></style>
