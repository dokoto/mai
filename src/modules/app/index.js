import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueI18n from 'vue-i18n';
import Vue2TouchEvents from 'vue2-touch-events';
import * as location from '../../common/location';
import App from './App';
import router from './router';
import store from './logic/store';

sync(store, router);
Vue.use(VueI18n);
Vue.use(Vue2TouchEvents);

const i18n = new VueI18n(location);

const app = new Vue({
  i18n,
  router,
  store,
  ...App,
});

export { app, router, store };
