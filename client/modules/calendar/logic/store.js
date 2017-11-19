import _ from 'lodash';
import services from '../../../app/services';
import {
  RECEIVE_NEXT_SESSIONS_TODAY,
  RECEIVE_SESSION_SCHEDULE,
  SET_USER_ID,
  RECEIVE_THERAPYES,
  CHANGE_SELECTED_DAY,
  SAVE_SESSION,
} from './types';
import { generateAppointmentTable, findSessionById } from '../../../app/utils';

const state = {
  userId: '',
  toDaySession: '',
  selectedDay: '',
  sessionsSchedule: [],
  scheduleTable: [],
  therapies: [],
  saveSession: {
    open: false,
  },
};

const getters = {
  selectedDay: currState => currState.selectedDay,
  toDaySession: currState => currState.toDaySession,
  sessionsSchedule: currState => currState.sessionsSchedule,
  getTherapies: currState => currState.therapies,
  scheduleTable: currState =>
    generateAppointmentTable(
      currState.sessionsSchedule,
      currState.toDaySession,
      currState.selectedDay,
      currState.therapies,
      currState.userId,
    ),
  saveSession: currState => currState.saveSession,
};

const actions = {
  async getToDaySessions({ commit }, selectedDay) {
    const daySessions = await services.getToDaySessions(selectedDay);
    const sessionsSchedule = await services.getSessionSchedule();
    const therapyIds = daySessions.map(item => _.get(item, 'therapy.id'));
    const therapies = await services.getTherapies(therapyIds);

    commit(RECEIVE_NEXT_SESSIONS_TODAY, { daySessions, selectedDay });
    commit(RECEIVE_SESSION_SCHEDULE, { sessionsSchedule });
    commit(RECEIVE_THERAPYES, { therapies });
  },
  setUserId({ commit }, userId) {
    commit(SET_USER_ID, { userId });
  },
  changeDay({ commit, dispatch }, selectedDay) {
    commit(CHANGE_SELECTED_DAY, { selectedDay });
    dispatch('getToDaySessions', selectedDay);
  },
  async saveSession({ commit }, {
    router, sessions, id, daySelected, timeSelected,
  }) {
    const sessionSelected = _.find(sessions, findSessionById(id));
    const permisions = _.get(sessionSelected, 'permisions');
    if (permisions.editable) {
      const $check = $(`#${id}-check`);
      if (!$check.is(':checked')) {
        const therapists = await services.getUser('THERAPIST');
        const therapies = await services.getTherapies();
        commit(SAVE_SESSION, {
          open: true,
          therapists,
          timeSelected,
          daySelected,
          therapies,
          session: sessionSelected,
        });
      }
    } else if (permisions.view) {
      router.push({
        name: 'session',
        params: { sessionId: id },
      });
    }
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
  [RECEIVE_THERAPYES](currState, { therapies }) {
    currState.therapies = therapies;
  },
  [CHANGE_SELECTED_DAY](currState, { selectedDay }) {
    currState.selectedDay = selectedDay;
  },
  [SAVE_SESSION](currState, newSession) {
    currState.saveSession = newSession;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
