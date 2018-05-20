<template>
  <!--
    hay que montar un carrusel con las citas que hay en el dia seleccionado. Se mueve con un swippe infinito
    Se añaden botones para editar y cancelar

  -->
  <article class="calendar-page container font-size">
    <HeaderCalendar :selectedDate="UISelectedDate" />
    <DayCarrusel id="day-carrusel"
                 :initDate="initDate"
                 :selectedDate="UISelectedDate"
                 :numberOfMonths="monthsAHead"
                 @dayCarruselDayClick="setNewDate"
                 class="box shrink-0" />

    <DayAppointmentCarousel :appointments="UIappointments" />
    <div class="flex-column flex-align-first-center margin-3x">
      <button class="button">{{ $t("appointment.actions.save") }}</button>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import { formatDateNumeric } from '@/common/utils';
import { MONTHS_AHEAD } from '@/common/constants';
import DayCarrusel from '@/common/components/DayCarrusel';
import HeaderCalendar from './components/header';
import DayAppointmentCarousel from './components/DayAppointmentCarousel';

export default {
  components: {
    HeaderCalendar,
    DayCarrusel,
    FontAwesomeIcon,
    DayAppointmentCarousel
  },
  data: function() {
    return {
      iconAdd: faPlusCircle,
      doctorMakedAsSelected: '',
      monthsAHead: MONTHS_AHEAD,
      initDate: formatDateNumeric()
    };
  },
  computed: {
    ...mapState('calendar', ['UISelectedDate', 'UIappointments']),
    tmpTreatment: function() {
      return this.UIappointments[0].treatment.filter(
        item => item.lang === window.glob.language
      )[0].name;
    }
  },
  methods: {
    ...mapActions('calendar', ['setNewDate'])
  },
  created() {
    this.$store.dispatch('calendar/init');
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';

.font-size {
  font-size: 6.2vw;
}
.calendar-page {
  position: relative;
  display: inline-flex;
  flex-direction: column;

  &.container {
    width: 100%;
    height: 100%;
  }

  .action {
    color: $colorBlue2;
  }

  .request {
    margin-bottom: 0.5em;
    .text {
      margin-left: 1.2em;
    }
  }
}
</style>
