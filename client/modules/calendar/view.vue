<template>
  <article class="calendar-page container bg-beach">
    <HeaderCalendar 
      :userId="userId"
      v-bind:selectedDay="selectedDay" />
    <DayCarrusel 
      :dayNumber="dayNumber" 
      :monthNumber="monthNumber" 
      :year="year" 
      :numberOfMonths="numberOfMonths" 
      v-bind:selectedDay="selectedDay"
      v-on:dayClick="handleDayClick" />
    <TableAppointment :dayNumber="dayNumber" :monthNumber="monthNumber" :year="year" />
  </article>
</template>

<script>
import HeaderCalendar from './components/header.vue';
import DayCarrusel from './components/dayCarrusel.vue';
import TableAppointment from './components/tableAppointment.vue';

const numberOfMonths = 2;
export default {
  components: { HeaderCalendar, DayCarrusel, TableAppointment },
  data() {
    return {
      userId: this.$route.params.userId,
      dayNumber: this.$route.params.day,
      monthNumber: this.$route.params.month,
      year: this.$route.params.year,
      selectedDay: `${this.$route.params.year}${this.$route.params.month}${this.$route.params.day}`,
      numberOfMonths,
    };
  },
  methods: {
    handleDayClick: function (ev) {
      this.selectedDay = $(ev.currentTarget).attr('data-day-id');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../app/app.scss";

.calendar-page {
  position: relative;
  display: inline-flex;
  flex-direction: column;

  &.container {
    width: 100%;
    height: 100%;
  }

  &.bg-beach {
    background-image: url("../../app/assets/img/app-bg.jpeg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

}
</style>
