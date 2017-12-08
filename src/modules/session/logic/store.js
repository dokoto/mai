import _ from 'lodash/object';
import services from '../../../common/services';
import { RECEIVE_SESSION, RECEIVE_SESSION_THERAPIST } from './types';

const state = {
  session: {},
  therapists: [],
  currentDate: new Date(),
  mapZoom: 15,
};

const getters = {
  session: currState => currState.session,
  therapists: currState => currState.therapists,
  therapistAdress: currState => currState.therapists[0].address,
  mapZoom: currState => currState.mapZoom,
};

const actions = {
  async getSession({ commit }, sessionId) {
    const session = await services.getSession(sessionId);
    const therapist = await services.getUser(
      _.get(session, '[0].therapist.type'),
      _.get(session, '[0].therapist.id')
    );
    commit(RECEIVE_SESSION, { session });
    commit(RECEIVE_SESSION_THERAPIST, { therapist });
  },
};

const mutations = {
  [RECEIVE_SESSION](currState, { session }) {
    [currState.session] = session;
  },
  [RECEIVE_SESSION_THERAPIST](currState, { therapist }) {
    currState.therapists = therapist;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
