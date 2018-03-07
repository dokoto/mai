import _ from 'lodash/object';
import * as services from '../../../common/services';
import * as consts from '../../../common/constants';
import { formatDateNumeric } from '../../../common/utils';
import {
  RECEIVE_SESSION,
  RECEIVE_SESSION_THERAPISTS,
  RECEIVE_SESSION_THERAPIES,
  RECEIVE_ALL_THERAPIES,
  RECEIVE_SESSION_TIME_SCHEDULE,
  SET_THERAPY_TYPE,
  RECEIVE_DISABLE_DAYS,
  SET_INIT_DATE,
  RECEIVE_DISABLE_TIMES,
  SET_TIME,
  SET_DATE,
  RECEIVE_DISABLE_THERAPISTS,
  SET_THERAPI,
  SET_ADDRESS,
} from './types';

/*
 * TERAPIA: therapy
 * TERAPIAS: therapies
 * -----------------------
 * TERAPEUTA: therapi
 * TERAPEUTAS: therapists
 */

const state = {
  session: consts.EMPTY_OBJECT,
  therapists: consts.EMPTY_ARRAY,
  therapies: consts.EMPTY_ARRAY,
  initDate: consts.EMPTY_STRING,
  mapZoom: consts.MAP_ZOOM,
  sessionTimeSchedule: consts.EMPTY_ARRAY,
  disablesDates: consts.EMPTY_ARRAY,
  disablesTimes: consts.EMPTY_ARRAY,
  disablesTherapists: consts.EMPTY_ARRAY,
  selected: {
    therapi: consts.EMPTY_STRING,
    type: consts.EMPTY_STRING,
    date: consts.EMPTY_STRING,
    time: consts.EMPTY_STRING,
    address: consts.EMPTY_STRING,
  },
};

// DELTE?
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
};

const actions = {
  // DELETE?
  async getSession({ commit }, sessionId) {
    const session = await services.getSession(sessionId);
    const therapies = await services.getTherapies([_.get(session, '[0].therapy')]);
    const therapists = await services.getUser(
      consts.USERS.THERAPIST,
      _.get(session, '[0].therapist')
    );
    commit(RECEIVE_SESSION, { session });
    commit(RECEIVE_SESSION_THERAPIES, { therapies });
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },
  // DELETE?
  async TherapyDatas({ commit }) {
    const therapies = await services.getTherapies();
    const therapists = await services.getUsersByType(consts.USERS.THERAPIST);
    commit(RECEIVE_SESSION_THERAPIES, { therapies });
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },
  // NEW
  async fetchAllTherapists({ commit }) {
    const therapists = await services.getUsersByType(consts.USERS.THERAPIST);
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },
  async fetchAllTherapies({ commit }) {
    const therapi = state.therapists.filter(item => item.id === state.selected.therapi);
    const therapies = await services.getTherapies(_.get(therapi, '[0].therapys'));
    commit(RECEIVE_ALL_THERAPIES, { therapies });
  },
  async fetchSessionTimeSchedule({ commit }) {
    const sessionTimeSchedule = await services.getSessionTimeSchedule();
    commit(RECEIVE_SESSION_TIME_SCHEDULE, { sessionTimeSchedule });
  },
  async fetchBusyDays({ commit }, therapi) {
    const disablesDates = await services.getBusyDays(
      therapi,
      state.initDate,
      consts.MONTHS_INTERVAL
    );
    commit(RECEIVE_DISABLE_DAYS, { disablesDates });
  },
  async fetchBusyTimes({ commit }, dateSelected) {
    const disablesTimes = await services.getBusyTimes(state.selected.therapi, dateSelected);
    commit(RECEIVE_DISABLE_TIMES, { disablesTimes });
  },
  async fetchBusyTherapists({ commit }) {
    const disablesTherapists = await services.getBusyTherapists();
    commit(RECEIVE_DISABLE_THERAPISTS, { disablesTherapists });
  },
  setTherapi({ commit }, therapi) {
    commit(SET_THERAPI, { therapi });
    commit(SET_THERAPY_TYPE, { therapy: consts.EMPTY_STRING });
    commit(SET_DATE, { date: consts.EMPTY_STRING });
    commit(SET_TIME, { time: consts.EMPTY_STRING });
  },
  setTherapyType({ commit }, therapy) {
    commit(SET_THERAPY_TYPE, { therapy });
  },
  setDate({ commit }, date) {
    commit(SET_DATE, { date });
  },
  setTime({ commit }, time) {
    commit(SET_TIME, { time });
  },
  setAddress({ commit }, newTherapi) {
    const therapi = state.therapists.filter(item => item.id === newTherapi);
    commit(SET_ADDRESS, { address: _.get(therapi, '[0].address') });
  },
  initDate({ commit }, initDate = formatDateNumeric()) {
    commit(SET_INIT_DATE, { initDate });
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
  [SET_THERAPY_TYPE](currState, { therapy }) {
    currState.selected.type = therapy;
  },
  [RECEIVE_DISABLE_DAYS](currState, { disablesDates }) {
    currState.disablesDates = disablesDates;
  },
  [SET_INIT_DATE](currState, { initDate }) {
    currState.initDate = initDate;
  },
  [SET_DATE](currState, { date }) {
    currState.selected.date = date;
  },
  [SET_TIME](currState, { time }) {
    currState.selected.time = time;
  },
  [RECEIVE_DISABLE_TIMES](currState, { disablesTimes }) {
    currState.disablesTimes = disablesTimes;
  },
  [RECEIVE_DISABLE_THERAPISTS](currState, { disablesTherapists }) {
    currState.disablesTherapists = disablesTherapists;
  },
  [SET_THERAPI](currState, { therapi }) {
    currState.selected.therapi = therapi;
  },
  [SET_ADDRESS](currState, { address }) {
    currState.selected.address = address;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
