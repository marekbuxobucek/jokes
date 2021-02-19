<template>
  <ul class="list-selector selector-group">
    <li v-for="group in groups" :key="group.id" @click="setGroup(group)" :class="{ active: actGroup.id === group.id }">
      {{ group.title }}
    </li>
  </ul>
</template>

<script>
import { GROUP_MY, GROUP_API, GROUP_ALL } from '../../../mixins/joke';

export default {
  name: 'group',
  data() {
    return {
      groups: [
        { id: GROUP_MY, title: 'My' },
        { id: GROUP_API, title: 'Others' },
        { id: GROUP_ALL, title: 'All' },
      ],
    };
  },
  computed: {
    actGroup() {
      return this.$store.getters.getActGroup;
    },
  },
  methods: {
    setGroup(group) {
      this.$store.commit('setActGroup', group);
    },
  },
  created() {
    this.setGroup(this.groups.find((group) => group.id === this.actGroup.id));
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
