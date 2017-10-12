import Vue from 'vue';
import Router from 'vue-router';
import Login from '../modules/login';
import Schedule from '../modules/schedule';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'login',
      path: '/',
      components: {
        container: Login
      }
    },
    {
      name: 'schedule',
      path: '/schedule',
      components: { 
        container: Schedule
      }
    }
  ]
})
