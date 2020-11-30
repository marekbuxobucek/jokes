<template>
  <Portal>
    <div class="modal" v-if="visible">
      <div class="modal-close" @click="closeModal"><strong>x</strong></div>
      <div class="modal-title" v-if="hasTitle">
        <h3>{{ title }}</h3>
      </div>
      <div class="modal-body container-fluid">
        <slot></slot>
      </div>
    </div>
  </Portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal';
export default {
  name: 'modal',
  components: { Portal },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    hasTitle: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeModal() {
      this.$parent.$emit('close', !this.visible);
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  height: 90%;
  max-height: 90%;
  width: 90%;
  max-width: 600px;
  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: #ffffff;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
.modal-title {
  color: #0084ff;
  width: 100%;
  text-align: center;
}
.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
}
</style>
