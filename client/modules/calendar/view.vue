<template>
  <article class="calendar-page container bg-beach">
    <HeaderCalendar :userId="userId" v-bind:selectedDay="selectedDay" />
    <DayCarrusel :dayNumber="dayNumber" :monthNumber="monthNumber" :year="year" :numberOfMonths="numberOfMonths" v-bind:selectedDay="selectedDay" v-on:dayClick="handleDayClick" />
    <TableAppointment v-if="sessions.length > 0" v-bind:selectedDay="selectedDay" v-bind:sessions="sessions" v-on:sessionClick="handleSessionClick" />
  </article>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import HeaderCalendar from './components/header.vue';
import DayCarrusel from './components/dayCarrusel.vue';
import TableAppointment from './components/tableAppointment.vue';
import { findSessionById } from '../../app/utils';

const numberOfMonths = 2;
export default {
  components: { HeaderCalendar, DayCarrusel, TableAppointment },
  computed: mapGetters({
    sessions: 'calendar/scheduleTable',
  }),
  data() {
    return {
      userId: this.$route.params.userId,
      dayNumber: this.$route.params.day,
      monthNumber: this.$route.params.month,
      year: this.$route.params.year,
      selectedDay:
        this.$store.getters['calendar/selectedDay'] ||
        `${this.$route.params.year}${this.$route.params.month}${this.$route
          .params.day}`,
      numberOfMonths,
    };
  },
  methods: {
    handleDayClick: function(ev) {
      this.selectedDay = $(ev.currentTarget).attr('data-day-id');
      this.$store.dispatch('calendar/getToDaySessions', this.selectedDay);
    },
    handleSessionClick: function(ev) {
      const sessionSelected = _.find(
        this.sessions,
        findSessionById(ev.currentTarget.id),
      );
      const permisions = _.get(sessionSelected, 'permisions');
      if (permisions.editable) {
        // Action on editable session
      } else if (permisions.view) {
        this.$router.push({
          name: 'session',
          params: { sessionId: ev.currentTarget.id },
        });
      }
    },
  },
  created() {
    this.$store.dispatch('calendar/setUserId', this.$route.params.userId);
    this.$store.dispatch('calendar/getToDaySessions', this.selectedDay);
  },
};
</script>

<style lang="scss" scoped>
@import '../../app/app.scss';

.calendar-page {
  position: relative;
  display: inline-flex;
  flex-direction: column;

  &.container {
    width: 100%;
    height: 100%;
  }

  &.bg-beach {
    background-image: url('../../app/assets/img/app-bg.jpeg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}
</style>
