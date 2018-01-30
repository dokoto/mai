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
    <TableAppointment v-if="toDaySessions.length > 0"
      v-bind:selectedDay="selectedDay"
      v-bind:toDaySessions="toDaySessions"
      v-on:sessionClick="handleSessionClick" />
    <transition name="modal">
      <DialogSession v-if="newAppointment.isDialogOpen"
        v-bind:timeSelected="newAppointment.timeSelected"
        v-bind:daySelected="newAppointment.daySelected"
        v-bind:session="newAppointment.session"
        v-bind:therapists="newAppointment.therapists"
        v-bind:therapies="newAppointment.therapies"
        v-on:dialogCancel="handleDialogCancel"
        v-on:dialogAcept="handleDialogAcept" />
    </transition>
    <OpacityLayer v-bind:active="newAppointment.isDialogOpen" />
  </article>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';
import { formatIntDate } from '../../common/utils';
import HeaderCalendar from './components/header.vue';
import DayCarrusel from './components/DayCarrusel.vue';
import TableAppointment from './components/tableAppointment.vue';
import DialogSession from './components/dialogSession.vue';
import OpacityLayer from '../../common/components/opacityLayer.vue';

const numberOfMonths = 2;
export default {
  components: {
    HeaderCalendar,
    DayCarrusel,
    TableAppointment,
    DialogSession,
    OpacityLayer,
  },
  computed: {
    ...mapGetters({
      toDaySessions: 'calendar/toDaySessions',
      selectedDay: 'calendar/selectedDay',
      newAppointment: 'calendar/newAppointment',
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
    handleDayClick(ev) {
      ev.preventDefault();
      this.$store.dispatch(
        'calendar/changeDay',
        $(ev.currentTarget).attr('data-day-id')
      );
    },
    handleSessionClick(ev) {
      ev.preventDefault();
      this.$store.dispatch('calendar/createAppointment', {
        router: this.$router,
        id: ev.currentTarget.id,
        daySelected: $(ev.currentTarget).attr('data-selectedday'),
        timeSelected: $(ev.currentTarget).attr('data-time'),
      });
    },
    handleDialogCancel() {
      this.$store.dispatch(
        'calendar/cancelAppointment',
        this.$route.params.userId
      );
    },
    handleDialogAcept() {},
  },
  created() {
    this.$store.dispatch('calendar/setUserId', this.$route.params.userId);
    this.$store.dispatch(
      'calendar/getToDaySessions',
      this.selectedDay ||
        formatIntDate(
          this.$route.params.year,
          this.$route.params.month,
          this.$route.params.day
        )
    );
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

  &.bg-beach {
    background-image: url('../../../static/img/app-bg.jpeg');
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
