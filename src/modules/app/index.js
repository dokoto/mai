import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueI18n from 'vue-i18n';
import * as location from '../../common/location';
import App from './App.vue';
import router from './router';
import store from './store';

sync(store, router);
Vue.use(VueI18n);

console.log(process.env);

const i18n = new VueI18n(location);

const app = new Vue({
  i18n,
  router,
  store,
  ...App,
});

export { app, router, store };
