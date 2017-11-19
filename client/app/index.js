import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueI18n from 'vue-i18n';

import App from './App.vue';
import router from './router';
import store from './store';
import messages from './location';

sync(store, router);
Vue.use(VueI18n);

console.log(
  'ENVIRONMENT VARS %s %s %s %s %s \n%s \n%s',
  TARGET,
  PLATFORM,
  VERSION,
  REST_API,
  LANGUAGE,
  GOOGLE_MAPS_KEY,
  GOOGLE_GEOCODING_KEY,
);

const i18n = new VueI18n({
  locale: LANGUAGE.toLowerCase(),
  fallbackLocale: 'en',
  messages,
});

const app = new Vue({
  i18n,
  router,
  store,
  ...App,
});

export { app, router, store };
