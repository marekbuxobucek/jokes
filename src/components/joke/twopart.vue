<template>
  <div class="joke joke-twopart row" :class="[type, group]">
    <jokePart class="part-first" :text="partFirst" :language="language" :category="category" />
    <jokePart class="part-second" :text="partSecond" :language="language" :category="category" />
  </div>
</template>

<script>
import joke from '../../mixins/joke';
import jokePart from './part';
export default {
  name: 'jokeTwopart',

  components: { jokePart },

  mixins: [joke],
};
</script>
