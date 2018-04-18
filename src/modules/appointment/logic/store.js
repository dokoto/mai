import { mergeWith, get } from 'lodash/object';
import { difference, union } from 'lodash/array';
import moment from 'moment';

import {
  getAppointment,
  getTreatments,
  getDoctors,
  getDoctorsSchedules,
  getDoctorNextAppointments
} from '@/common/api';
import { notifyError, calcDateAHeadFrom } from '@/common/utils';
import {
  STATUS,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  MAP_ZOOM
} from '@/common/api/constants';
import {
  APPOINTMENT_RECEIVED,
  TREATMENTS_RECEIVED,
  DOCTORS_RECEIVED,
  DOCTORS_SCHEDULES_RECEIVED,
  TREATMENTS_FILTERED,
  SET_DOCTOR,
  SET_TREATMENT,
  SET_DISABLE_DATES,
  SET_DISABLE_DATES_TIMES,
  SET_DISABLE_TIMES
} from './types';

const state = {
  initDate: moment()
    .add(1, 'day')
    .format('YYYYMMDD'),
  appointment: EMPTY_OBJECT,
  doctors: EMPTY_ARRAY,
  treatments: EMPTY_ARRAY,
  treatmentsByDoctor: EMPTY_ARRAY,
  appointmentsByDoctor: EMPTY_ARRAY,
  disableDates: EMPTY_ARRAY,
  disableTimes: EMPTY_ARRAY,
  disableDatesTimes: EMPTY_OBJECT,
  schedules: EMPTY_ARRAY,
  schedulesByDoctor: EMPTY_ARRAY,
  mapZoom: MAP_ZOOM
};

const actions = {
  // NEW
  async fetchAppointment({ commit, dispatch }, id) {
    const appointment = await getAppointment(id);
    if (appointment.status === STATUS.SUCCESS) {
      commit(APPOINTMENT_RECEIVED, appointment.data);
    } else {
      notifyError(dispatch, appointment);
    }
  },
  async fetchComboDatas({ commit, dispatch }) {
    const treatments = await getTreatments();
    if (treatments.status === STATUS.SUCCESS) {
      commit(TREATMENTS_RECEIVED, treatments.data);
    } else {
      notifyError(dispatch, treatments);
    }

    const doctors = await getDoctors();
    if (doctors.status === STATUS.SUCCESS) {
      commit(DOCTORS_RECEIVED, doctors.data);
    } else {
      notifyError(dispatch, doctors);
    }

    const schedules = await getDoctorsSchedules();
    if (schedules.status === STATUS.SUCCESS) {
      commit(DOCTORS_SCHEDULES_RECEIVED, schedules.data);
    } else {
      notifyError(dispatch, schedules);
    }
  },
  loadDoctorTreatments({ commit }, doctorId) {
    const doctor = state.doctors.find(item => item.id === doctorId);
    const treatmentsByLang = doctor.treatments
      .filter(item => item.lang === window.glob.language)
      .map(item => ({ id: item._id, text: item.name }));
    commit(TREATMENTS_FILTERED, treatmentsByLang);
    commit(SET_DOCTOR, doctor);
  },
  async loadDoctorSchedule({ commit }, treatmentId) {
    const doctorNextAppointments = await getDoctorNextAppointments(
      state.appointment.doctor.email
    );
    const doctorTimeSchedule = state.schedules.find(
      item => item.doctor._id === state.appointment.doctor.id
    );
    const doctorBusySchedule = doctorNextAppointments.data.reduce(
      (curr, next) => {
        const date = moment(next.date).format('YYYYMMDD');
        return { ...curr, [date]: [...(curr[date] || []), next.time] };
      },
      {}
    );

    const exceptionDays = calcDateAHeadFrom(moment(), 3).reduce(
      (curr, next) => {
        const day = moment(next).day();
        const execption = doctorTimeSchedule.exception.find(
          item => item.day === day
        );
        return {
          ...curr,
          [next]: [...(curr[next] || []), ...get(execption, 'time', [])]
        };
      },
      {}
    );
    const disableDatesTimes = mergeWith(
      exceptionDays,
      doctorBusySchedule,
      (obj, source) => union(obj, source).sort()
    );
    const disableDates = Object.entries(disableDatesTimes)
      .map(item => {
        const [date, time] = item;
        const day = moment(date).day();
        const timeScheduleByDay = doctorTimeSchedule.daily.find(
          item => item.day === day
        );
        return difference(timeScheduleByDay.time, time).length ? null : date;
      })
      .filter(Boolean);

    commit(SET_DISABLE_DATES_TIMES, disableDatesTimes);
    commit(SET_DISABLE_DATES, disableDates);
    const treatment = state.treatments.find(item => item.id === treatmentId);
    commit(
      SET_TREATMENT,
      state.treatments.filter(item => item.key === treatment.key)
    );
  },
  loadDoctorTimeSchedule({ commit }, date) {
    commit(SET_DISABLE_TIMES, state.disableDatesTimes[date]);
  }
  // Hay que configurar la seleccion para que si despues de seleccionar todo se cambia el doctor
  // el resto de datos cambie en consonancia
};

const mutations = {
  [APPOINTMENT_RECEIVED](currState, appointment) {
    currState.appointment = appointment;
    currState.appointment.treatment = appointment.treatment.reduce(
      (curr, next) => (next.lang === window.glob.language ? next : curr),
      {}
    );
  },
  [TREATMENTS_RECEIVED](currState, treatments) {
    currState.treatments = treatments;
  },
  [DOCTORS_RECEIVED](currState, doctors) {
    currState.doctors = doctors;
  },
  [DOCTORS_SCHEDULES_RECEIVED](currState, schedules) {
    currState.schedules = schedules;
  },
  [TREATMENTS_FILTERED](currState, treatmentsByLang) {
    currState.treatmentsByDoctor = treatmentsByLang;
  },
  [SET_DOCTOR](currState, doctor) {
    currState.appointment.doctor = doctor;
  },
  [SET_TREATMENT](currState, treatment) {
    currState.appointment.treatment = treatment;
  },
  [SET_DISABLE_DATES](currState, disableDates) {
    currState.disableDates = disableDates;
  },
  [SET_DISABLE_DATES_TIMES](currState, disableDatesTimes) {
    currState.disableDatesTimes = disableDatesTimes;
  },
  [SET_DISABLE_TIMES](currState, disableTimes) {
    currState.disableTimes = disableTimes;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
