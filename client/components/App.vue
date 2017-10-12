<template>
  <div id="app">
    <router-view name="header"></router-view>
    <transition name="slide" enter-active-class="transitionEnter"
        leave-active-class="transitionLeave">
      <router-view name="container"></router-view>
    </transition>
    <router-view name="footer"></router-view>
  </div>
</template>

<style>

.img-slider {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right:0;
}
body,
html {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body,
input,
textarea {
  font-family: Arial, Tahoma;
}

.block {
  display: block;
}

.aligned {
  margin: 0 auto !important;
}

.border-box, a, article, div, footer, h1, h2, h3, h4, h5, h6, header, img, li, p, span, ul {
  box-sizing: border-box;
}

.app {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
