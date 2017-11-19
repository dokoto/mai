<template>
  <article class="calendar-page container bg-beach">
    <HeaderCalendar :userId="userId"
      v-bind:selectedDay="selectedDay" />
    <DayCarrusel :dayNumber="dayNumber"
      :monthNumber="monthNumber"
      :year="year"
      :numberOfMonths="numberOfMonths"
      v-bind:selectedDay="selectedDay"
      v-on:dayClick="handleDayClick" />
    <TableAppointment v-if="sessions.length > 0"
      v-bind:selectedDay="selectedDay"
      v-bind:sessions="sessions"
      v-on:sessionClick="handleSessionClick" />
    <transition name="modal">
      <DialogSession v-if="saveSession.open"
        v-bind:timeSelected="saveSession.timeSelected"
        v-bind:daySelected="saveSession.daySelected"
        v-bind:session="saveSession.session"
        v-bind:therapists="saveSession.therapists"
        v-bind:therapies="saveSession.therapies" />
    </transition>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderCalendar from './components/header.vue';
import DayCarrusel from './components/dayCarrusel.vue';
import TableAppointment from './components/tableAppointment.vue';
import DialogSession from './components/dialogSession.vue';

const numberOfMonths = 2;
export default {
  components: { HeaderCalendar, DayCarrusel, TableAppointment, DialogSession },
  computed: {
    ...mapGetters({
      sessions: 'calendar/scheduleTable',
      selectedDay: 'calendar/selectedDay',
      saveSession: 'calendar/saveSession',
    }),
  },
  data() {
    return {
      userId: this.$route.params.userId,
      dayNumber: this.$route.params.day,
      monthNumber: this.$route.params.month,
      year: this.$route.params.year,
      numberOfMonths,
    };
  },
  methods: {
    handleDayClick: function(ev) {
      ev.preventDefault();
      this.$store.dispatch(
        'calendar/changeDay',
        $(ev.currentTarget).attr('data-day-id'),
      );
    },
    handleSessionClick: function(ev) {
      ev.preventDefault();
      this.$store.dispatch('calendar/saveSession', {
        router: this.$router,
        sessions: this.sessions,
        id: ev.currentTarget.id,
        daySelected: $(ev.currentTarget).attr('data-selectedday'),
        timeSelected: $(ev.currentTarget).attr('data-time'),
      });
    },
  },
  created() {
    this.$store.dispatch('calendar/setUserId', this.$route.params.userId);
    this.$store.dispatch(
      'calendar/getToDaySessions',
      this.selectedDay ||
        `${this.$route.params.year}${this.$route.params.month}${this.$route
          .params.day}`,
    );
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
