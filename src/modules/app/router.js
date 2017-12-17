import Vue from 'vue';
import Router from 'vue-router';
import Home from '../home/view.vue';
import Session from '../session/view.vue';
import NewSession from '../session/create.vue';
import Calendar from '../calendar/view.vue';

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
      name: 'newsession',
      path: '/session/new/:sessionId/:daySelected',
      components: { container: NewSession },
    },
    {
      name: 'calendar',
      path: '/calendar/:userId/:year/:month/:day',
      components: { container: Calendar },
    },
  ],
});
