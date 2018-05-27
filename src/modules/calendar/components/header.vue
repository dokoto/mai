<template>
  <header class="calendar-header box">
    <section class="today-view">
      <span class="month-year">
        {{ yearMonth }}
      </span>
      <span class="day-name">
        {{ dayName }}
      </span>
    </section>
    <nav class="back"
         @click="$router.go(-1)">
      <font-awesome-icon :icon="iconBack"
                         color="#2196f3"
                         size="2x" />
    </nav>
  </header>
</template>

<script>
import moment from 'moment';
import { INT_DATE_FORMAT } from '@/common/constants';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/fontawesome-free-regular';
import toDayIcon from '../../../../static/img/icon-today.png';

moment.locale(window.glob.language);

export default {
  props: ['userId', 'selectedDate'],
  components: {
    FontAwesomeIcon
  },
  computed: {
    yearMonth() {
      return `${moment(this.selectedDate, INT_DATE_FORMAT)
        .format('MMMM')
        .toUpperCase()
        .replace('.', '')} ${moment(this.selectedDate, INT_DATE_FORMAT).format(
        'YYYY'
      )}`;
    },
    dayName() {
      return moment(this.selectedDate, INT_DATE_FORMAT)
        .format('dddd')
        .toUpperCase();
    }
  },
  data() {
    return {
      toDayIcon,
      iconBack: faArrowAltCircleLeft
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../../common/styles/base.scss';

.calendar-header {
  display: inline-flex;
  flex-direction: row;
  border-radius: 5px;
  flex-shrink: 0;

  .today-view {
    display: inline-flex;
    flex-direction: column;
    padding: 2%;
  }

  .today-view .month-year {
    font-size: 0.8em;
    color: crimson;
    font-weight: bold;
    margin-bottom: 0.2em;
  }

  .today-view .day-name {
    font-size: 1.7em;
    font-weight: bold;
    color: crimson;
  }

  .back {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-right: 4%;
    a {
      margin-left: 8%;
    }
  }

  icon-color {
    color: $colorDarkGrey1;
  }
}
</style>

