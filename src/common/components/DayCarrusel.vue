<template>
  <section class="week-view flex-row">
    <DayCarruselTrack v-for="(track, index) in groupOfMonths"
      :key="index"
      :track="track"
      :selectedDay="selectedDay"
      :colorClass="colorClass[index]"
      v-on:dayCarruselTrackDayClick="handleDayClick" />
    <span class="end"></span>
  </section>
</template>

<script>
import DayCarruselTrack from './DayCarruselTrack.vue';
import calcMonthsAHeadFrom from '../utils';

export default {
  components: { DayCarruselTrack },
  props: {
    id: {
      type: String,
      default: 'day-carrusel',
    },
    dayNumber: {
      type: String,
      default: '03',
    },
    monthNumber: {
      type: String,
      default: '02',
    },
    year: {
      type: String,
      default: '2018',
    },
    numberOfMonths: {
      type: Number,
      default: 2,
    },
    selectedDay: {
      type: String,
      default: '20180208',
    },
  },
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
    handleDayClick(ev) {      
      this.$emit('dayCarruselDayClick', ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.week-view {
  font-family: Arial, Tahoma, HelveticaNeue;
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
