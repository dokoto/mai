import services from './services';
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
  getSession({ commit }, sessionId) {
    services.getSession(sessionId)
      .then((session) => {
        commit(RECEIVE_SESSION, { session });
        const [reponseSession] = session;
        return services.getUser(reponseSession.therapist.type, reponseSession.therapist.id);
      })
      .then(therapist => commit(RECEIVE_SESSION_THERAPIST, { therapist }));
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
  state,
  getters,
  mutations,
  actions,
};
