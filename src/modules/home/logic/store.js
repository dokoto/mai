import services from './services';
import { RECEIVE_NEXT_SESSIONS } from './types';

const state = {
  nextSessions: [],
  currentDate: new Date(),
};

const getters = {
  nextSessions: (currState) => {
    return currState.nextSessions;
  },
};

const actions = {
  getNextSessions({ commit }, userId) {
    services.getNextSessions(userId).then((sessions) => {
      commit(RECEIVE_NEXT_SESSIONS, { sessions });
    });
  },
};

const mutations = {
  [RECEIVE_NEXT_SESSIONS](currState, { sessions }) {
    currState.nextSessions = sessions;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
