import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(/* webpackChunkName: "Home" */ '../home/view.vue');
const AppointmentView = () =>
  import(/* webpackChunkName: "AppointmentView" */ '../appointment/view.vue');
const AppointmentEdit = () =>
  import(/* webpackChunkName: "AppointmentEdit" */ '../appointment/edit.vue');
const Calendar = () =>
  import(/* webpackChunkName: "Calendar" */ '../calendar/view.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/home',
      components: { container: Home }
    },
    {
      name: 'appointmentView',
      path: '/appointment/view/:id',
      components: { container: AppointmentView }
    },
    {
      name: 'appointmentEdit',
      path: '/appointment/edit/:id?',
      components: { container: AppointmentEdit }
    },
    {
      name: 'calendar',
      path: '/calendar',
      components: { container: Calendar }
    }
  ]
});
