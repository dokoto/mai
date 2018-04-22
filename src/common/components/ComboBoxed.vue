<template>
  <div class="combo-container"
       :id="id">
    <InputBoxed :id="id"
                :placeHolder="placeHolder"
                :value="itemSelected"
                :icon="icon"
                :readOnly="readOnly"
                :noBorder="noBorder"
                @handleInputBoxedClick="handleShowItems"
                class="map-autocomplete" />
    <transition name="fade"
                @before-enter="animateSlideDown"
                @leave="animateSlideUp"
                :css="false">
      <ul class="combo"
          v-show="isOpen">
        <li class="item padding-2x"
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            v-on:click="handleChangeSelected">{{ item.text }}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
import $ from 'jquery';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import InputBoxed from './InputBoxed';

export default {
  components: {
    FontAwesomeIcon,
    InputBoxed
  },
  props: {
    id: {
      type: String,
      default: 'combo-boxed'
    },
    placeHolder: {
      type: String,
      default: 'Fake Title'
    },
    icon: {
      default: function() {
        return faPencilAlt;
      }
    },
    itemSelected: {
      type: String
    },
    items: {
      type: Array,
      default: function() {
        return ['Selection 1', 'Selection 2', 'Selection 3', 'Selection 4'];
      }
    },
    showOpen: {
      type: Boolean,
      default: false
    },
    autoCloseOnSelected: {
      type: Boolean,
      default: false
    },
    multiSelect: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: this.showOpen,
      itemSelectedValue: this.itemSelected,
      readOnly: true
    };
  },
  methods: {
    handleShowItems() {
      if (this.items.length) {
        this.isOpen = !this.isOpen;
      }
    },
    animateSlideDown(el) {
      $(el).slideDown('slow');
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', () => done());
    },
    handleChangeSelected(ev) {
      if (this.autoCloseOnSelected) this.isOpen = false;
      if (!this.multiSelect) {
        document.querySelector('li.item').classList.remove('item-selected');
      }
      ev.currentTarget.classList.toggle('item-selected');
      this.itemSelectedValue = $(ev.currentTarget).text();
      this.$emit('comboBoxedItemHasSelected', ev.currentTarget.id);
    }
  }
};
</script>


<style lang="scss" scoped>
@import '../styles/base.scss';

.combo-container {
  font-family: Arial, Tahoma, HelveticaNeue;
  .combo {
    margin-top: 0.3em;
    list-style: none;
    padding: 0;
    border: solid 1px;
    border-radius: 5px;
    border-color: $colorGrey3;
    overflow: auto;
    .item {
      font-size: $form-font-size;
    }
    .item-selected {
      font-weight: bold;
    }
    .item:hover {
      background-color: $colorWhite1;
    }
  }
}
</style>
