<template>
  <div id="mai"
       class="app">
    <transition name="fade"
                mode="out-in"
                appear>
      <router-view name="container"
                   class="child-view"></router-view>
    </transition>
    <Notify />
  </div>
</template>

<script>
import Notify from './components/Notify';

export default {
  components: { Notify },
  created: function() {
    return this.$store.dispatch('app/tmpLogin').then(() =>
      this.$router.push({
        name: 'home'
      })
    );
  }
};
</script>

<style lang="scss">
@import '../../common/styles/base.scss';

body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body,
input,
textarea {
  font-family: 'Open Sans', sans-serif;
}

body {
  background-image: url($bg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.app {
  position: relative;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
