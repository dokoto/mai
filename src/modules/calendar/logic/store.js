import moment from 'moment';
import * as services from '../../../common/api';
import * as consts from '../../../common/constants';

import {
  RECEIVE_TODAY_SESSIONS,
  RECEIVE_SESSION_TIME_SCHEDULE,
  SET_USER_ID,
  RECEIVE_THERAPYES,
  SET_SELECTED_DATA,
  SET_INIT_DATE,
} from './types';
import { formatDateNumeric, generateAppointmentTable } from '../../../common/utils';

moment.locale(window.glob.language.toLowerCase());

const state = {
  userId: consts.EMPTY_STRING,
  toDaySessions: consts.EMPTY_ARRAY,
  selectedDate: formatDateNumeric(),
  timeSelected: consts.EMPTY_STRING,
  sessionTimeSchedule: consts.EMPTY_ARRAY,
  therapies: consts.EMPTY_ARRAY,
  numberOfMonths: consts.MONTHS_INTERVAL,
  initDate: consts.EMPTY_STRING,
};

const getters = {
  toDaySessions: currState => currState.toDaySessions,
  sessionTimeSchedule: currState => currState.sessionTimeSchedule,
  getTherapies: currState => currState.therapies,
};

/*
 * TERAPIA: therapy
 * TERAPIAS: therapies
 * -----------------------
 * TERAPEUTA: therapi
 * TERAPEUTAS: therapists
 */

const actions = {
  async getToDaySessions({ commit }) {
    const daySessions = await services.getToDaySessions(state.selectedDate);
    const sessionTimeSchedule = await services.getSessionTimeSchedule();
    commit(RECEIVE_SESSION_TIME_SCHEDULE, { sessionTimeSchedule });

    const therapists = await services.getUser(consts.USERS.THERAPIST);
    const therapies = await services.getTherapies();
    commit(RECEIVE_THERAPYES, { therapies });
    commit(RECEIVE_TODAY_SESSIONS, {
      sessionTimeSchedule,
      daySessions,
      selectedDate: state.selectedDate,
      therapies,
      therapists,
      userId: state.userId,
    });
  },
  setUserId({ commit }, userId) {
    commit(SET_USER_ID, { userId });
  },
  changeDay({ commit }, selectedDate) {
    commit(SET_SELECTED_DATA, selectedDate);
  },
  initDate({ commit }, initDate = formatDateNumeric()) {
    commit(SET_INIT_DATE, { initDate });
  },
};

const mutations = {
  [RECEIVE_TODAY_SESSIONS](currState, toDaySessionsDatas) {
    const {
      sessionTimeSchedule,
      daySessions,
      selectedDate,
      therapies,
      therapists,
      userId,
    } = toDaySessionsDatas;
    currState.toDaySessions = generateAppointmentTable(
      sessionTimeSchedule,
      daySessions,
      selectedDate,
      therapies,
      therapists,
      userId
    );
    currState.selectedDate = toDaySessionsDatas.selectedDate;
  },
  [RECEIVE_SESSION_TIME_SCHEDULE](currState, { sessionTimeSchedule }) {
    currState.sessionTimeSchedule = sessionTimeSchedule;
  },
  [SET_SELECTED_DATA](currState, selectedDate) {
    currState.selectedDate = selectedDate;
  },
  [SET_USER_ID](currState, { userId }) {
    currState.userId = userId;
  },
  [RECEIVE_THERAPYES](currState, { therapies }) {
    currState.therapies = therapies;
  },
  [SET_INIT_DATE](currState, { initDate }) {
    currState.initDate = initDate;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
