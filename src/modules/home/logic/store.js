import * as services from '../../../common/api';
import { RECEIVE_NEXT_SESSIONS } from './types';
import { STATUS } from '../../../common/api/constants';
import { EMPTY_ARRAY } from '../../../common/constants';

const state = {
  nextsAppointments: EMPTY_ARRAY,
};

const actions = {
  async nextsAppointments({ commit }) {
    const nextsAppointments = await services.nextsAppointments();
    if (nextsAppointments.status === STATUS.SUCCESS) {
      commit(RECEIVE_NEXT_SESSIONS, nextsAppointments.data);
    } else {
      const message =
        nextsAppointments.status === STATUS.FAIL
          ? nextsAppointments.data.message
          : nextsAppointments.message;
      commit('app/NOTIFY', { status: nextsAppointments.status, message }, { root: true });
    }
  },
};

const mutations = {
  [RECEIVE_NEXT_SESSIONS](currState, nextsAppointments) {
    currState.nextsAppointments = nextsAppointments;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
