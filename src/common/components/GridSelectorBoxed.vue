<template>
  <div class="grid-selector-container" :id="id">
    <InputBoxed :id="id"
      :placeHolder="placeHolder"
      :value="itenSelectedFormated"
      :icon="icon"
      :readOnly="readOnly"
      v-on:handleInputBoxedClick="handleShowItems"
      class="map-autocomplete" />
      <transition name="fade"
        @before-enter="animateSlideDown"
        @leave="animateSlideUp"
        :css="false">
        <ul class="grid-items" v-show="isOpen">
          <li class="grid-item" v-for="item in items" 
            :key="item" 
            v-on:click="handleChangeSelected" 
            :class="{ 'grid-item-disable': disableItems.includes(item), 'grid-item-selected': item === itemSelectedValue }">{{ item }}</li>
        </ul>
    </transition>
  </div>  
</template>

<script>
import $ from 'jquery';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import InputBoxed from './InputBoxed.vue';
import { addMinutes } from '../utils';

export default {
  components: {
    FontAwesomeIcon,
    InputBoxed,
  },
  props: {
    id: {
      type: String,
      default: 'grid-selector-boxed',
    },
    placeHolder: {
      type: String,
      default: 'Fake Title',
    },
    icon: {
      default: function() {
        return faPencilAlt;
      },
    },
    itemSelected: {
      type: String,
      default: '10:00',
    },
    items: {
      type: Array,
      default: function() {
        return ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00', '20:30'];
      },
    },
    disableItems: {
      type: Array,
      default: function() {
        return ['17:30', '20:30'];
      },
    },
    showOpen: {
      type: Boolean,
      default: false,
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: String,
      default: '45',
    },
  },
  data() {
    return {
      isOpen: this.showOpen,
      itemSelectedValue: this.itemSelected,
      readOnly: true,
    };
  },
  computed: {
    itenSelectedFormated() {
      const finished = addMinutes(this.itemSelectedValue, this.interval);
      return `${this.itemSelectedValue} >> ${finished}`;
    },
  },
  methods: {
    handleShowItems(ev) {
      this.isOpen = !this.isOpen;
    },
    animateSlideDown(el) {
      $(el).slideDown('slow');
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', function() {
        done();
      });
    },
    handleChangeSelected(ev) {
      if (!this.multiSelect) {
        $('li.grid-item').removeClass('grid-item-selected');
      }
      $(ev.currentTarget).toggleClass('grid-item-selected');
      this.itemSelectedValue = $(ev.currentTarget).text();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.grid-selector-container {
  font-family: Arial, Tahoma, HelveticaNeue;
  .grid-items {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto auto;
    padding: 0;
    margin: 0;
    border: solid 1px;
    border-color: $colorGrey3;
    .grid-item {
      font-size: $form-font-size;
      justify-self: center;
      padding-top: 4%;
      padding-bottom: 4%;
      color: $colorDarkGrey1;
    }
    .grid-item-selected {
      font-weight: bold;
    }
    .grid-item-disable {
      text-decoration: line-through;
      pointer-events: none;
    }
    .grid-item:hover {
      background-color: $colorWhite1;
    }
  }
}
</style>
