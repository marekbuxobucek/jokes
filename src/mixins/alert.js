export const ALERT_TYPE_SUCCESS = 'success';
export const ALERT_TYPE_DANGER = 'danger';
export const ALERT_TYPE_INFO = 'info';

export default {
  computed: {
    alert() {
      return this.$store.getters.getAlert;
    },
    message() {
      return this.alert?.msg ?? '';
    },
    type() {
      return this.alert?.type ?? ALERT_TYPE_INFO;
    },
  },
};
