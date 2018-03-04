<template>
  <ul class="day-view box">
    <RowAppointment v-for="session in toDaySessions"
      :key="session.id"
      :session="session"
      :selectedDay="selectedDay"
      @sessionClick="handleSessionClick" />
  </ul>
</template>

<script>
import RowAppointment from './rowTableAppointment.vue';

export default {
  props: ['toDaySessions', 'selectedDay'],
  components: { RowAppointment },
  methods: {
    handleSessionClick(ev) {
      this.$emit('sessionClick', ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../common/styles/base.scss';
.day-view {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-wrap: nowrap;
  padding-left: 0;
  border-radius: 5px;  
}
.day-view li:last-child {
  border-bottom: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>