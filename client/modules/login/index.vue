<template>
  <div id="login-container" class="container">
    <Login />
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import Login from './views/login';

export default {
  components: {
    Login
  }
}
</script>

<style>
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

.container {
  width: 100%;
  height: 100%;
}
</style>