<template>
  <div class="list-container"
       :id="id">
    <Collapsible>
      <ul class="list"
          v-show="isOpen">
        <li class="item padding-2x"
            v-for="(item, index) in items"
            :key="index"
            :id="index"
            v-on:click="handleChangeSelected">
          <slot :item="item" />
        </li>
      </ul>
    </Collapsible>
  </div>
</template>

<script>
import InputBoxed from './InputBoxed';
import Collapsible from './Collapsible';

export default {
  components: {
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
      this.$emit('listBoxedItemHasSelected', ev);
    }
  }
};
</script>


<style lang="scss" scoped>
@import 'animate.css/animate.min.css';
@import '../styles/base.scss';

.list-container {
  font-family: Arial, Tahoma, HelveticaNeue;
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    border: solid 1px;
    border-radius: 5px;
    border-color: $colorGrey3;
    overflow: auto;
    .item {
      font-size: 0.8em;
    }
  }
}
</style>
