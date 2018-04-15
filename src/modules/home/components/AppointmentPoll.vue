<template>
  <section class="appointments">
    <AppointmentCard v-for="appointment in appointments"
                     :key="appointment.id"
                     :id="appointment.id"
                     :date="appointment.date"
                     :time="appointment.time"
                     :treatment="appointment.treatment"
                     @appointmentCardClick="id => $emit('appointmentPollClick', id)" />
  </section>
</template>

<script>
import AppointmentCard from '@/common/components/AppointmentCard';

export default {
  components: { AppointmentCard },
  props: {
    appointments: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.appointments {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 3%;
  padding-top: 4%;
}
::-webkit-scrollbar {
  display: none;
}
</style>

