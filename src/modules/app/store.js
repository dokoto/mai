import Vue from 'vue';
import Vuex from 'vuex';
import home from '../home/logic/store';
import session from '../session/logic/store';
import calendar from '../calendar/logic/store';

Vue.use(Vuex);

const state = {
  userId: '201711011000',
};

const store = new Vuex.Store({
  state,
  modules: {
    home,
    session,
    calendar,
  },
  strict: process.env.ENV !== 'prod',
});

export default store;
