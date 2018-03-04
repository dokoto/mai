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
    <nav class="menu">
      <a :href="homeUrl">
        <img :src="homeIcon" class="icon-menu" />
      </a>
    </nav>
  </header>
</template>

<script>
import moment from 'moment';
import toDayIcon from '../../../../static/img/icon-today.png';
import homeIcon from '../../../../static/img/icon-home.png';
import * as consts from '../../../common/constants';

moment.locale(window.glob.language);

export default {
  props: ['userId', 'selectedDate'],
  computed: {
    yearMonth() {
      return `${ moment(this.selectedDate, consts.INT_DATE_FORMAT)
        .format('MMM')
        .toUpperCase().replace('.', '') } ${ moment(this.selectedDate, consts.INT_DATE_FORMAT).format('YYYY') }`;
    },
    dayName() {
      return moment(this.selectedDate, consts.INT_DATE_FORMAT)
        .format('dddd')
        .toUpperCase();
    },
    homeUrl() {
      return `${ /home/ }${ this.userId }`;
    },
  },
  data() {
    return {
      toDayIcon,
      homeIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../common/styles/base.scss';

.calendar-header {
  display: inline-flex;
  flex-direction: row;
  border-radius: 5px;

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

  .menu {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-right: 4%;
    a {
      margin-left: 8%;
    }

    .icon-menu {
      width: 20px;
    }
  }
}
</style>

