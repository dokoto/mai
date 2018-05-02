import { mergeWith, get } from 'lodash';
import $ from 'jquery';
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
import {
  notifyError,
  notifyRestError,
  calcDateAHeadFrom
} from '@/common/utils';
import {
  EMPTY_STRING,
  MAP_ZOOM,
  RESERVED,
  DOCTOR,
  USER,
  MONTHS_AHEAD,
  COMPLETE,
  UNCOMPLETE
} from '@/common/constants';
import { STATUS } from '@/common/api/constants';
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
  SET_DOCTOR_ICON_STATUS_RED,
  SET_APPOINTMENT_ICON_STATUS_RED,
  SET_LOCATION_ICON_STATUS_RED,
  SET_DOCTOR_ICON_STATUS_GREEN,
  SET_APPOINTMENT_ICON_STATUS_GREEN,
  SET_LOCATION_ICON_STATUS_GREEN,
  SET_APPOINTMENT_ADDRESS,
  READY_TO_SAVE
} from './types';

const redStatus = {
  icon: faQuestionCircle,
  color: UNCOMPLETE
};
const greeStatus = {
  icon: faCheckCircle,
  color: COMPLETE
};

const state = {
  appointment: {},
  treatments: [],
  appointmentsByDoctor: [],
  schedules: [],
  disableDatesTimes: {},
  geoLocatedAddress: {},
  UItreatmentsShowOpen: false,
  UIappointmentIconStatus: redStatus,
  UIdoctorIconStatus: redStatus,
  UIlocaltionIconStatus: redStatus,
  UIreadyToSave: false,
  UImapZoom: MAP_ZOOM,
  UIaddress: [],
  UIschedulesByDoctor: [],
  UIinitDate: moment()
    .add(1, 'day')
    .format('YYYYMMDD'),
  UIdoctors: [],
  UItreatmentsByDoctor: [],
  UIdisableTimes: [],
  UIdisableDates: [],
  UItreatmentSelected: EMPTY_STRING,
  UIdateSelected: EMPTY_STRING,
  UItimeSelected: EMPTY_STRING,
  UIdoctorSelected: {}
};

const mapSelectedDocAddress = item => ({
  ...item,
  type: DOCTOR,
  selected: true
});
const mapUnselectedAddress = item => ({ ...item, selected: false });
const filterByUserDoc = item => item.type !== DOCTOR;
const filterLang = item => item.lang === window.glob.language;
const filterTreatment = treatment => item => item.key === treatment.key;
const filterTreatmentById = id => item => item.id === id;
const findByDocId = item => item.doctor._id === state.UIdoctorSelected.id;
const findByDay = day => item => item.day === day;
const reduceExptionDays = doctorTimeSchedule => (curr, next) => {
  const day = moment(next).day();
  const execption = doctorTimeSchedule.exception.find(findByDay(day));
  return {
    ...curr,
    [next]: [...(curr[next] || []), ...get(execption, 'time', [])]
  };
};
const reduceBusyDays = (curr, next) => {
  const date = moment(next.date).format('YYYYMMDD');
  return { ...curr, [date]: [...(curr[date] || []), next.time] };
};
const mapDisableDates = doctorTimeSchedule => item => {
  const [date, time] = item;
  const day = moment(date).day();
  const timeScheduleByDay = doctorTimeSchedule.daily.find(
    schedule => schedule.day === day
  );
  return difference(timeScheduleByDay.time, time).length ? null : date;
};

const actions = {
  async fetchAppointment({ commit, dispatch }, id) {
    const appointment = await getAppointment(id);
    if (appointment.status === STATUS.SUCCESS) {
      commit(APPOINTMENT_RECEIVED, appointment.data);
    } else {
      notifyRestError(dispatch, appointment);
    }
  },
  async fetchInitDatas({ commit, rootGetters, dispatch }) {
    const treatments = await getTreatments();
    if (treatments.status === STATUS.SUCCESS) {
      commit(TREATMENTS_RECEIVED, treatments.data);
    } else {
      notifyRestError(dispatch, treatments);
    }

    const doctors = await getDoctors();
    if (doctors.status === STATUS.SUCCESS) {
      commit(DOCTORS_RECEIVED, doctors.data);
    } else {
      notifyRestError(dispatch, doctors);
    }

    const schedules = await getDoctorsSchedules();
    if (schedules.status === STATUS.SUCCESS) {
      commit(DOCTORS_SCHEDULES_RECEIVED, schedules.data);
    } else {
      notifyRestError(dispatch, schedules);
    }

    const session = rootGetters['app/session'];
    commit(SET_ADDRESS, []);
    commit(
      SET_ADDRESS,
      session.user.address.map(item => ({
        ...item,
        type: USER,
        selected: true
      }))
    );
  },
  loadDoctorTreatments({ commit }, doctorId) {
    if (!state.UIdoctorSelected || doctorId !== state.UIdoctorSelected.id) {
      const doctor = state.UIdoctors.find(item => item.id === doctorId);
      const treatmentsByLang = doctor.treatments
        .filter(filterLang)
        .map(item => ({ id: item._id, text: item.name }));
      const address = state.UIaddress
        .map(mapUnselectedAddress)
        .filter(filterByUserDoc)
        .concat(doctor.address.map(mapSelectedDocAddress));

      commit(TREATMENTS_FILTERED, treatmentsByLang);
      commit(SET_DOCTOR, doctor);
      commit(SET_ADDRESS, address);
      commit(SET_DISABLE_DATES_TIMES, {});
      commit(SET_DISABLE_DATES, []);
      commit(SET_TREATMENT, []);
      commit(SET_DISABLE_TIMES, []);
      commit(SET_APPOINTMENT_ADDRESS, {});

      actions.checkReadyToSave(commit);
    }
  },
  async loadDoctorSchedule({ commit }, id) {
    const treatment = state.treatments.find(filterTreatmentById(id));
    const doctorNextAppointments = await getDoctorNextAppointments(
      state.UIdoctorSelected.email
    );
    const doctorTimeSchedule = state.schedules.find(findByDocId);
    const doctorBusySchedule = doctorNextAppointments.data.reduce(
      reduceBusyDays,
      {}
    );
    const exceptionDays = calcDateAHeadFrom(moment(), MONTHS_AHEAD).reduce(
      reduceExptionDays(doctorTimeSchedule),
      {}
    );
    const disableDatesTimes = mergeWith(
      exceptionDays,
      doctorBusySchedule,
      (obj, source) => union(obj, source).sort()
    );
    const disableDates = Object.entries(disableDatesTimes)
      .map(mapDisableDates(doctorTimeSchedule))
      .filter(Boolean);

    commit(SET_DISABLE_DATES_TIMES, disableDatesTimes);
    commit(SET_DISABLE_DATES, disableDates);
    commit(SET_TREATMENT, {
      name: treatment.name,
      treatmentAllLangs: state.treatments.filter(filterTreatment)
    });
    commit(SET_DISABLE_TIMES, []);
    commit(SET_DATE_SELECTED, EMPTY_STRING);
    commit(SET_TIME_SELECTED, EMPTY_STRING);

    actions.checkReadyToSave(commit);
  },
  loadDoctorTimeSchedule({ commit }, date) {
    if (state.UIdoctorSelected) {
      const doctorTimeSchedule = state.schedules.find(findByDocId);
      const day = moment(date).day();
      const timeScheduleByDay = doctorTimeSchedule.daily.find(findByDay(day));

      commit(SET_DOCTOR_SCHEDULE, timeScheduleByDay.time);
      commit(SET_DATE_SELECTED, date);
      commit(SET_TIME_SELECTED, EMPTY_STRING);
      commit(SET_DISABLE_TIMES, state.disableDatesTimes[date]);

      actions.checkReadyToSave(commit);
    }
  },
  saveDoctorTIme({ commit }, time) {
    commit(SET_TIME_SELECTED, time);
    actions.checkReadyToSave(commit);
  },
  extractProfileAttb(profile) {
    return {
      _id: get(profile, 'id', EMPTY_STRING),
      name: get(profile, 'name', EMPTY_STRING),
      surname: get(profile, 'surname', EMPTY_STRING),
      email: get(profile, 'email', EMPTY_STRING)
    };
  },
  async saveAppointment({ rootGetters, dispatch }) {
    const newAppointment = {};
    if (state.UIreadyToSave) {
      const session = rootGetters['app/session'];

      newAppointment.date = get(state, 'UIdateSelected', EMPTY_STRING);
      newAppointment.time = get(state, 'UItimeSelected', EMPTY_STRING);
      newAppointment.patient = actions.extractProfileAttb(session.user);
      newAppointment.doctor = actions.extractProfileAttb(
        state.UIdoctorSelected
      );
      newAppointment.treatment = state.appointment.treatment;
      newAppointment.status = RESERVED;
      newAppointment.allowReBooking = true;
      newAppointment.createddBy = get(session, 'user.id', EMPTY_STRING);
    } else {
      notifyError(dispatch, 'appointment.errors.requiredFields');
    }
  },
  addressSelected({ commit }, { id }) {
    const address = state.UIaddress.find(item => item._id === id);
    commit(SET_APPOINTMENT_ADDRESS, address);
    actions.checkReadyToSave(commit);
  },
  checkReadyToSave(commit) {
    commit(
      state.UIdoctorSelected
        ? SET_DOCTOR_ICON_STATUS_GREEN
        : SET_DOCTOR_ICON_STATUS_RED
    );
    commit(
      state.UItreatmentSelected && state.UIdateSelected && state.UItimeSelected
        ? SET_APPOINTMENT_ICON_STATUS_GREEN
        : SET_APPOINTMENT_ICON_STATUS_RED
    );
    commit(
      Object.keys(state.appointment.address).length
        ? SET_LOCATION_ICON_STATUS_GREEN
        : SET_LOCATION_ICON_STATUS_RED
    );
    if (
      state.UIappointmentIconStatus.color === COMPLETE &&
      state.UIdoctorIconStatus.color === COMPLETE &&
      state.UIlocaltionIconStatus.color === COMPLETE
    ) {
      commit(READY_TO_SAVE, true);
    } else {
      commit(READY_TO_SAVE, false);
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
    currState.UIdoctors = doctors;
  },
  [DOCTORS_SCHEDULES_RECEIVED](currState, schedules) {
    currState.schedules = schedules;
  },
  [TREATMENTS_FILTERED](currState, treatmentsByLang) {
    currState.UItreatmentsByDoctor = treatmentsByLang;
  },
  [SET_DOCTOR](currState, doctor) {
    currState.UIdoctorSelected = doctor;
    currState.UItreatmentsShowOpen = true;
    currState.UItreatmentSelected = EMPTY_STRING;
    currState.UIdateSelected = EMPTY_STRING;
    currState.UItimeSelected = EMPTY_STRING;
  },
  [SET_TREATMENT](currState, { name, treatmentAllLangs }) {
    currState.UItreatmentsShowOpen = name ? false : currState.UItreatmentsShowOpen;
    currState.UItreatmentSelected = name;
    currState.appointment.treatment = treatmentAllLangs;
  },
  [SET_APPOINTMENT_ADDRESS](currState, address) {
    currState.appointment.address = address;
  },
  [SET_DISABLE_DATES](currState, disableDates) {
    currState.UIdisableDates = disableDates;
  },
  [SET_DISABLE_DATES_TIMES](currState, disableDatesTimes) {
    currState.disableDatesTimes = disableDatesTimes;
  },
  [SET_DISABLE_TIMES](currState, disableTimes) {
    currState.UIdisableTimes = disableTimes;
  },
  [SET_DATE_SELECTED](currState, date) {
    currState.UIdateSelected = date;
  },
  [SET_TIME_SELECTED](currState, time) {
    currState.UItimeSelected = time;
  },
  [SET_DOCTOR_SCHEDULE](currState, schedule) {
    currState.UIschedulesByDoctor = schedule;
  },
  [SET_ADDRESS](currState, address = []) {
    currState.UIaddress = address;
  },
  [SET_DOCTOR_ICON_STATUS_RED](currState) {
    currState.UIdoctorIconStatus = redStatus;
  },
  [SET_APPOINTMENT_ICON_STATUS_RED](currState) {
    currState.UIappointmentIconStatus = redStatus;
  },
  [SET_LOCATION_ICON_STATUS_RED](currState) {
    currState.UIlocaltionIconStatus = redStatus;
  },
  [SET_DOCTOR_ICON_STATUS_GREEN](currState) {
    currState.UIdoctorIconStatus = greeStatus;
  },
  [SET_APPOINTMENT_ICON_STATUS_GREEN](currState) {
    currState.UIappointmentIconStatus = greeStatus;
  },
  [SET_LOCATION_ICON_STATUS_GREEN](currState) {
    currState.UIlocaltionIconStatus = greeStatus;
  },
  [READY_TO_SAVE](currState, isReady) {
    currState.UIreadyToSave = isReady;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
