<template>
  <aside class="day-of-month flex-row">
    <div class="flex-column day-col">
      <span class="day-number">{{ currDayNumber }}</span>
      <span class="day-name">{{ currDayName }}</span>
    </div>
  </aside>
</template>

<script>
import moment from 'moment';

moment.locale(window.glob.language);

export default {
  computed: {
    currDayNumber() {
      return moment().format('D');
    },
    currDayName() {
      return moment()
        .format('dddd')
        .toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
.day-of-month {
  color: white;

  .day-col {
    margin-left: 3%;
    margin-bottom: 10%;

    .day-number {
      text-align: center;
      font-size: 5em;
      font-weight: bold;
    }

    .day-name {
      text-align: center;
      font-size: 1.3em;
    }
  }
}
</style>
