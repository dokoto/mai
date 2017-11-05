import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';

sync(store, router);

console.log('ENVIRONMENT VARS %s %s %s %s %s \n%s \n%s', TARGET, PLATFORM, VERSION, REST_API, LANGUAGE, GOOGLE_MAPS_KEY, GOOGLE_GEOCODING_KEY);

const app = new Vue({
  router,
  store,
  ...App,
});

export { app, router, store };
