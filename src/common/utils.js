import moment from 'moment';
import _ from 'lodash';

import * as consts from '../common/constants';

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
  });
}

function createDayAHeadArray(dateString, numOfMonthsAHead) {
  return _.range(moment(dateString, consts.INT_DATE_FORMAT)
    .add(numOfMonthsAHead, 'months')
    .diff(moment(dateString, consts.INT_DATE_FORMAT), 'days'));
}

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

/**
 * Get a static image from google map
 * @param {object} center - { lat: number, lng: number }
 * @param {number} zoom - [1-18] view map zoom
 * @param {object} size - { witdh: number, height: number }
 * @param {string} key - Google Api key
 * @ref https://developers.google.com/maps/documentation/static-maps/?hl=es-419
 */
export function getStaticMapImage(center, zoom, size, key) {   
  const url = `${ consts.GOOGLE_STATIC_MAPS_URL }?center=${ center.lat },${
    center.lng
  }&zoom=${ zoom }&size=${ size.witdh }x${ size.height }&key=${ key }`;
  return fetch(url).then(response => response.json());
}
