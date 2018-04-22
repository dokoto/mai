<template>
  <SlideYDownTransition :duration="duration">
    <div class="alertBox"
         v-show="notify.show"
         v-on:click="resetNotify">
      <span class="text"
            v-t="notify.message" />
    </div>
  </SlideYDownTransition>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { SlideYDownTransition } from 'vue2-transitions';

export default {
  components: { SlideYDownTransition },
  props: {
    duration: {
      type: Number,
      default: 1200
    }
  },
  computed: {
    ...mapState('app', {
      notify: state => state.notify
    })
  },
  methods: {
    ...mapActions('app', ['resetNotify'])
  }
};
</script>

<style lang="scss" scoped>
@import '../../../common/styles/base.scss';
.alertBox {
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  .text {
    padding: 0.5em;
    border-radius: 5px;
    margin: 0.5em;
    text-align: center;
    color: $colorWhite2;
    background-color: #e53935;
  }
}
</style>
