import services from './services';
import { RECEIVE_SESSION } from './types';

const state = {
  session: {},
  currentDate: new Date(),
};

const getters = {
  session: currState => currState.session,
};

const actions = {
  getSession({ commit }, sessionId) {
    services.getSession(sessionId).then((session) => {
      commit(RECEIVE_SESSION, { session });
    });
  },
};

const mutations = {
  [RECEIVE_SESSION](currState, { session }) {
    [currState.session] = session;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
