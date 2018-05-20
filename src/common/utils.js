import moment from 'moment';
import _ from 'lodash';
import { STATUS } from '@/common/api/constants';

import * as consts from './constants';

if (!window.glob || !window.glob.language) {
  window.glob = {
    language: 'es'
  };
}

moment.locale(window.glob.language.toLowerCase());

// NEW
export function notifyRestError(dispatch, response) {
  const message =
    response.status === STATUS.FAIL ? response.data.message : response.message;
  dispatch('app/show', message, { root: true });
}

export function notifyError(dispatch, message) {
  dispatch('app/show', message, { root: true });
}

export function numOfDaysAHead({ date = '20180101', months = 3 }) {
  return moment(date, consts.INT_DATE_FORMAT)
    .add(months, 'months')
    .diff(moment(date, consts.INT_DATE_FORMAT), 'days');
}

export function formatDateNumeric(date = new Date()) {
  return moment(date, consts.INT_DATE_FORMAT).format(consts.INT_DATE_FORMAT);
}

// OLD
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
      .toUpperCase()
  });
}

export function createDayAHeadArray(dateString, numOfMonthsAHead) {
  return _.range(
    moment(dateString, consts.INT_DATE_FORMAT)
      .add(numOfMonthsAHead, 'months')
      .diff(moment(dateString, consts.INT_DATE_FORMAT), 'days')
  );
}

export function formatDate(date = new Date()) {
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
export function calcMonthsAHeadFrom(dateString, numOfMonthsAHead) {
  return _.chain(createDayAHeadArray(dateString, numOfMonthsAHead))
    .map(mapCalendar(dateString))
    .groupBy('monthName')
    .toArray()
    .value();
}

export function calcDateAHeadFrom(dateString, numOfMonthsAHead) {
  return _.chain(createDayAHeadArray(dateString, numOfMonthsAHead))
    .map(item =>
      moment(dateString, consts.INT_DATE_FORMAT)
        .add(item, 'day')
        .format('YYYYMMDD')
    )
    .toArray()
    .value();
}

export function getArrayDate(selectedDay) {
  return [
    moment(selectedDay, consts.INT_DATE_FORMAT).format('YYYY'),
    moment(selectedDay, consts.INT_DATE_FORMAT).format('MM'),
    moment(selectedDay, consts.INT_DATE_FORMAT).format('DD')
  ];
}

export function findSessionById(id) {
  return item => _.get(item, 'id') === id;
}

export function findSessionByTime(time) {
  return item => _.get(item, 'time') === time;
}

export function findTherapyTexts(session) {
  return item => item.id === _.get(session, 'therapy', '');
}

/*
 * TERAPIA: therapy
 * TERAPIAS: therapies
 * -----------------------
 * TERAPEUTA: therapi
 * TERAPEUTAS: therapists
 */
export function generateAppointmentTable(
  schedule,
  sessions,
  selectedDay,
  therapys,
  therapists,
  userId
) {
  return schedule.map(session => {
    const sessionOccupy = _.find(sessions, findSessionByTime(session));
    const sessionTexts = _.find(therapys, findTherapyTexts(sessionOccupy));
    const sessionNameKey = `texts.${window.glob.language}.name`;
    const therapi = therapists.filter(
      item => item.id === _.get(sessionOccupy, 'therapist')
    );

    return {
      id: _.get(
        sessionOccupy,
        'id',
        `${session.replace(':', '')}-${selectedDay}-${userId}`
      ),
      time: _.get(sessionOccupy, 'date.time', session),
      therapy: _.get(sessionTexts, sessionNameKey, ''),
      therapi: _.get(therapi, '[0].name'),
      permisions: {
        view: _.get(sessionOccupy, 'id', false)
          ? userId === sessionOccupy.userId ||
            userId === sessionOccupy.therapist
          : true,
        cancelable: _.get(sessionOccupy, 'id', false)
          ? userId === sessionOccupy.userId ||
            userId === sessionOccupy.therapist
          : false,
        editable: _.get(sessionOccupy, 'id', false)
          ? userId === sessionOccupy.therapist
          : true
      },
      sessionOccupy
    };
  });
}

export function formatIntDate(yearNumber, monthNumber, dayNumber) {
  return moment(
    `${yearNumber}${monthNumber}${dayNumber}`,
    consts.INT_DATE_FORMAT
  ).format(consts.INT_DATE_FORMAT);
}

export function reduceTherapysByLanguage(prev, curr) {
  prev[curr.id] = curr.texts[window.glob.language];
  return prev;
}
