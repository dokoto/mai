import { EMPTY_STRING, COMPLETE, UNCOMPLETE } from '@/common/constants';
import {
  faCheckCircle,
  faQuestionCircle
} from '@fortawesome/fontawesome-free-solid';

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

export const greeStatus = {
  icon: faCheckCircle,
  color: COMPLETE
};

export const redStatus = {
  icon: faQuestionCircle,
  color: UNCOMPLETE
};

export const mutations = {
  [APPOINTMENT_RECEIVED](currState, appointment) {
    currState.appointment = appointment;
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
  [SET_TREATMENTS_FILTERED](currState, treatmentsByLang) {
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
    currState.UItreatmentsShowOpen = name
      ? false
      : currState.UItreatmentsShowOpen;
    currState.UItreatmentSelected = name;
    currState.treatmentSelectedAllLangs = treatmentAllLangs;
  },
  [SET_ADDRESS_SELECTED](currState, address) {
    currState.addressSelected = address;
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
  [SET_ADDRESSES](currState, addresses = []) {
    currState.UIaddresses = addresses;
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
  },
  [TOGGLE_NEW_ADDRESS](currState, toggle) {
    currState.UIopenNewAddress = toggle;
  }
};
