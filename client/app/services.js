import * as paths from './paths';
import { getArrayDate } from './utils';

export default {
  getNextSessions(userId) {
    return fetch(`${paths.nextSessions}/${userId}`).then(response => response.json());
  },
  getTherapies(therapyIds) {
    const queryParams = therapyIds
      ? therapyIds.reduce(
        (prev, curr, index) => (index === 0 ? prev + curr : `${prev}&id=${curr}`),
        '?id=',
      )
      : null;
    return fetch(`${paths.therapies}${queryParams || ''}`).then(response => response.json());
  },
  getSession(sessionId) {
    return fetch(`${paths.sessions}/${sessionId}`).then(response => response.json());
  },
  getUser(type, id) {
    return fetch(`${paths.users}/${type}/${id || ''}`).then(response => response.json());
  },
  getToDaySessions(selectedDay) {
    const [yearNumber, monthNumber, dayNumber] = getArrayDate(selectedDay);
    return fetch(`${paths.Sessions}/${yearNumber}/${monthNumber}/${dayNumber}`).then(response =>
      response.json());
  },
  getSessionSchedule() {
    return fetch(`${paths.SessionsSchedule}`).then(response => response.json());
  },
};
