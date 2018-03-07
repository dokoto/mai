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
        <font-awesome-icon :icon="icon" size="2x" color="#848181"/>
      </a>
    </nav>
  </header>
</template>

<script>
import moment from 'moment';
import toDayIcon from '../../../../static/img/icon-today.png';
import homeIcon from '../../../../static/img/icon-home.png';
import * as consts from '../../../common/constants';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faHome } from '@fortawesome/fontawesome-free-solid';

moment.locale(window.glob.language);

export default {
  props: ['userId', 'selectedDate'],
  components: {
    FontAwesomeIcon,
  },
  computed: {
    yearMonth() {
      return `${ moment(this.selectedDate, consts.INT_DATE_FORMAT)
        .format('MMMM')
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
      icon: faHome,
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
  }

  icon-color {
    color: $colorDarkGrey1;
  }
}
</style>

