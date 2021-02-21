<template>
  <Portal>
    <div :class="['alert', `alert--${type}`, 'container', { visible }]">
      <div class="alert-close" @click="hideTiming">
        <svg height="14px" viewBox="0 0 329.26933 329" fill="#ffffff" width="14px" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
          />
        </svg>
      </div>
      <h3>Alert</h3>
      <div class="row">
        <div class="col-12">{{ message }}</div>
      </div>
    </div>
  </Portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal';
import alert from '../../mixins/alert';

export default {
  name: 'alert',

  components: { Portal },

  mixins: [alert],

  data() {
    return {
      timeout: null,
      visible: false,
    };
  },

  computed: {
    interrupted() {
      return this.$store.getters.getAlertInterruption;
    },
  },

  watch: {
    interrupted() {
      this.showAlert();
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
  border-radius: 5px;
  margin: -1rem;
  z-index: 9;
}
.alert.alert--info {
  color: #055160;
  background-color: #cff4fc;
  box-shadow: inset 0 1px 3px 0 rgba(5, 81, 96, 50);
}
.alert.alert--info .alert-close svg {
  fill: #055160;
}
.alert.alert--success {
  color: #0f5132;
  background-color: #d1e7dd;
  box-shadow: inset 0 1px 3px 0 rgba(15, 81, 50, 50);
}
.alert.alert--success .alert-close svg {
  fill: #0f5132;
}
.alert.alert--danger {
  color: #842029;
  background-color: #f8d7da;
  box-shadow: inset 0 1px 3px 0 rgba(132, 32, 41, 50);
}
.alert.alert--danger .alert-close svg {
  fill: #842029;
}
.alert:not(.visible) {
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
