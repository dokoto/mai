import Vue from 'vue';
import Router from 'vue-router';
import Home from '../home/view.vue';
import SessionView from '../session/view.vue';
import SessionEdit from '../session/edit.vue';
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
      name: 'sessionView',
      path: '/session/view/:sessionId',
      components: { container: SessionView },
    },
    {
      name: 'sessionEdit',
      path: '/session/edit/:sessionId?',
      components: { container: SessionEdit },
    },
    {
      name: 'calendar',
      path: '/calendar/:userId/:year/:month/:day',
      components: { container: Calendar },
    },
  ],
});
