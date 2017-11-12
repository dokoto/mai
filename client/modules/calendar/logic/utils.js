import moment from 'moment';
import _ from 'lodash';

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
