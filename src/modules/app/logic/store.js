import Vue from 'vue';
import Vuex from 'vuex';
import { EMPTY_STRING } from '@/common/constants';
import home from '../../home/logic/store';
import appointment from '../../appointment/logic/store';
import calendar from '../../calendar/logic/store';
import * as services from '../../../common/api';
import { RESET_NOTIFY, NOTIFY } from './types';

Vue.use(Vuex);

const state = {
  session: {},
  notify: {
    show: false,
    message: ''
  }
};

const getters = {
  session: currState => currState.session
};

const RECEIVE_USER = 'RECEIVE_USER';

const actions = {
  tmpLogin({ commit }) {
    return new Promise(async resolve => {
      const session = await services.login('manuel@coolmail.com', '123456');
      commit(RECEIVE_USER, session.data);
      resolve();
    });
  },
  show({ commit }, message) {
    commit(NOTIFY, message);
    setTimeout(() => commit(RESET_NOTIFY), 3000);
  },
  resetNotify({ commit }, notify) {
    commit(RESET_NOTIFY, notify);
  }
};

const mutations = {
  [RECEIVE_USER](currState, session) {
    currState.session = session;
  },
  [RESET_NOTIFY](currState) {
    currState.notify.show = false;
  },
  [NOTIFY](currState, message) {
    currState.notify.show = true;
    currState.notify.message = message;
  }
};

const app = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

const store = new Vuex.Store({
  modules: {
    app,
    home,
    appointment,
    calendar
  },
  strict: process.env.ENV !== 'prod'
});

export default store;
