<template>
    <div class="day-carrusel-container" :id="id">
    <InputBoxed :id="id"
      :placeHolder="placeHolder"
      :value="selectDateFormated"
      :icon="icon"
      :readOnly="readOnly"
      v-on:handleInputBoxedClick="handleShowDays"
      class="map-autocomplete" />
      <transition name="fade"
        @before-enter="animateSlideDown"
        @leave="animateSlideUp"
        :css="false">
        <DayCarrusel v-show="isOpen" :dayNumber="dayNumber" :monthNumber="monthNumber" :year="year" :numberOfMonths="numberOfMonths" :selectedDay="SelectedDate" v-on:dayCarruselDayClick="handleDayClick" />
    </transition>
  </div>
</template>


<script>
import $ from 'jquery';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import InputBoxed from './InputBoxed.vue';
import DayCarrusel from './DayCarrusel.vue';
import { formatDate } from '../utils';

export default {
  components: {
    FontAwesomeIcon,
    DayCarrusel,
    InputBoxed,
  },
  props: {
    id: {
      type: String,
      default: 'day-carrusel-boxed',
    },
    placeHolder: {
      type: String,
      default: 'Fake Date',
    },
    icon: {
      default: function() {
        return faPencilAlt;
      },
    },
    showOpen: {
      type: Boolean,
      default: false,
    },
    dayNumber: {
      type: String,
      default: '03',
    },
    monthNumber: {
      type: String,
      default: '02',
    },
    year: {
      type: String,
      default: '2018',
    },
    numberOfMonths: {
      type: Number,
      default: 2,
    },
    SelectedDateProp: {
      type: String,
      default: '20180208',
    },
  },
  data() {
    return {
      readOnly: true,
      isOpen: this.showOpen,
      SelectedDateData: formatDate(this.SelectedDateProp),
    };
  },
  computed: {
    selectDateFormated() {
      return formatDate(this.SelectedDateData);
    }
  },
  methods: {
    handleShowDays() {
      this.isOpen = !this.isOpen;
    },
    handleDayClick(ev) {
      this.SelectedDateData = formatDate($(ev.currentTarget).attr('data-day-id'));      
      this.$emit('dayCarruselBoxed:dayClick', ev);
    },
    animateSlideDown(el) {
      $(el).slideDown('slow');
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', function() {
        done();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.day-carrusel-container {
  font-family: Arial, Tahoma, HelveticaNeue;
  border: solid 1px;
  border-color: #ececec;
}
</style>
