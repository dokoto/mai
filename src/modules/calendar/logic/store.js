import moment from 'moment';
import { nextsAppointments } from '@/common/api';
import { EMPTY_STRING, MONTHS_AHEAD } from '@/common/constants';
import {
  formatDateNumeric,
  numOfDaysAHead,
  notifyRestError
} from '@/common/utils';
import { STATUS } from '@/common/api/constants';

import {
  SET_NEXT_APPOINTMENTS,
  SET_DATE,
  SET_DATE_APPOINTMENTS
} from './types';

const state = {
  appointments: [],
  UIDateappointments: [],
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
      const appointmentByDate = appointments.data
        .filter(item => moment(item.date, 'YYYYMMDD').diff(initDate) === 0)
        .sort((a, b) => {
          const cmp = moment(`${a.date.slice(0, 10).replace(/-/g, '')}T${a.time.replace(':', '')}`).isBefore(
            moment(`${b.date.slice(0, 10).replace(/-/g, '')}T${b.time.replace(':', '')}`)
          );
          if (cmp) {
            return -1;
          }
          if (!cmp) {
            return 1;
          }
          return 0;
        });
      commit(SET_DATE_APPOINTMENTS, { appointments: appointmentByDate });
    } else {
      notifyRestError(dispatch, appointments);
    }
  },
  setNewDate({ commit }, date) {
    const appointmentByDate = state.appointments
      .filter(item => moment(item.date, 'YYYYMMDD').diff(date) === 0)
      .sort((a, b) => {
        const cmp = moment(`${a.date.slice(0, 10).replace(/-/g, '')}T${a.time.replace(':', '')}`).isBefore(
          moment(`${b.date.slice(0, 10).replace(/-/g, '')}T${b.time.replace(':', '')}`)
        );
        if (cmp) {
          return -1;
        }
        if (!cmp) {
          return 1;
        }
        return 0;
      });
    commit(SET_DATE_APPOINTMENTS, { appointments: appointmentByDate });
    commit(SET_DATE, { date });
  }
};

const mutations = {
  [SET_NEXT_APPOINTMENTS](currState, { appointments }) {
    currState.appointments = appointments;
  },
  [SET_DATE_APPOINTMENTS](currState, { appointments }) {
    currState.UIDateappointments = appointments;
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
