import _ from 'lodash/object';
import {
  getAppointment,
  getTreatments,
  getDoctors,
  getDoctorsSchedules,
  getDoctorNextAppointments
} from '@/common/api';
import { notifyError, formatDateNumeric } from '@/common/utils';
import {
  STATUS,
  EMPTY_ARRAY,
  EMPTY_STRING,
  EMPTY_OBJECT,
  MAP_ZOOM,
  MONTHS_INTERVAL
} from '@/common/api/constants';
import {
  APPOINTMENT_RECEIVED,
  TREATMENTS_RECEIVED,
  DOCTORS_RECEIVED,
  DOCTORS_SCHEDULES_RECEIVED,
  TREATMENTS_FILTERED,
  SET_DOCTOR,
  SET_TREATMENT
  /*
  // OLD
  RECEIVE_SESSION,
  RECEIVE_SESSION_THERAPISTS,
  RECEIVE_SESSION_THERAPIES,
  RECEIVE_ALL_THERAPIES,
  RECEIVE_SESSION_TIME_SCHEDULE,
  SET_THERAPY_TYPE,
  RECEIVE_DISABLE_DAYS,
  SET_INIT_DATE,
  RECEIVE_DISABLE_TIMES,
  SET_TIME,
  SET_DATE,
  RECEIVE_DISABLE_THERAPISTS,
  SET_THERAPI,
  SET_ADDRESS
  */
} from './types';

/*
 * TERAPIA: therapy
 * TERAPIAS: therapies
 * -----------------------
 * TERAPEUTA: therapi
 * TERAPEUTAS: therapists
 */

const state = {
  appointment: EMPTY_OBJECT,
  doctors: EMPTY_ARRAY,
  treatments: EMPTY_ARRAY,
  treatmentsByDoctor: EMPTY_ARRAY,
  appointmentsByDoctor: EMPTY_ARRAY,
  schedules: EMPTY_ARRAY,
  schedulesByDoctor: EMPTY_ARRAY,
  mapZoom: MAP_ZOOM
  /*
  // OLD
  session: EMPTY_OBJECT,
  therapists: EMPTY_ARRAY,
  therapies: EMPTY_ARRAY,
  initDate: EMPTY_STRING,
  sessionTimeSchedule: EMPTY_ARRAY,
  disablesDates: EMPTY_ARRAY,
  disablesTimes: EMPTY_ARRAY,
  disablesTherapists: EMPTY_ARRAY,
  selected: {
    therapi: EMPTY_STRING,
    type: EMPTY_STRING,
    date: EMPTY_STRING,
    time: EMPTY_STRING,
    address: EMPTY_STRING
  }
  */
};

// DELTE?
const getters = {
  /*
  // OLD
  session: currState => currState.session,
  therapists: currState => currState.therapists,
  therapistAddress: currState => _.get(currState, 'therapists[0].address'),
  firstTherapy: currState =>
    _.get(
      currState,
      `therapies[0].texts[${window.glob.language.toUpperCase()}]`
    ),
  mapZoom: currState => currState.mapZoom,
  // NEW

  allTherapiesName: currState =>
    currState.therapies.map(item =>
      _.get(item, `texts[${window.glob.language.toUpperCase()}].name`)
    )
    */
};

const actions = {
  // NEW
  async fetchAppointment({ commit }, id) {
    const appointment = await getAppointment(id);
    if (appointment.status === STATUS.SUCCESS) {
      commit(APPOINTMENT_RECEIVED, appointment.data);
    } else {
      notifyError(commit, appointment);
    }
  },
  async fetchComboDatas({ commit }) {
    const treatments = await getTreatments();
    if (treatments.status === STATUS.SUCCESS) {
      commit(TREATMENTS_RECEIVED, treatments.data);
    } else {
      notifyError(commit, treatments);
    }

    const doctors = await getDoctors();
    if (doctors.status === STATUS.SUCCESS) {
      commit(DOCTORS_RECEIVED, doctors.data);
    } else {
      notifyError(commit, doctors);
    }

    const schedules = await getDoctorsSchedules();
    if (schedules.status === STATUS.SUCCESS) {
      commit(DOCTORS_SCHEDULES_RECEIVED, schedules.data);
    } else {
      notifyError(commit, schedules);
    }
  },
  loadDoctorTreatments({ commit }, doctorId) {
    const doctor = state.doctors.filter(item => item.id === doctorId);
    const treatments = _.get(doctor, '[0].treatments', {});
    const treatmentsByLang = treatments
      .filter(item => item.lang === window.glob.language)
      .map(item => ({ id: item._id, text: item.name }));
    commit(TREATMENTS_FILTERED, treatmentsByLang);
    commit(SET_DOCTOR, _.get(doctor, '[0]', []));
  },
  async loadDoctorSchedule({ commit }, treatmentId) {
    const doctorNextAppointments = await getDoctorNextAppointments(state.appointment.doctor.email);
    // Comprobar si hay algun dia con todas las citas completas y de ser asi desabilitarlo en el
    // dayCarruselBoxed.disablesDates. Y comitear el resultado para usarlo cuando seleccione el dia
    // y desabilitar las horas que ya tiene comprometidas.
    const treatmentKey = state.treatments.find(item => item.id === treatmentId).key;
    commit(SET_TREATMENT, state.treatments.filter(item => item.key === treatmentKey));
  }
  /*
  // OLD FOR DELETE
  // DELETE?
  async getSession({ commit }, sessionId) {
    const session = await services.getSession(sessionId);
    const therapies = await services.getTherapies([
      _.get(session, '[0].therapy')
    ]);
    const therapists = await services.getUser(
      consts.USERS.THERAPIST,
      _.get(session, '[0].therapist')
    );
    commit(RECEIVE_SESSION, { session });
    commit(RECEIVE_SESSION_THERAPIES, { therapies });
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },
  // DELETE?
  async TherapyDatas({ commit }) {
    const therapies = await services.getTherapies();
    const therapists = await services.getUsersByType(consts.USERS.THERAPIST);
    commit(RECEIVE_SESSION_THERAPIES, { therapies });
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },

  async fetchAllTherapists({ commit }) {
    const therapists = await services.getUsersByType(consts.USERS.THERAPIST);
    commit(RECEIVE_SESSION_THERAPISTS, { therapists });
  },
  async fetchAllTherapies({ commit }) {
    const therapi = state.therapists.filter(
      item => item.id === state.selected.therapi
    );
    const therapies = await services.getTherapies(
      _.get(therapi, '[0].therapys')
    );
    commit(RECEIVE_ALL_THERAPIES, { therapies });
  },
  async fetchSessionTimeSchedule({ commit }) {
    const sessionTimeSchedule = await services.getSessionTimeSchedule();
    commit(RECEIVE_SESSION_TIME_SCHEDULE, { sessionTimeSchedule });
  },
  async fetchBusyDays({ commit }, therapi) {
    const disablesDates = await services.getBusyDays(
      therapi,
      state.initDate,
      MONTHS_INTERVAL
    );
    commit(RECEIVE_DISABLE_DAYS, { disablesDates });
  },
  async fetchBusyTimes({ commit }, dateSelected) {
    const disablesTimes = await services.getBusyTimes(
      state.selected.therapi,
      dateSelected
    );
    commit(RECEIVE_DISABLE_TIMES, { disablesTimes });
  },
  async fetchBusyTherapists({ commit }) {
    const disablesTherapists = await services.getBusyTherapists();
    commit(RECEIVE_DISABLE_THERAPISTS, { disablesTherapists });
  },
  setTherapi({ commit }, therapi) {
    commit(SET_THERAPI, { therapi });
    commit(SET_THERAPY_TYPE, { therapy: EMPTY_STRING });
    commit(SET_DATE, { date: EMPTY_STRING });
    commit(SET_TIME, { time: EMPTY_STRING });
  },
  setTherapyType({ commit }, therapy) {
    commit(SET_THERAPY_TYPE, { therapy });
  },
  setDate({ commit }, date) {
    commit(SET_DATE, { date });
  },
  setTime({ commit }, time) {
    commit(SET_TIME, { time });
  },
  setAddress({ commit }, newTherapi) {
    const therapi = state.therapists.filter(item => item.id === newTherapi);
    commit(SET_ADDRESS, { address: _.get(therapi, '[0].address') });
  },
  initDate({ commit }, initDate = formatDateNumeric()) {
    commit(SET_INIT_DATE, { initDate });
  }
  */
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
  }
  /*
  [RECEIVE_SESSION](currState, { session }) {
    [currState.session] = session;
  },
  [RECEIVE_SESSION_THERAPISTS](currState, { therapists }) {
    currState.therapists = therapists;
  },
  [RECEIVE_SESSION_THERAPIES](currState, { therapies }) {
    currState.therapies = therapies;
  },
  // NEW
  [RECEIVE_ALL_THERAPIES](currState, { therapies }) {
    currState.therapies = therapies;
  },
  [RECEIVE_SESSION_TIME_SCHEDULE](currState, { sessionTimeSchedule }) {
    currState.sessionTimeSchedule = sessionTimeSchedule;
  },
  [SET_THERAPY_TYPE](currState, { therapy }) {
    currState.selected.type = therapy;
  },
  [RECEIVE_DISABLE_DAYS](currState, { disablesDates }) {
    currState.disablesDates = disablesDates;
  },
  [SET_INIT_DATE](currState, { initDate }) {
    currState.initDate = initDate;
  },
  [SET_DATE](currState, { date }) {
    currState.selected.date = date;
  },
  [SET_TIME](currState, { time }) {
    currState.selected.time = time;
  },
  [RECEIVE_DISABLE_TIMES](currState, { disablesTimes }) {
    currState.disablesTimes = disablesTimes;
  },
  [RECEIVE_DISABLE_THERAPISTS](currState, { disablesTherapists }) {
    currState.disablesTherapists = disablesTherapists;
  },
  [SET_THERAPI](currState, { therapi }) {
    currState.selected.therapi = therapi;
  },
  [SET_ADDRESS](currState, { address }) {
    currState.selected.address = address;
  }
  */
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
