<template>
  <div class="grid-selector-container"
       :id="id">
    <InputBoxed :id="id"
                :placeHolder="placeHolder"
                :value="itemSelected"
                :icon="icon"
                :readOnly="readOnly"
                :noBorder="noBorder"
                v-on:handleInputBoxedClick="handleShowItems"
                class="map-autocomplete" />
    <Collapsible>
      <ul class="grid-items"
          v-show="isOpen">
        <li class="grid-item"
            v-for="item in items"
            :key="item"
            @click="handleChangeSelected"
            :class="{ 'grid-item-disable': disableItems.includes(item), 'grid-item-selected': item === itemSelected }">{{ item }}</li>
      </ul>
    </Collapsible>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import InputBoxed from './InputBoxed';
import Collapsible from './Collapsible';

export default {
  components: {
    FontAwesomeIcon,
    InputBoxed,
    Collapsible
  },
  props: {
    id: {
      type: String,
      default: 'grid-selector-boxed'
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
        return ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00', '20:30'];
      }
    },
    disableItems: {
      type: Array,
      default: function() {
        return ['17:30', '20:30'];
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
    interval: {
      type: String,
      default: '45'
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: this.showOpen,
      readOnly: true
    };
  },
  methods: {
    handleShowItems() {
      if (this.items.length) {
        this.isOpen = !this.isOpen;
      }
    },
    handleChangeSelected(ev) {
      if (this.autoCloseOnSelected) this.isOpen = false;
      if (!this.multiSelect) {
        document
          .querySelectorAll('li.grid-item')
          .forEach(item => item.classList.remove('grid-item-selected'));
      }
      ev.currentTarget.classList.toggle('grid-item-selected');
      this.$emit('gridSelectorBoxed:onChange', ev.currentTarget.innerText);
    }
  }
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
    border-radius: 5px;
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
      font-weight: normal;
      text-decoration: line-through;
      pointer-events: none;
    }
    .grid-item:hover {
      background-color: $colorWhite1;
    }
  }
}
</style>
