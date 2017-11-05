import Vue from 'vue';
import Router from 'vue-router';
import Home from '../modules/home/view.vue';
import Session from '../modules/session/view.vue';
import Calendar from '../modules/calendar/view.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/home/:userId',
      components: { container: Home },
    },
    {
      name: 'session',
      path: '/session/:sessionId',
      components: { container: Session },
    },
    {
      name: 'calendar',
      path: '/calendar/:userId/:year/:month/:day',
      components: { container: Calendar },
    },
  ],
});
