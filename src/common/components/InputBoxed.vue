<template>
  <div :id="id"
       class="input-boxed-container flex-row flex-align-first-corners flex-align-second-center">
    <input type="text"
           maxlength="200"
           class="input"
           :class="[ noBorder ? 'no-boxed' : 'boxed'  ]"
           :placeholder="placeHolder"
           :readonly="readOnly"
           :value="value" />
    <div class="input-icon"
         v-if="!noIcon"
         :class="[ noBorder ? 'no-boxed' : 'boxed'  ]"
         @click="handleInputBoxedClick">
      <font-awesome-icon :icon="icon" />
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    id: {
      type: String,
      default: 'input-boxed'
    },
    placeHolder: {
      type: String,
      default: 'Address'
    },
    icon: {
      default: function() {
        return faMapMarkerAlt;
      }
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
  },
  methods: {
    handleInputBoxedClick(ev) {
      this.$emit(
        'handleInputBoxedClick',
        ev.currentTarget.parentElement.firstElementChild.value
      );
    },
    handleInputBoxedOnChange(ev) {
      this.$emit('inputBoxed:onChange', ev);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.input-boxed-container {
  position: relative;
  height: 2.5rem;

  .input {
    font-family: Arial, Tahoma, HelveticaNeue;
    outline: none;
    width: 100%;
    padding-left: 10px;
    height: 100%;
    font-size: 1em;
    padding-bottom: 0;
    padding-top: 0;
    &.boxed {
      border: solid 1px;
      border-color: $colorGrey3;
      padding-right: 4rem;
      border-radius: 5px;
    }
    &.no-boxed {
      border: solid 0px;
    }
  }

  .input-icon {
    position: absolute;
    right: 0;
    width: 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $colorWhite0;
    border-bottom: 0;
    border-top: 0;
    &.boxed {
      border: solid 1px;
      border-color: $colorGrey3;
      border-radius: 0px 5px 5px 0px;
    }
    &.no-boxed {
      border: solid 0px;
    }
  }
}
</style>
