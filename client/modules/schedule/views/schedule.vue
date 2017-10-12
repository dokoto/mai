<template>
  <div id="schedule-view" class="schedule-view">
    <h1>{{ text }}</h1>
  </div>
</template>

<style>
  .schedule-view {
    background: antiquewhite;
    position: absolute;
    height: 40%;
    top: 20%;
    left: 0;
    font-size: 3em;
    padding: 4%;
    border: solid;
  }
</style>

<script>
export default {
  data() {
    return {
      text: 'SCHEDULE CABRONES'
    }
  }
}
</script>