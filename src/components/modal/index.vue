<template>
  <Portal>
    <div class="modal" v-if="visible">
      <div class="modal-close" @click="closeModal">
        <svg height="14px" viewBox="0 0 329.26933 329" fill="#cccccc" width="14px" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
          />
        </svg>
      </div>
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
