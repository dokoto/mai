<template>
  <div class="combo-container" :id="id">
    <InputBoxed :id="id"
      :placeHolder="placeHolder"
      :value="itemSelectedValue"
      :icon="icon"
      :readOnly="readOnly"
      v-on:handleInputBoxedClick="handleShowItems"
      class="map-autocomplete" />
      <transition name="fade"
        @before-enter="animateSlideDown"
        @leave="animateSlideUp"
        :css="false">
        <ul class="combo" v-show="isOpen">
          <li class="item" v-for="item in items" :key="item" v-on:click="handleChangeSelected" >{{ item }}</li>
        </ul>
    </transition>
  </div>
</template>

<script>
import $ from 'jquery';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: String,
      default: 'combo-boxed',
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
      default: 'Combo item selected',
    },
    items: {
      type: Array,
      default: function() {
        return ['Selection 1', 'Selection 2', 'Selection 3', 'Selection 4'];
      },
    },
    showOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.showOpen,
      itemSelectedValue: this.itemSelected,
      readOnly: true,
    };
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
      this.itemSelectedValue = $(ev.currentTarget).text();
    },
  },
};
</script>


<style lang="scss" scoped>
@import '../styles/base.scss';

.combo-container {
  font-family: Arial, Tahoma, HelveticaNeue;
  .item-selected {
    border: solid 1px;
    border-color: #e4e3e3;
    font-size: 1.2em;
  }
  .item-selected-value {
    font-size: 1.2em;
  }
  .item-selected-icon {
    font-size: 1em;
  }
  .combo {
    margin-top: 0.3em;
    list-style: none;
    padding: 0;
    border: solid 1px;
    border-color: #e8e6e6;
    overflow: auto;
    height: 100px;
  }
  .combo {
    .item {
      font-size: 1.2em;
      padding: 2%;
    }
    .item:hover {
      background-color: #f7f7f0;
      font-weight: bold;
    }
  }
}
</style>
