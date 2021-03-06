import * as services from '@/common/api';
import { STATUS } from '@/common/api/constants';
import { EMPTY_ARRAY } from '@/common/constants';
import { notifyRestError } from '@/common/utils';
import { RECEIVE_NEXT_SESSIONS } from './types';

const state = {
  nextsAppointments: EMPTY_ARRAY
};

const actions = {
  async nextsAppointments({ commit, dispatch }) {
    const nextsAppointments = await services.nextsAppointments();
    if (nextsAppointments.status === STATUS.SUCCESS) {
      commit(RECEIVE_NEXT_SESSIONS, nextsAppointments.data);
    } else {
      notifyRestError(dispatch, nextsAppointments);
    }
  }
};

const mutations = {
  [RECEIVE_NEXT_SESSIONS](currState, nextsAppointments) {
    currState.nextsAppointments = nextsAppointments;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
