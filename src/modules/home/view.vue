<template>
  <div id="home-container"
    class="home-view container">
    <div class="symbol-container-no-border  grow-2">
      <img class="symbol"
        src="../../../static/img/medical.png" />
    </div>
    <AppointmentPoll :appointments="nextsAppointments"
      v-on:appointmentPollClick="handleAppointmentClick" />
    <HomeMenu />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AppointmentPoll from './components/AppointmentPoll.vue';
import HomeMenu from './components/menu.vue';

export default {
  components: { AppointmentPoll, HomeMenu },
  computed: {
    ...mapState('home', {
      nextsAppointments: state => state.nextsAppointments,
    }),
  },
  created() {
    this.$store.dispatch('home/nextsAppointments');
  },
  methods: {
    handleAppointmentClick(ev) {
      this.$router.push({
        name: 'sessionView',
        params: { sessionId: ev.currentTarget.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';

.home-view {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;

  &.container {
    width: 100%;
    height: 100%;
  }
}
</style>
