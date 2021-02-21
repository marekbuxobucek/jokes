import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import { JOKE_API } from './config';

axios.defaults.baseURL = JOKE_API;

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
