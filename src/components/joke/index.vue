<template>
  <div
    class="jokes"
    v-infinite-scroll="getJokeRandomByScroll"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="20"
  >
    <component v-for="(joke, index) in jokes" :joke="joke" :key="index" :is="joke.type" />
    <div class="row justify-content-center mt-bg">
      <loading class="jokes-loading" v-if="isLoadingJokes" />
      <button v-else-if="!isMyGroupActive && !isLimit" class="btn btn-outline-primary" @click="getJokeRandom">
        Get more fun!
      </button>
      <button v-else class="btn btn-outline-primary" @click="showAddJokeForm">
        Create joke
      </button>
    </div>
    <div v-if="isLimit" class="row jokes-limit justify-content-center mt-sm">
      Limit of external jokes has been reached.
    </div>
  </div>
</template>
<script>
import { GROUP_MY, GROUP_API } from '../../mixins/joke';
import loading from '../../components/Loading';
import infiniteScroll from 'vue-infinite-scroll';
import twopart from './twopart';
import single from './single';
import { mapGetters } from 'vuex';

export default {
  name: 'Jokes',

  components: {
    twopart,
    single,
    loading,
  },

  directives: { infiniteScroll },

  computed: {
    ...mapGetters({
      actLang: 'getActLang',
      actGroup: 'getActGroup',
      isLoadingJokes: 'getIsLoadingJokes',
    }),
    jokes() {
      return this.$store.getters.getJokes(this.actLang, this.actGroup.id);
    },
    isMyGroupActive() {
      return this.actGroup.id === GROUP_MY;
    },
    isLimit() {
      return (
        this.$store.getters.getOptions.idRange[this.actLang]?.to ===
        this.$store.getters.getJokes(this.actLang, GROUP_API).length
      );
    },
  },
  methods: {
    getJokeRandomByScroll() {
      if (this.isLimit) return;
      this.getJokeRandom();
    },
    getJokeRandom() {
      this.$store.dispatch('getJokeRandom', this.actLang);
    },
    showAddJokeForm() {
      this.$emit('showAddJokeForm');
    },
  },
};
</script>
<style scoped>
.jokes {
  margin-bottom: 1rem;
}
.jokes-limit {
  color: #007bff;
}
</style>
