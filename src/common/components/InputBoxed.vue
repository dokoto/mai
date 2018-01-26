<template>
  <div :id="id"
    class="input-boxed-container flex-row flex-align-first-corners flex-align-second-center">
    <input type="text"
      maxlength="200"
      class="input-boxed"
      :placeholder="placeHolder"
      :readonly="readOnly"
      :value="value" />
    <div class="input-boxed-icon"
      v-on:click="handleInputBoxedClick">
      <font-awesome-icon :icon="icon" />
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: String,
      default: 'input-boxed',
    }, 
    placeHolder: {
      type: String,
      default: 'Address',
    }, 
    icon: {
      default: faMapMarkerAlt
    }, 
    readOnly: {
      type: Boolean,
      default: true
    },
    value: {
      type: String
    }
  },
  methods: {
    handleInputBoxedClick(ev) {
      this.$emit('handleInputBoxedClick', ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.input-boxed-container {
  position: relative;
  height: 2.5rem;

  .input-boxed {
    font-family: Arial, Tahoma, HelveticaNeue;
    outline: none;
    width: 100%;
    padding-left: 10px;
    padding-right: 4rem;
    height: 100%;
    border: solid 1px;
    border-color: $colorGrey3;
    font-size: 1.2em;
    padding-bottom: 0;
    padding-top: 0;
  }

  .input-boxed-icon {
    position: absolute;
    right: 0;
    width: 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $colorWhite0;
    border: solid 1px;
    border-bottom: 0;
    border-top: 0;
    border-color: $colorGrey3;
  }
}
</style>

