<template>
  <ul class="list-selector selector-lang">
    <li
      v-for="(lang, iso) in options.jokes.idRange"
      :key="iso"
      @click="setLanguage(iso)"
      :class="{ active: actLang === iso }"
    >
      {{ iso }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'language',
  computed: {
    options() {
      return this.$store.getters.getOptions;
    },
    actLang() {
      return this.$store.getters.getActLang;
    },
  },
  methods: {
    setLanguage(iso) {
      this.$store.commit('setActLang', iso);
    },
  },
  created() {
    this.$store.dispatch('getOptions');
  },
};
</script>
