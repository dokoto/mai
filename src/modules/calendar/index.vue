<template>
  <div id="calendar-container" class="container">
    <Calendar />
  </div>
</template>

<script>
import Calendar from './components/calendar';

export default {
  components: {
    Calendar
  }
}
</script>

<style>
#calendar-container.container {
  width: 100%;
  height: 100%;
  background-color: blue;
}
</style>