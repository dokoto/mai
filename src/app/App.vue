<template>
  <div id="perruchaApp" class="app">
    <transition name="fade" mode="out-in" appear>
      <router-view name="container" class="child-view"></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
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
  font-family: Arial, Tahoma;
}

.app {
  position: relative;
  width: 100%;
  height: 100%;
  background-color:aquamarine;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
