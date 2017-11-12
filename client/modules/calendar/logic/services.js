import fetch from 'isomorphic-fetch';
import * as paths from './paths';
import { getArrayDate } from './utils';

export default {
  getToDaySessions(selectedDay) {
    const [yearNumber, monthNumber, dayNumber] = getArrayDate(selectedDay);
    return fetch(`${paths.Sessions}/${yearNumber}/${monthNumber}/${dayNumber}`)
      .then(response => response.json());
  },
  getSessionSchedule() {
    return fetch(`${paths.SessionsSchedule}`).then(response => response.json());
  },
};
