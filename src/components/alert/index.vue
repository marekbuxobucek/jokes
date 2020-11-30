<template>
  <Portal>
    <div class="alert container" :class="{ visible: visible }">
      <div class="alert-close" @click="hideTiming"><strong>x</strong></div>
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
  border-color: #f5c6cb;
  border-radius: 5%;
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
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
}
</style>
