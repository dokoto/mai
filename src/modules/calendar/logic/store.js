import { nextsAppointments } from '@/common/api';
import { EMPTY_STRING, MONTHS_AHEAD } from '@/common/constants';
import {
  formatDateNumeric,
  numOfDaysAHead,
  notifyRestError
} from '@/common/utils';
import { STATUS } from '@/common/api/constants';

import { SET_NEXT_APPOINTMENTS, SET_DATE } from './types';

const state = {
  UIappointments: [],
  UISelectedDate: EMPTY_STRING
};

const actions = {
  async init({ commit, dispatch }) {
    const initDate = formatDateNumeric();
    const numAppointmentToFetch = numOfDaysAHead(initDate, MONTHS_AHEAD);
    const appointments = await nextsAppointments(numAppointmentToFetch);

    commit(SET_DATE, { date: initDate });
    if (appointments.status === STATUS.SUCCESS) {
      commit(SET_NEXT_APPOINTMENTS, { appointments: appointments.data });
    } else {
      notifyRestError(dispatch, appointments);
    }
  },
  setNewDate({ commit }, date) {
    commit(SET_DATE, { date });
  }
};

const mutations = {
  [SET_NEXT_APPOINTMENTS](currState, { appointments }) {
    currState.UIappointments = appointments;
  },
  [SET_DATE](currState, { date }) {
    currState.UISelectedDate = date;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
