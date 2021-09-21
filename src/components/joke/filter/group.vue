<template>
  <ul class="list-selector selector-group">
    <li
      v-for="group in getGroups()"
      :key="group.id"
      @click="setGroup(group)"
      :class="{ active: actGroup.id === group.id }"
    >
      {{ group.title }}
    </li>
  </ul>
</template>

<script>
import { GROUP_MY, GROUP_API, GROUP_ALL } from '../../../mixins/joke';

export default {
  name: 'group',

  computed: {
    actGroup() {
      return this.$store.getters.getActGroup;
    },
  },
  methods: {
    getGroups() {
      return [
        { id: GROUP_MY, title: 'My' },
        { id: GROUP_API, title: 'External' },
        { id: GROUP_ALL, title: 'All' },
      ];
    },
    setGroup(group) {
      this.$store.commit('setActGroup', group);
    },
  },
  created() {
    this.setGroup(this.getGroups().find((group) => group.id === this.actGroup.id));
  },
};
</script>

<style scoped>
.selector-group > li.active {
  background-color: #0084ff;
  border: 2px solid #cccccc;
  color: white;
}
</style>
