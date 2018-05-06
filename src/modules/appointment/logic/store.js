import { mergeWith, get } from 'lodash';
import { union } from 'lodash/array';
import moment from 'moment';

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
  USER,
  MONTHS_AHEAD,
  COMPLETE
} from '@/common/constants';
import { STATUS } from '@/common/api/constants';
import {
  APPOINTMENT_RECEIVED,
  TREATMENTS_RECEIVED,
  DOCTORS_RECEIVED,
  DOCTORS_SCHEDULES_RECEIVED,
  SET_TREATMENTS_FILTERED,
  SET_DOCTOR,
  SET_TREATMENT,
  SET_DISABLE_DATES,
  SET_DISABLE_DATES_TIMES,
  SET_DISABLE_TIMES,
  SET_DATE_SELECTED,
  SET_TIME_SELECTED,
  SET_DOCTOR_SCHEDULE,
  SET_ADDRESSES,
  SET_DOCTOR_ICON_STATUS_RED,
  SET_APPOINTMENT_ICON_STATUS_RED,
  SET_LOCATION_ICON_STATUS_RED,
  SET_DOCTOR_ICON_STATUS_GREEN,
  SET_APPOINTMENT_ICON_STATUS_GREEN,
  SET_LOCATION_ICON_STATUS_GREEN,
  SET_ADDRESS_SELECTED,
  READY_TO_SAVE,
  TOGGLE_NEW_ADDRESS
} from './types';

import { mutations, redStatus } from './mutations';

import {
  mapSelectedDocAddress,
  mapUnselectedAddress,
  filterByUserDoc,
  filterLang,
  filterTreatment,
  filterTreatmentById,
  findByDocId,
  findByDay,
  reduceExptionDays,
  reduceBusyDays,
  mapDisableDates
} from './functionals';

const state = {
  appointment: {},
  treatments: [],
  treatmentSelectedAllLangs: [],
  addressSelected: {},
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
  UIaddresses: [],
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
  UIdoctorSelected: {},
  UIopenNewAddress: false
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
    commit(SET_ADDRESSES, []);
    commit(
      SET_ADDRESSES,
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
      const addresses = state.UIaddresses.map(mapUnselectedAddress)
        .filter(filterByUserDoc)
        .concat(doctor.address.map(mapSelectedDocAddress));

      commit(SET_TREATMENTS_FILTERED, treatmentsByLang);
      commit(SET_DOCTOR, doctor);
      commit(SET_ADDRESSES, addresses);
      commit(SET_DISABLE_DATES_TIMES, {});
      commit(SET_DISABLE_DATES, []);
      commit(SET_TREATMENT, []);
      commit(SET_DISABLE_TIMES, []);
      commit(SET_ADDRESS_SELECTED, {});

      actions.checkReadyToSave(commit);
    }
  },
  async loadDoctorSchedule({ commit }, id) {
    const treatment = state.treatments.find(filterTreatmentById(id));
    const doctorNextAppointments = await getDoctorNextAppointments(
      state.UIdoctorSelected.email
    );
    const doctorTimeSchedule = state.schedules.find(
      findByDocId(state.UIdoctorSelected.id)
    );
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
      const doctorTimeSchedule = state.schedules.find(
        findByDocId(state.UIdoctorSelected.id)
      );
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
      newAppointment.address = get(state, 'addressSelected', {});
      newAppointment.patient = actions.extractProfileAttb(session.user);
      newAppointment.doctor = actions.extractProfileAttb(
        state.UIdoctorSelected
      );
      newAppointment.treatment = state.treatmentSelectedAllLangs;
      newAppointment.status = RESERVED;
      newAppointment.allowReBooking = true;
      newAppointment.createddBy = get(session, 'user.id', EMPTY_STRING);
    } else {
      notifyError(dispatch, 'appointment.errors.requiredFields');
    }
  },
  commitAddressSelected({ commit }, { id }) {
    if (id === 'new') {
      commit(TOGGLE_NEW_ADDRESS, true);
    } else {
      const address = state.UIaddresses.find(item => item._id === id);
      commit(SET_ADDRESS_SELECTED, address);
      actions.checkReadyToSave(commit);
    }
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
      Object.keys(state.addressSelected).length
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
