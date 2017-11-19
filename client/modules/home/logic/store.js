import _ from 'lodash/object';
import services from '../../../app/services';
import { RECEIVE_NEXT_SESSIONS, RECEIVE_THERAPYES } from './types';

const state = {
  nextSessions: [],
  therapys: [],
};

const getters = {
  nextSessions: currState => currState.nextSessions,
  getTherapys: currState => currState.therapys,
};

const actions = {
  async getNextSessions({ commit }, userId) {
    const sessions = await services.getNextSessions(userId);
    const therapysIds = sessions.map(item => _.get(item, 'therapy.id'));
    const therapys = await services.getTherapys(therapysIds);
    commit(RECEIVE_NEXT_SESSIONS, { sessions });
    commit(RECEIVE_THERAPYES, { therapys });
  },
};

const mutations = {
  [RECEIVE_NEXT_SESSIONS](currState, { sessions }) {
    currState.nextSessions = sessions;
  },
  [RECEIVE_THERAPYES](currState, { therapys }) {
    currState.therapys = therapys;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
