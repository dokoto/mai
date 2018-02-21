import _ from 'lodash/object';
import services from '../../../common/services';
import * as consts from '../../../common/constants';
import {
  RECEIVE_SESSION,
  RECEIVE_SESSION_THERAPISTS,
  RECEIVE_SESSION_THERAPIES,
  RECEIVE_ALL_THERAPIES,
  RECEIVE_SESSION_TIME_SCHEDULE,
  SET_THERAPY_TYPE,
} from './types';

/*
 * TERAPIA: therapy
 * TERAPIAS: therapies
 * -----------------------
 * TERAPEUTA: therapi
 * TERAPEUTAS: therapists
 */

const state = {
  session: {},
  therapists: [],
  therapies: [],
  mapZoom: consts.MAP_ZOOM,
  sessionTimeSchedule: [],
  selected: {
    type: consts.EMPTY_STRING,
    date: consts.EMPTY_STRING,
    time: consts.EMPTY_STRING,
  },
};

const getters = {
  session: currState => currState.session,
  therapists: currState => currState.therapists,
  therapistAddress: currState => _.get(currState, 'therapists[0].address'),
  firstTherapy: currState =>
    _.get(currState, `therapies[0].texts[${ window.glob.language.toUpperCase() }]`),
  mapZoom: currState => currState.mapZoom,
  // NEW
  allTherapiesName: currState =>
    currState.therapies.map(item =>
      _.get(item, `texts[${ window.glob.language.toUpperCase() }].name`)),
  // sessionTimeSchedule: currState => currState.sessionTimeSchedule,
};

const actions = {
  async getSession({ commit }, sessionId) {
    const session = await services.getSession(sessionId);
    const therapies = await services.getTherapies([_.get(session, '[0].therapy.id')]);
    const therapists = await services.getUser(
      _.get(session, '[0].therapist.type'),
      _.get(session, '[0].therapist.id')
    );
    commit(RECEIVE_SESSION, { session });
    commit(RECEIVE_SESSION_THERAPIES, { therapies });
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },
  async TherapyDatas({ commit }) {
    const therapies = await services.getTherapies();
    const therapists = await services.getUsersByType(consts.USERS.THERAPIST);
    commit(RECEIVE_SESSION_THERAPIES, { therapies });
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },
  // NEW
  async fetchAllTherapies({ commit }) {
    const therapies = await services.getTherapies();
    commit(RECEIVE_ALL_THERAPIES, { therapies });
  },
  async fetchSessionTimeSchedule({ commit }) {
    const sessionTimeSchedule = await services.getSessionTimeSchedule();
    commit(RECEIVE_SESSION_TIME_SCHEDULE, { sessionTimeSchedule });
  },
  setTherapyType({ commit }, therapi) {
    commit(SET_THERAPY_TYPE, { therapi });
  },
};

const mutations = {
  [RECEIVE_SESSION](currState, { session }) {
    [currState.session] = session;
  },
  [RECEIVE_SESSION_THERAPISTS](currState, { therapists }) {
    currState.therapists = therapists;
  },
  [RECEIVE_SESSION_THERAPIES](currState, { therapies }) {
    currState.therapies = therapies;
  },
  // NEW
  [RECEIVE_ALL_THERAPIES](currState, { therapies }) {
    currState.therapies = therapies;
  },
  [RECEIVE_SESSION_TIME_SCHEDULE](currState, { sessionTimeSchedule }) {
    currState.sessionTimeSchedule = sessionTimeSchedule;
  },
  [SET_THERAPY_TYPE](currState, { therapi }) {
    currState.selected.type = therapi;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
