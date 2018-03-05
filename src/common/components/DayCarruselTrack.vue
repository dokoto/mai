<template>
  <div class="month" :class="colorClass">
    <div class="month-box" v-for="(day, index) in track" :key="index" 
      @click="handleDayClick" 
      :data-day-id="`${day.fullDate}`"
      :class="{ dayDisable: disablesDates.includes(`${day.fullDate}`) }" >
      <span class="month-v-name" v-bind:class="monthColorClass" v-if="index === 0 || day.dayNumber == 1">{{ day.monthShotName.replace('.', '') }}</span>
      <div class="day-box" 
        :class="{ daySelected: !disablesDates.includes(`${day.fullDate}`) && selectDateFormated === `${day.fullDate}` }">
        <span class="day-name">{{ day.dayName.replace('.', '') }}</span>
        <span class="day-number">{{ day.dayNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

const state = {
  selectedDate: null,
};

export default {
  props: {
    track: {
      type: Array,
      defaul: function() {
        return [
          {
            dayName: 'SÁB.',
            dayNumber: '03',
            monthName: 'FEBRERO',
            monthNumber: '02',
            monthShotName: 'FEB.',
            yearNumber: '2018',
          },
        ];
      },
    },
    disablesDates: {
      type: Array,
      default: function() {
        return ['20180204', '20180220'];
      },
    },
    colorClass: {
      type: String,
      default: 'monthColorOne',
    },
    selectedDateProp: {
      type: String,
      default: '06012018',
    },
  },
  data() {
    return {
      monthColorClass: this.colorClass,
      //selectedDate: this.selectedDateProp
    };
  },
  computed: {
    selectDateFormated() {
      return this.selectedDateProp;
    }
  },
  methods: {
    handleDayClick(ev) {
      const newSelectedDate = $(ev.currentTarget).attr('data-day-id');
      $(
        `[data-day-id="${state.selectedDate || this.selectedDate}"] .day-box`,
      ).removeClass('daySelected');
      $(`[data-day-id="${newSelectedDate}"] .day-box`).addClass('daySelected');
      state.selectedDate = newSelectedDate;
      this.$emit('dayCarruselTrackDayClick', newSelectedDate);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

$month-box-h: 4.375em;
$month-box-w: 4.375em;
$vertial-month-font-size: 0.9em;
$day-box-w: 4.375em;
$day-name-font-size: 1.2em;
$day-number-font-size: 2.2em;
$border-bottom-size: 0.4em;

.month {
  display: inline-flex;
  flex-direction: row;
  min-width: auto;
  margin-right: 1%;
  border-bottom: solid $border-bottom-size;

  .month-box {
    display: inline-flex;
    flex-direction: row;
    color: $colorGrey2;
    padding-bottom: 0.5em;
  }

  .month-v-name {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-weight: bold;
    font-size: $vertial-month-font-size;
    color: $colorDarkGrey2;
    padding: 0.1em;
    .hide {
      visibility: hidden;
    }
  }
  .monthColorOne {
    background-color: $colorPastelOrange;
  }
  .monthColorTwo {
    background-color: $colorPastelPink;
  }
  .monthColorThree {
    background-color: $colorPastelBlue;
  }

  .day-box {
    display: inline-flex;
    flex-direction: column;
    color: $colorDarkGrey1;
    width: $day-box-w;

    .day-name {
      font-size: $day-name-font-size;
      text-align: center;
    }

    .day-number {
      font-size: $day-number-font-size;
      text-align: center;
      padding: 0;
      margin: 0;
    }
  }
  .daySelected {
    color: crimson !important;
  }
  .dayDisable {
    text-decoration: line-through;
    pointer-events: none;
    color: black;
  }
}
.monthColorOne {
  border-bottom-color: $colorPastelOrange;
}
.monthColorTwo {
  border-bottom-color: $colorPastelPink;
}
.monthColorThree {
  border-bottom-color: $colorPastelBlue;
}
</style>
