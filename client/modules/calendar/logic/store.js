import _ from 'lodash';
import services from '../../../app/services';
import {
  RECEIVE_TODAY_SESSIONS,
  RECEIVE_SESSION_TIME_SCHEDULE,
  SET_USER_ID,
  RECEIVE_THERAPYES,
  SAVE_SESSION,
  CLOSE_SESSION_DIALOG,
  SET_SELECTED_DAY,
} from './types';
import { generateAppointmentTable, findSessionById } from '../../../app/utils';

const state = {
  userId: '',
  toDaySessions: [],
  selectedDay: '',
  timeSelected: '',
  sessionTimeSchedule: [],
  therapies: [],
  newAppointment: {
    isDialogOpen: false,
  },
};

const getters = {
  selectedDay: currState => currState.selectedDay,
  toDaySessions: currState => currState.toDaySessions,
  sessionTimeSchedule: currState => currState.sessionTimeSchedule,
  getTherapies: currState => currState.therapies,
  newAppointment: currState => currState.newAppointment,
  userId: currState => currState.userId,
};

const actions = {
  async getToDaySessions({ commit }, selectedDay) {
    const daySessions = await services.getToDaySessions(selectedDay);
    const sessionTimeSchedule = await services.getSessionTimeSchedule();
    const therapyIds = daySessions.map(item => _.get(item, 'therapy.id'));
    const therapies = await services.getTherapies(therapyIds);

    commit(RECEIVE_TODAY_SESSIONS, {
      sessionTimeSchedule,
      daySessions,
      selectedDay,
      therapies,
      userId: getters.userId,
    });
    commit(SET_SELECTED_DAY, selectedDay);
    commit(RECEIVE_SESSION_TIME_SCHEDULE, { sessionTimeSchedule });
    commit(RECEIVE_THERAPYES, { therapies });
  },
  setUserId({ commit }, userId) {
    commit(SET_USER_ID, { userId });
  },
  changeDay({ commit, dispatch }, selectedDay) {
    commit(SET_USER_ID, selectedDay);
    dispatch('getToDaySessions', selectedDay);
  },
  closeAppointmentDialog({ commit }) {
    commit(CLOSE_SESSION_DIALOG, false);
  },
  async openAppointmentDialog({ commit }, {
    router, id, daySelected, timeSelected,
  }) {
    const sessionTimeSelected = _.find(getters.sessionTimeSchedule, findSessionById(id));
    const permisions = _.get(sessionTimeSelected, 'permisions');
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
          sessionTimeSelected,
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
  [CLOSE_SESSION_DIALOG](currState, isDialogOpen) {
    currState.newAppointment.isDialogOpen = isDialogOpen;
  },
  [RECEIVE_TODAY_SESSIONS](currState, toDaySessionsDatas) {
    currState.toDaySessions = generateAppointmentTable(...toDaySessionsDatas);
    currState.selectedDay = toDaySessionsDatas.selectedDay;
  },
  [RECEIVE_SESSION_TIME_SCHEDULE](currState, { sessionTimeSchedule }) {
    currState.sessionTimeSchedule = sessionTimeSchedule;
  },
  [SET_SELECTED_DAY](currState, selectedDay) {
    currState.selectedDay = selectedDay;
  },
  [SET_USER_ID](currState, { userId }) {
    currState.userId = userId;
  },
  [RECEIVE_THERAPYES](currState, { therapies }) {
    currState.therapies = therapies;
  },
  [SAVE_SESSION](currState, newAppointment) {
    currState.newAppointment = newAppointment;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
