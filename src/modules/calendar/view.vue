<template>
  <article class="calendar-page container bg-beach">
    <Header :userId="userId" />
    <DayCarrusel :dayNumber="dayNumber" :monthNumber="monthNumber" :year="year" :numberOfWeeks="numberOfWeeks" />
    <TableAppointment :dayNumber="dayNumber" :monthNumber="monthNumber" :year="year" />
  </article>
</template>

<script>
import Header from './components/header.vue';
import DayCarrusel from './components/dayCarrusel.vue';
import TableAppointment from './components/tableAppointment.vue';

export default {
  components: { Header, DayCarrusel, TableAppointment },
  data() {
    return {
      userId: this.$route.params.userId,
      dayNumber: this.$route.params.day,
      monthNumber: this.$route.params.month,
      year: this.$route.params.year,
      numberOfWeeks: 3,
    };
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
