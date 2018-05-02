import { difference, get } from 'lodash';
import moment from 'moment';
import {
  DOCTOR
} from '@/common/constants';

export const mapSelectedDocAddress = item => ({
  ...item,
  type: DOCTOR,
  selected: true
});
export const mapUnselectedAddress = item => ({ ...item, selected: false });
export const filterByUserDoc = item => item.type !== DOCTOR;
export const filterLang = item => item.lang === window.glob.language;
export const filterTreatment = treatment => item => item.key === treatment.key;
export const filterTreatmentById = id => item => item.id === id;
export const findByDocId = id => item => item.doctor._id === id;
export const findByDay = day => item => item.day === day;
export const reduceExptionDays = doctorTimeSchedule => (curr, next) => {
  const day = moment(next).day();
  const execption = doctorTimeSchedule.exception.find(findByDay(day));
  return {
    ...curr,
    [next]: [...(curr[next] || []), ...get(execption, 'time', [])]
  };
};
export const reduceBusyDays = (curr, next) => {
  const date = moment(next.date).format('YYYYMMDD');
  return { ...curr, [date]: [...(curr[date] || []), next.time] };
};
export const mapDisableDates = doctorTimeSchedule => item => {
  const [date, time] = item;
  const day = moment(date).day();
  const timeScheduleByDay = doctorTimeSchedule.daily.find(
    schedule => schedule.day === day
  );
  return difference(timeScheduleByDay.time, time).length ? null : date;
};
