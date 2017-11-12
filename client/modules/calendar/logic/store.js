import services from './services';
import { RECEIVE_NEXT_SESSIONS_TODAY, RECEIVE_SESSION_SCHEDULE, SET_USER_ID } from './types';
import { generateAppointmentTable } from './utils';

const state = {
  userId: '',
  toDaySession: '',
  selectedDay: {},
  sessionsSchedule: [],
  scheduleTable: [],
};

const getters = {
  toDaySession: currState => currState.toDaySession,
  sessionsSchedule: currState => currState.sessionsSchedule,
  scheduleTable: currState =>
    generateAppointmentTable(currState.sessionsSchedule, currState.toDaySession, currState.selectedDay, currState.userId)
};

const actions = {  
  getToDaySessions({ commit }, selectedDay) {
    services
      .getToDaySessions(selectedDay)
      .then((sessions) => {
        commit(RECEIVE_NEXT_SESSIONS_TODAY, { sessions, selectedDay });
        return services.getSessionSchedule();
      })
      .then(sessionsSchedule => commit(RECEIVE_SESSION_SCHEDULE, { sessionsSchedule }));
  },
  setUserId({ commit }, userId) {
    commit(SET_USER_ID, { userId });
  }
};

const mutations = {
  [RECEIVE_NEXT_SESSIONS_TODAY](currState, { sessions, selectedDay }) {
    currState.toDaySession = sessions;
    currState.selectedDay = selectedDay;
  },
  [RECEIVE_SESSION_SCHEDULE](currState, { sessionsSchedule }) {
    currState.sessionsSchedule = sessionsSchedule;
  },
  [SET_USER_ID](currState, { userId }) {
    currState.userId = userId;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
