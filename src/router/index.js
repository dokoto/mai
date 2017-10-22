import Vue from 'vue';
import Router from 'vue-router';
import Home from '../modules/home';
import Calendar from '../modules/calendar';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { name: 'home', path: '/', components: { container: Home } },
    { name: 'calendar', path: '/calendar', components: { container: Calendar } }
  ]
})
