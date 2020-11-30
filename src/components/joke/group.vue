<template>
  <ul class="list-selector selector-group">
    <li
      v-for="group in groups"
      :key="group.id"
      @click="setGroup(group)"
      :class="{ active: selectedGroupId === group.id }"
    >
      {{ group.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'group',
  data() {
    return {
      selectedGroupId: 3,
      groups: [
        { id: 1, key: 'my', title: 'My' },
        { id: 2, key: 'api', title: 'Others' },
        { id: 3, key: '', title: 'All' },
      ],
    };
  },
  methods: {
    setGroup(group) {
      this.selectedGroupId = group.id;
      this.$emit('selected', group);
    },
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
