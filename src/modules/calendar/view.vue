<template>
  <article class="calendar-page container">
    <HeaderCalendar :userId="userId"
      :selectedDate="selectedDate" />
    <DayCarrusel id="day-carrusel"
      :initDate="initDate"
      :selectedDate="selectedDate"
      :numberOfMonths="numberOfMonths"
      @dayCarruselDayClick="handleDayClick"
      class="box shrink-0" />
    <TableAppointment v-if="toDaySessions.length > 0"
      :selectedDay="selectedDate"
      :toDaySessions="toDaySessions"
      @sessionClick="handleSessionClick" />
  </article>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapState } from 'vuex';
import HeaderCalendar from './components/header.vue';
import DayCarrusel from '../../common/components/DayCarrusel.vue';
import TableAppointment from './components/tableAppointment.vue';

export default {
  components: {
    HeaderCalendar,
    DayCarrusel,
    TableAppointment,
  },
  computed: {
    ...mapGetters({
      toDaySessions: 'calendar/toDaySessions',
    }),
    ...mapState('calendar', {
      numberOfMonths: state => state.numberOfMonths,
      selectedDate: state => state.selectedDate,
      userId: state => state.userId,
      initDate: state => state.initDate,
    }),
  },
  methods: {
    handleDayClick(newSelectedDate) {
      this.$store.dispatch('calendar/changeDay', newSelectedDate);
      this.$store.dispatch('calendar/getToDaySessions');
    },
    handleSessionClick(ev) {
      ev.preventDefault();
      this.$router.push({
        name: 'sessionEdit',
        params: {
          date: $(ev.currentTarget).attr('data-selectedday'),
          time: $(ev.currentTarget).attr('data-time'),
        },
      });
    },
  },
  created() {
    this.$store.dispatch('calendar/initDate');
    this.$store.dispatch('calendar/setUserId', this.$route.params.userId);
    this.$store.dispatch('calendar/getToDaySessions');
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';

.calendar-page {
  position: relative;
  display: inline-flex;
  flex-direction: column;

  &.container {
    width: 100%;
    height: 100%;
  }
}
</style>
