import Vue from 'vue';
import Vuex from 'vuex';
import home from '../modules/home/logic/store';

Vue.use(Vuex);

const state = {
  userId: '201711011000',
};


const store = new Vuex.Store({
  state,
  modules: {
    home,
  },
  strict: TARGET !== 'prod',
});

export default store;
