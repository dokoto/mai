<template>
  <ul class="day-view box">
    <RowAppointment v-for="session in sessions" :key="session.id" :session="session" />
  </ul>
</template>

<script>
import RowAppointment from './rowTableAppointment.vue';

export default {
  props: ['sessions', 'selectedDay'],
  components: { RowAppointment },
};
</script>

<style lang="scss" scoped>
@import "../../../app/app.scss";
.day-view {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-wrap: nowrap;
  padding-left: 0;
}
.day-view li:last-child {
  border-bottom: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>