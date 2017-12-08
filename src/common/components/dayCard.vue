<template>
  <aside class="day-of-month">
    <span class="day-number">{{ currDayNumber }}</span>
    <span class="day-name">{{ currDayName }}</span>
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
.day-of-month {
  color: white;
  position: absolute;
  top: 0;
  display: inline-flex;
  flex-direction: column;
  margin: 4%;
}

.day-number {
  text-align: center;
  font-size: 5em;
  font-weight: bold;
  width: 100%;
  margin-top: 4%;
  margin-left: 4%;
}

.day-name {
  text-align: center;
  font-size: 1.3em;
  width: 100%;
  margin-left: 4%;
}
</style>
