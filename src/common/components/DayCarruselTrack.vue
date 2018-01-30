<template>
  <div class="month" :class="colorClass">
    <div class="month-box" v-for="(day, index) in track" :key="index" v-on:click="handleDayClick" :data-day-id="`${day.yearNumber}${day.monthNumber}${day.dayNumber}`">
      <span class="month-v-name" v-bind:class="monthColorClass" v-if="index === 0 || day.dayNumber == 1">{{ day.monthShotName.replace('.', '') }}</span>
      <div class="day-box" :class="{ daySelected: selectedDay === `${day.yearNumber}${day.monthNumber}${day.dayNumber}` }">
        <span class="day-name">{{ day.dayName.replace('.', '') }}</span>
        <span class="day-number">{{ day.dayNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

const state = {
  selectDayItem: null,
};

export default {
  props: ['track', 'colorClass', 'selectedDay'],
  data() {
    return {
      monthColorClass: this.colorClass,
    };
  },
  methods: {
    handleDayClick(ev) {
      const newSelectedDay = $(ev.currentTarget).attr('data-day-id');
      $(
        `[data-day-id="${state.selectDayItem || this.selectedDay}"] .day-box`,
      ).removeClass('daySelected');
      $(`[data-day-id="${newSelectedDay}"] .day-box`).addClass('daySelected');
      state.selectDayItem = newSelectedDay;
      this.$emit('dayCarruselTrackDayClick', ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.month {
  display: inline-flex;
  flex-direction: row;
  min-width: auto;
  margin-right: 1%;
  border-bottom: solid 7px;

  .month-box {
    display: inline-flex;
    flex-direction: row;
    color: $colorGrey2;
    width: 50px;
    height: 50px;
  }

  .month-v-name {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-weight: bold;
    font-size: 0.7em;
    color: $colorDarkGrey2;
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
    width: 50px;

    .day-name {
      font-size: 0.7em;
      text-align: center;
    }

    .day-number {
      font-size: 1.7em;
      text-align: center;
      padding: 0;
      margin: 0;
    }
  }
  .daySelected {
    color: crimson !important;
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
