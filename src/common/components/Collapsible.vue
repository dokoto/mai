<template>
  <transition name="fade"
              @before-enter="animateSlideDown"
              @leave="animateSlideUp"
              :css="false">
    <slot />
  </transition>
</template>

<script>
import $ from 'jquery';

export default {
  methods: {
    animateSlideDown(el) {
      $(el).slideDown('slow');
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', () => done());
    }
  }
};
</script>
