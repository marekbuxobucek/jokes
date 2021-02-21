<template>
  <div class="joke joke-single row" :class="[type, group]">
    <jokePart class="part-first" :language="language" :text="partFirst" :category="category" />
  </div>
</template>

<script>
import joke from '../../mixins/joke';
import jokePart from './part';
export default {
  name: 'jokeSingle',

  components: { jokePart },

  mixins: [joke],
};
</script>
