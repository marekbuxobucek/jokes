<template>
  <Portal>
    <div class="alert container" :class="{ visible: visible }">
      <div class="alert-close" @click="hideTiming">
        <svg height="14px" viewBox="0 0 329.26933 329" fill="#721c24" width="14px" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
          />
        </svg>
      </div>
      <h3>Alert</h3>
      <div class="row">
        <div class="col-12">{{ alert }}</div>
      </div>
    </div>
  </Portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal';

export default {
  name: 'alert',

  components: { Portal },

  data() {
    return {
      timeout: null,
      visible: false,
    };
  },

  computed: {
    alert() {
      return this.$store.getters.getAlert;
    },
    interrupted() {
      return this.$store.getters.getAlertInterruption;
    },
  },

  watch: {
    interrupted() {
      if (this.alert !== '') {
        this.showAlert();
      }
    },
  },

  methods: {
    showAlert() {
      if (this.visible === true) {
        clearTimeout(this.timeout);
        this.hideTiming();
        this.timeout = setTimeout(this.showTiming, 500);
      } else {
        this.showTiming();
      }
    },
    showTiming() {
      this.visible = true;
      this.timeout = setTimeout(this.hideTiming, 5000);
    },
    hideTiming() {
      this.visible = false;
      this.timeout = null;
    },
  },
};
</script>

<style scoped>
.alert {
  width: 320px;
  height: 180px;
  position: fixed;
  top: 100%;
  left: 100%;
  transform: translate(-100%, -100%);
  color: #721c24;
  background-color: #f8d7da;
  box-shadow: inset 0 1px 3px 0 rgba(114, 28, 36, 50);
  border-radius: 5px;
  margin: -1rem;
  opacity: 0;
  transition: opacity 1s;
  display: none;
}
.alert.visible {
  opacity: 1;
  transition: opacity 1s;
  display: block;
}
.alert-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
</style>
