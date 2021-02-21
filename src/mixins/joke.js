export const GROUP_API = 'API';
export const GROUP_MY = 'MY';
export const GROUP_ALL = '';

export const TYPE_SINGLE = 'single';
export const TYPE_TWOPART = 'twopart';

export default {
  props: {
    joke: {
      type: Object,
      required: true,
    },
  },
  computed: {
    type() {
      return this.joke.type;
    },
    group() {
      return this.joke.group;
    },
    partFirst() {
      return this.type === TYPE_SINGLE ? this.joke.joke : this.joke.setup;
    },
    partSecond() {
      return this.joke.delivery ?? '';
    },
    language() {
      return this.joke.lang;
    },
    category() {
      return this.joke.category;
    },
  },
};
