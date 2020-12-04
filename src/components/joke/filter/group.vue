<template>
  <ul class="list-selector selector-group">
    <li v-for="group in groups" :key="group.id" @click="setGroup(group)" :class="{ active: actGroup.id === group.id }">
      {{ group.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'group',
  data() {
    return {
      groups: [
        { id: 2, key: 'my', title: 'My' },
        { id: 1, key: 'api', title: 'Others' },
        { id: 0, key: '', title: 'All' },
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
      this.selectedGroupId = group.id;
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
