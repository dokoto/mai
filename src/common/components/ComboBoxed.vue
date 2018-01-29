<template>
  <div class="combo-container" :id="id">
    <div class="flex-row flex-align-first-corners flex-align-second-center" v-on:click="handleShowItems">
      <span class="item-selected-value">{{ itemSelected }}</span>
      <font-awesome-icon :icon="icon" />
    </div>
    <ul class="combo" v-show="isOpen">
      <li class="item" v-for="item in items" :key="item" v-on:click="handleChangeSelected" >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
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
    icon: {
      default: faPencilAlt,
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
      default: false
    }
  },
  data() {
    return {
      isOpen: showOpen
    };
  },
  methods: {
    handleShowItems(ev) {
      $(ev.currentTarget).parent().find('.combo').slideToggle('slow');
    },
    handleChangeSelected(ev) {
      const text = $(ev.currentTarget).text();
      $('.item').parent().parent().find('.item-selected-value').text(text);
    }
  }
};
</script>


<style lang="scss" scoped>
@import '../styles/base.scss';

.combo-container {
  .item-selected-value {
    font-size: 1.6em;
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
