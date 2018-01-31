import moment from 'moment';
import _ from 'lodash';

import * as consts from './constants';

if (!window.glob || !window.glob.language) {
  window.glob = {
    language: 'es',
  };
}

moment.locale(window.glob.language.toLowerCase());

function mapCalendar(dateString) {
  return currentDay => ({
    dayNumber: moment(dateString, consts.INT_DATE_FORMAT)
      .add(currentDay, 'day')
      .format('DD'),
    dayName: moment(dateString, consts.INT_DATE_FORMAT)
      .add(currentDay, 'day')
      .format('ddd')
      .toUpperCase(),
    monthName: moment(dateString, consts.INT_DATE_FORMAT)
      .add(currentDay, 'day')
      .format('MMMM')
      .toUpperCase(),
    monthShotName: moment(dateString, consts.INT_DATE_FORMAT)
      .add(currentDay, 'day')
      .format('MMM')
      .toUpperCase(),
    monthNumber: moment(dateString, consts.INT_DATE_FORMAT)
      .add(currentDay, 'day')
      .format('MM')
      .toUpperCase(),
    yearNumber: moment(dateString, consts.INT_DATE_FORMAT)
      .add(currentDay, 'day')
      .format('YYYY')
      .toUpperCase(),
    fullDate: moment(dateString, consts.INT_DATE_FORMAT)
      .add(currentDay, 'day')
      .format('YYYYMMDD')
      .toUpperCase(),
  });
}

function createDayAHeadArray(dateString, numOfMonthsAHead) {
  return _.range(moment(dateString, consts.INT_DATE_FORMAT)
    .add(numOfMonthsAHead, 'months')
    .diff(moment(dateString, consts.INT_DATE_FORMAT), 'days'));
}

export function formatDate(date) {
  return moment(date, consts.INT_DATE_FORMAT)
    .format('dddd DD MMMM YYYY')
    .toUpperCase();
}

export function addMinutes(time, minutesToAdd) {
  return moment(time, 'HH:mm')
    .add(minutesToAdd, 'm')
    .format('HH:mm');
}

/**
 *
 * @param {*} dateString
 * @param {*} numOfMonthsAHead
 * @returns {Array} A month by item with this structure: {dayNumber: '03', dayName: 'SAB', monthName: 'FEBRERO', monthNumber: '02', monthShotName:'FEB', yearNumber: '2018'}
 */
export default function calcMonthsAHeadFrom(dateString, numOfMonthsAHead) {
  return _.chain(createDayAHeadArray(dateString, numOfMonthsAHead))
    .map(mapCalendar(dateString))
    .groupBy('monthName')
    .toArray()
    .value();
}

export function getArrayDate(selectedDay) {
  return [
    moment(selectedDay, consts.INT_DATE_FORMAT).format('YYYY'),
    moment(selectedDay, consts.INT_DATE_FORMAT).format('MM'),
    moment(selectedDay, consts.INT_DATE_FORMAT).format('DD'),
  ];
}

export function findSessionById(id) {
  return item => _.get(item, 'id') === id;
}

export function findSessionByTime(time) {
  return item => _.get(item, 'date.time') === time;
}

export function findTherapyTexts(session) {
  return item => item.id === _.get(session, 'therapy.id', '');
}

export function generateAppointmentTable(schedule, sessions, selectedDay, therapys, userId) {
  return schedule.map(session => {
    const sessionOccupy = _.find(sessions, findSessionByTime(session));
    const sessionTexts = _.find(therapys, findTherapyTexts(sessionOccupy));
    const sessionNameKey = `texts.${ window.glob.language }.name`;

    return {
      id: _.get(sessionOccupy, 'id', `${ session.replace(':', '') }-${ selectedDay }-${ userId }`),
      time: _.get(sessionOccupy, 'date.time', session),
      name: _.get(sessionTexts, sessionNameKey, ''),
      permisions: {
        view: _.get(sessionOccupy, 'id', false)
          ? userId === sessionOccupy.userId || userId === sessionOccupy.therapist.id
          : true,
        cancelable: _.get(sessionOccupy, 'id', false)
          ? userId === sessionOccupy.userId || userId === sessionOccupy.therapist.id
          : false,
        editable: _.get(sessionOccupy, 'id', false) ? userId === sessionOccupy.therapist.id : true,
      },
      sessionOccupy,
    };
  });
}

export function formatIntDate(yearNumber, monthNumber, dayNumber) {
  return moment(`${ yearNumber }${ monthNumber }${ dayNumber }`, consts.INT_DATE_FORMAT).format(consts.INT_DATE_FORMAT);
}

export function reduceTherapysByLanguage(prev, curr) {
  prev[curr.id] = curr.texts[window.glob.language];
  return prev;
}
