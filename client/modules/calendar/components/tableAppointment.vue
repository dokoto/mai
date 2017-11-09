<template>
  <RowAppointment />
</template>

<script>
import RowAppointment from './rowTableAppointment.vue';

export default {
  props: ['dayNumber', 'monthNumber', 'year'],
  components: { RowAppointment }
}
</script>

<style lang="scss" scoped>

</style>