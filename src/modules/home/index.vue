<template>
  <div id="home-container" class="container">
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: 'HOME'
    }
  }
}
</script>

<style>
#home-container.container {
  width: 100%;
  height: 100%;
  background-color: green;
}
</style>