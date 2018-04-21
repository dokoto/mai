import { mergeWith, get } from 'lodash/object';
import { difference, union } from 'lodash/array';
import moment from 'moment';
import {
  faCheckCircle,
  faQuestionCircle
} from '@fortawesome/fontawesome-free-solid';

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
  EMPTY_STRING,
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
  SET_DISABLE_TIMES,
  SET_DATE_SELECTED,
  SET_TIME_SELECTED,
  SET_DOCTOR_SCHEDULE,
  SET_ADDRESS,
  SET_DOCTOR_ICON_STATUS,
  SET_APPOINTMENT_ICON_STATUS,
  SET_LOCATION_ICON_STATUS,
  READY_TO_SAVE
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
  treatmentSelected: EMPTY_STRING,
  dateSelected: EMPTY_STRING,
  timeSelected: EMPTY_STRING,
  treatmentsShowOpen: false,
  addressSelected: EMPTY_STRING,
  readyToSave: false,
  mapZoom: MAP_ZOOM,
  appointmentIconStatus: {
    icon: faQuestionCircle,
    color: 'red'
  },
  doctorIconStatus: {
    icon: faQuestionCircle,
    color: 'red'
  },
  localtionIconStatus: {
    icon: faQuestionCircle,
    color: 'red'
  }
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
  async fetchInitDatas({ commit, dispatch }) {
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
    if (!state.appointment.doctor || doctorId !== state.appointment.doctor.id) {
      const doctor = state.doctors.find(item => item.id === doctorId);
      const treatmentsByLang = doctor.treatments
        .filter(item => item.lang === window.glob.language)
        .map(item => ({ id: item._id, text: item.name }));
      commit(TREATMENTS_FILTERED, treatmentsByLang);
      commit(SET_DOCTOR, doctor);
      commit(SET_DOCTOR_ICON_STATUS, {
        icon: faCheckCircle,
        color: 'green'
      });

      commit(
        SET_ADDRESS,
        `${get(
          state.appointment.doctor.address,
          '[0].street',
          EMPTY_STRING
        )}, ${get(
          state.appointment.doctor.address,
          '[0].country',
          EMPTY_STRING
        )}`
      );
      commit(SET_LOCATION_ICON_STATUS, {
        icon: faCheckCircle,
        color: 'green'
      });
      commit(SET_DISABLE_DATES_TIMES, EMPTY_OBJECT);
      commit(SET_DISABLE_DATES, EMPTY_ARRAY);
      commit(SET_TREATMENT, EMPTY_ARRAY);
      commit(SET_DISABLE_TIMES, EMPTY_ARRAY);
      commit(READY_TO_SAVE, false);
      commit(SET_APPOINTMENT_ICON_STATUS, {
        icon: faQuestionCircle,
        color: 'red'
      });
    }
  },
  async loadDoctorSchedule({ commit }, id) {
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
    const treatment = state.treatments.find(item => item.id === id);
    commit(SET_TREATMENT, {
      name: treatment.name,
      treatmentAllLangs: state.treatments.filter(
        item => item.key === treatment.key
      )
    });
    commit(SET_DISABLE_TIMES, EMPTY_ARRAY);
    commit(SET_DATE_SELECTED, EMPTY_STRING);
    commit(SET_TIME_SELECTED, EMPTY_STRING);
    commit(READY_TO_SAVE, false);
    commit(SET_APPOINTMENT_ICON_STATUS, {
      icon: faQuestionCircle,
      color: 'red'
    });
  },
  loadDoctorTimeSchedule({ commit }, date) {
    const doctorTimeSchedule = state.schedules.find(
      item => item.doctor._id === state.appointment.doctor.id
    );
    const day = moment(date).day();
    const timeScheduleByDay = doctorTimeSchedule.daily.find(
      item => item.day === day
    );
    commit(SET_DOCTOR_SCHEDULE, timeScheduleByDay.time);
    commit(SET_DATE_SELECTED, date);
    commit(SET_TIME_SELECTED, EMPTY_STRING);
    commit(SET_DISABLE_TIMES, state.disableDatesTimes[date]);
    commit(READY_TO_SAVE, false);
    commit(SET_APPOINTMENT_ICON_STATUS, {
      icon: faQuestionCircle,
      color: 'red'
    });
  },
  saveDoctorTIme({ commit }, time) {
    commit(SET_TIME_SELECTED, time);
    if (state.treatmentSelected && state.dateSelected && state.timeSelected) {
      commit(SET_APPOINTMENT_ICON_STATUS, {
        icon: faCheckCircle,
        color: 'green'
      });
      if (state.addressSelected) {
        commit(READY_TO_SAVE, true);
      }
    }
  }
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
    currState.treatmentsShowOpen = true;
    currState.treatmentSelected = EMPTY_STRING;
    currState.dateSelected = EMPTY_STRING;
    currState.timeSelected = EMPTY_STRING;
  },
  [SET_TREATMENT](currState, { name, treatmentAllLangs }) {
    currState.treatmentsShowOpen = name ? false : currState.treatmentsShowOpen;
    currState.treatmentSelected = name;
    currState.appointment.treatment = treatmentAllLangs;
  },
  [SET_DISABLE_DATES](currState, disableDates) {
    currState.disableDates = disableDates;
  },
  [SET_DISABLE_DATES_TIMES](currState, disableDatesTimes) {
    currState.disableDatesTimes = disableDatesTimes;
  },
  [SET_DISABLE_TIMES](currState, disableTimes) {
    currState.disableTimes = disableTimes;
  },
  [SET_DATE_SELECTED](currState, date) {
    currState.dateSelected = date;
  },
  [SET_TIME_SELECTED](currState, time) {
    currState.timeSelected = time;
  },
  [SET_DOCTOR_SCHEDULE](currState, schedule) {
    currState.schedulesByDoctor = schedule;
  },
  [SET_ADDRESS](currState, address) {
    currState.addressSelected = address;
  },
  [SET_DOCTOR_ICON_STATUS](currState, iconStatus) {
    currState.doctorIconStatus = iconStatus;
  },
  [SET_APPOINTMENT_ICON_STATUS](currState, iconStatus) {
    currState.appointmentIconStatus = iconStatus;
  },
  [SET_LOCATION_ICON_STATUS](currState, iconStatus) {
    currState.localtionIconStatus = iconStatus;
  },
  [READY_TO_SAVE](currState, ready) {
    currState.readyToSave = ready;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
