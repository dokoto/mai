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
    status: '',
    message: '',
  },
};

const RECEIVE_USER = 'RECEIVE_USER';

const actions = {
  tmpLogin({ commit }) {
    return new Promise(async (resolve) => {
      const session = await services.login('manuel@coolmail.com', '123456');
      commit(RECEIVE_USER, session.data);
      resolve();
    });
  },
  resetNotify({ commit }) {
    commit(RESET_NOTIFY);
  },
};

const mutations = {
  [RECEIVE_USER](currState, session) {
    currState.session = session;
  },
  [RESET_NOTIFY](currState) {
    currState.notify.status = EMPTY_STRING;
  },
  [NOTIFY](currState, notity) {
    currState.notify = notity;
  },
};

const app = {
  namespaced: true,
  state,
  mutations,
  actions,
};

const store = new Vuex.Store({
  modules: {
    app,
    home,
    appointment,
    calendar,
  },
  strict: process.env.ENV !== 'prod',
});

export default store;
