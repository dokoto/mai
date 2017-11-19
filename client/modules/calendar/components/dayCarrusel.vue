<template>
  <section class="week-view box">
    <DayCarruselTrack v-for="(track, index) in groupOfMonths"
      :key="index"
      :track="track"
      v-bind:selectedDay="selectedDay"
      :colorClass="colorClass[index]"
      v-on:dayClick="handleDayClick" />
    <span class="end"></span>
  </section>
</template>

<script>
import DayCarruselTrack from './dayCarruselTrack.vue';
import calcMonthsAHeadFrom from '../../../app/utils';

export default {
  components: { DayCarruselTrack },
  props: ['dayNumber', 'monthNumber', 'year', 'numberOfMonths', 'selectedDay'],
  computed: {
    groupOfMonths() {
      return calcMonthsAHeadFrom(
        `${this.year}${this.monthNumber}${this.dayNumber}`,
        this.numberOfMonths,
      );
    },
  },
  data() {
    return {
      colorClass: ['monthColorOne', 'monthColorTwo', 'monthColorThree'],
    };
  },
  methods: {
    handleDayClick: function(ev) {
      this.$emit('dayClick', ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../app/app.scss';

.week-view {
  display: inline-flex;
  flex-direction: row;
  overflow: auto;
  padding: 2%;

  .end {
    min-width: 1px;
    background-color: white;
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
