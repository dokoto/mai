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
    <Collapsible>
      <ul class="combo"
          v-show="isOpen">
        <li class="item padding-2x"
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            v-on:click="handleChangeSelected">{{ item.text }}</li>
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
        document.querySelectorAll('li-item')
          .forEach(item => item.classList.remove('grid-item-selected'));
      }
      ev.currentTarget.classList.toggle('item-selected');
      this.$emit('comboBoxedItemHasSelected', ev.currentTarget.id);
    }
  }
};
</script>


<style lang="scss" scoped>
@import 'animate.css/animate.min.css';
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

.fade-enter-active,
.fade-leave-active {
  transition: height 0.3s ease-in;
}
.fade-enter,
.fade-leave-to {
  transition: height 0.3s ease-in;
}
</style>
