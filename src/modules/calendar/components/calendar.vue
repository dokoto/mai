<template>
  <div id="calendar-view" class="calendar-view">
    <h1>{{ text }}</h1>
  </div>
</template>

<style>
  .calendar-view {
    font-size: 1em;
  }
</style>

<script>
export default {
  data() {
    return {
      text: 'CALENDAR'
    }
  }
}
</script>