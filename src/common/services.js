import * as paths from './paths';
import { getArrayDate } from './utils';

export function getNextSessions(userId) {
  return fetch(`${ paths.nextSessions }/${ userId }`).then(response => response.json());
}
export function getTherapies(therapyIds) {
  const queryParams = therapyIds
    ? therapyIds.reduce(
      (prev, curr, index) => (index === 0 ? prev + curr : `${ prev }&id=${ curr }`),
      '?id='
    )
    : null;
  return fetch(`${ paths.therapies }${ queryParams || '' }`).then(response => response.json());
}
export function getSession(sessionId) {
  return fetch(`${ paths.sessions }/${ sessionId }`).then(response => response.json());
}
export function getUser(type, id = '') {
  return fetch(`${ paths.users }/${ type }/${ id }`).then(response => response.json());
}
export function getUsersByType(type) {
  return fetch(`${ paths.users }/${ type }`).then(response => response.json());
}
export function getToDaySessions(selectedDay) {
  const [yearNumber, monthNumber, dayNumber] = getArrayDate(selectedDay);
  return fetch(`${ paths.Sessions }/${ yearNumber }/${ monthNumber }/${ dayNumber }`).then(response =>
    response.json());
}
export function getSessionTimeSchedule() {
  return fetch(`${ paths.SessionTimeSchedule }`).then(response => response.json());
}
export function getBusyDays(userId, initDate, numOfMonths) {
  return fetch(`${ paths.busyDays }/${ userId }/${ initDate }/${ numOfMonths }`).then(response => response.json());
}
export function getBusyTimes(userId, date) {
  return fetch(`${ paths.busyTimes }/${ userId }/${ date }`).then(response => response.json());
}
export function getBusyTherapists() {
  return fetch(`${ paths.busyTherapists }`).then(response => response.json());
}

