<template>
  <section class="week-view flex-row">
    <DayCarruselTrack v-for="(track, index) in groupOfMonths"
      :key="index"
      :track="track"
      :selectedDateProp="selectedDate"
      :disablesDates="disablesDates"
      :colorClass="colorClass[index]"
      @dayCarruselTrackDayClick="handleDayClick" />
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
    initDate: {
      type: String,
      default: '20180201',
    },
    numberOfMonths: {
      type: Number,
      default: 2,
    },
    selectedDate: {
      type: String,
      default: '20180208',
    },
    disablesDates: {
      type: Array,
      default: function() {
        return ['20180204', '20180220'];
      },
    },
  },
  computed: {
    groupOfMonths() {
      return calcMonthsAHeadFrom(this.initDate, this.numberOfMonths);
    },
  },
  data() {
    return {
      colorClass: ['monthColorOne', 'monthColorTwo', 'monthColorThree'],
    };
  },
  methods: {
    handleDayClick(newSelectedDate) {
      this.$emit('dayCarruselDayClick', newSelectedDate);
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
  border: solid 1px;
  border-radius: 5px;
  border-color: #ececec;

  .end {
    min-width: 1px;
    background-color: white;
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
