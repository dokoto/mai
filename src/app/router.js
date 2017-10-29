import Vue from 'vue';
import Router from 'vue-router';
import Home from '../modules/home/view.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { name: 'home', path: '/home/:userId', components: { container: Home } },
  ],
});
