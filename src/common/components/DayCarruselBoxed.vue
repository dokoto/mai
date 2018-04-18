<template>
  <div class="day-carrusel-container"
       :class="[ noBorder ? 'no-boxed' : 'boxed'  ]"
       :id="id">
    <InputBoxed :id="id"
                :placeHolder="placeHolder"
                :value="selectDateFormated"
                :icon="icon"
                :readOnly="readOnly"
                :noBorder="noBorder"
                v-on:handleInputBoxedClick="isOpen = !isOpen"
                class="map-autocomplete" />
    <transition name="fade"
                @before-enter="animateSlideDown"
                @leave="animateSlideUp"
                :css="false">
      <DayCarrusel v-show="isOpen"
                   :initDate="initDate"
                   :numberOfMonths="numberOfMonths"
                   :selectedDate="selectedDate"
                   :disablesDates="disablesDates"
                   v-on:dayCarruselDayClick="(newSelectedDate) => $emit('dayCarruselBoxed:dayClick', newSelectedDate)"
                   class="day-carrusel-wrapper" />
    </transition>
  </div>
</template>


<script>
import $ from 'jquery';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import InputBoxed from './InputBoxed';
import DayCarrusel from './DayCarrusel';
import { formatDate } from '../utils';
import * as consts from '../constants';

export default {
  components: {
    FontAwesomeIcon,
    DayCarrusel,
    InputBoxed
  },
  props: {
    id: {
      type: String,
      default: 'day-carrusel-boxed'
    },
    placeHolder: {
      type: String,
      default: 'Fake Date'
    },
    icon: {
      default: function() {
        return faPencilAlt;
      }
    },
    showOpen: {
      type: Boolean,
      default: false
    },
    initDate: {
      type: String
    },
    numberOfMonths: {
      type: Number,
      default: 2
    },
    selectedDate: {
      type: String
    },
    disablesDates: {
      type: Array,
      default: function() {
        return ['20180204', '20180220'];
      }
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      readOnly: true,
      isOpen: this.showOpen
    };
  },
  computed: {
    selectDateFormated() {
      return this.selectedDate
        ? formatDate(this.selectedDate)
        : consts.EMPTY_STRING;
    }
  },
  methods: {
    animateSlideDown(el) {
      $(el).slideDown('slow');
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', function() {
        done();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.day-carrusel-container {
  font-family: Arial, Tahoma, HelveticaNeue;
  &.boxed {
    border: solid 1px;
    border-radius: 5px;
    border-color: $colorGrey4;
  }
  &.no-boxed {
    border: solid 0px;
  }

  .day-carrusel-wrapper {
    width: 94%;
  }
}
</style>
