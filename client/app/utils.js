import moment from 'moment';
import _ from 'lodash';

moment.locale(LANGUAGE);

function mapCalendar(dateString) {
  return currentDay => ({
    dayNumber: moment(dateString)
      .add(currentDay, 'day')
      .format('DD'),
    dayName: moment(dateString)
      .add(currentDay, 'day')
      .format('ddd')
      .toUpperCase(),
    monthName: moment(dateString)
      .add(currentDay, 'day')
      .format('MMMM')
      .toUpperCase(),
    monthShotName: moment(dateString)
      .add(currentDay, 'day')
      .format('MMM')
      .toUpperCase(),
    monthNumber: moment(dateString)
      .add(currentDay, 'day')
      .format('MM')
      .toUpperCase(),
    yearNumber: moment(dateString)
      .add(currentDay, 'day')
      .format('YYYY')
      .toUpperCase(),
  });
}

function createDayAHeadArray(dateString, numOfMonthsAHead) {
  return _.range(moment(dateString)
    .add(numOfMonthsAHead, 'months')
    .diff(moment(dateString), 'days'));
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
    moment(selectedDay).format('YYYY'),
    moment(selectedDay).format('MM'),
    moment(selectedDay).format('DD'),
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
  return schedule.map((session) => {
    const sessionOccupy = _.find(sessions, findSessionByTime(session));
    const sessionTexts = _.find(therapys, findTherapyTexts(sessionOccupy));
    const sessionNameKey = `texts.${LANGUAGE}.name`;

    return {
      id: _.get(sessionOccupy, 'id', `${session}-${selectedDay}-${userId}`),
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

export function reduceTherapysByLanguage(prev, curr) {
  prev[curr.id] = curr.texts[LANGUAGE];
  return prev;
}
