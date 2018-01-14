<template>
  <div :id="id"
    class="input-boxed-container flex-row flex-align-first-corners flex-align-second-center">
    <input type="text"
      class="input-boxed"
      :placeholder="placeHolder" />
    <div class="input-boxed-icon"
      v-on:click="handleInputBoxedClick">
      <font-awesome-icon :icon="icon" />
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: ['id', 'placeHolder', 'icon'],
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
  height: 2.5em;

  .input-boxed {
    font-family: Arial, Tahoma, HelveticaNeue;
    outline: none;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
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
    width: 15%;
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

