import services from './services';
import { RECEIVE_LAST_SESSIONS } from './types';

const state = {
  lastSessions: [],
  currentDate: new Date(),
};

const getters = {
  lastSessions: (currState) => {
    return currState.lastSessions;
  },
};

const actions = {
  getLastSessions({ commit }, userId) {
    services.getLastSessions(userId).then((sessions) => {
      commit(RECEIVE_LAST_SESSIONS, { sessions });
    });
  },
};

const mutations = {
  [RECEIVE_LAST_SESSIONS](currState, { sessions }) {
    currState.lastSessions = sessions;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
