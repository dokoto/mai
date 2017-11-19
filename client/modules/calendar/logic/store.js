import _ from 'lodash/object';
import services from '../../../app/services';
import {
  RECEIVE_NEXT_SESSIONS_TODAY,
  RECEIVE_SESSION_SCHEDULE,
  SET_USER_ID,
  RECEIVE_THERAPYES,
} from './types';
import { generateAppointmentTable } from '../../../app/utils';

const state = {
  userId: '',
  toDaySession: '',
  selectedDay: '',
  sessionsSchedule: [],
  scheduleTable: [],
  therapys: [],
};

const getters = {
  selectedDay: currState => currState.selectedDay,
  toDaySession: currState => currState.toDaySession,
  sessionsSchedule: currState => currState.sessionsSchedule,
  getTherapys: currState => currState.therapys,
  scheduleTable: currState =>
    generateAppointmentTable(
      currState.sessionsSchedule,
      currState.toDaySession,
      currState.selectedDay,
      currState.therapys,
      currState.userId,
    ),
};

const actions = {
  async getToDaySessions({ commit }, selectedDay) {
    const daySessions = await services.getToDaySessions(selectedDay);
    const sessionsSchedule = await services.getSessionSchedule();
    const therapysIds = daySessions.map(item => _.get(item, 'therapy.id'));
    const therapys = await services.getTherapys(therapysIds);

    commit(RECEIVE_NEXT_SESSIONS_TODAY, { daySessions, selectedDay });
    commit(RECEIVE_SESSION_SCHEDULE, { sessionsSchedule });
    commit(RECEIVE_THERAPYES, { therapys });
  },
  setUserId({ commit }, userId) {
    commit(SET_USER_ID, { userId });
  },
};

const mutations = {
  [RECEIVE_NEXT_SESSIONS_TODAY](currState, { daySessions, selectedDay }) {
    currState.toDaySession = daySessions;
    currState.selectedDay = selectedDay;
  },
  [RECEIVE_SESSION_SCHEDULE](currState, { sessionsSchedule }) {
    currState.sessionsSchedule = sessionsSchedule;
  },
  [SET_USER_ID](currState, { userId }) {
    currState.userId = userId;
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
