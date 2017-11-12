import moment from 'moment';
import _ from 'lodash';
import uuid from 'uuid/v4';

moment.locale(LANGUAGE);

function mapCalendar(dateString) {
  return (currentDay) => {
    return {
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
    };
  };
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
    moment(selectedDay)
      .format('YYYY'),
    moment(selectedDay)
      .format('MM'),
    moment(selectedDay)
      .format('DD'),
  ];
}

export function generateAppointmentTable(schedule, sessions, selectedDay, userId) {
  const tt = schedule.map((session) => {
    const sessionOccupy = _.find(sessions, item => item.date.time === session);
    return {
      id: _.get(sessionOccupy, 'id', `${session}-${selectedDay}-${userId}`),
      time: _.get(sessionOccupy, 'date.time', session),
      name: _.get(sessionOccupy, 'therapy.name', ''),
      isSessionAvailable: !sessionOccupy,
      sessionOccupy,
    };
  });
  return tt;
}
