<template>
  <div id="home-container"
       class="home-view container">
    <div class="symbol-container-no-border grow-2">
      <img class="symbol"
           src="../../../static/img/medical.png" />
    </div>
    <AppointmentPoll :appointments="nextsAppointments"
                     @appointmentPollClick="handleAppointmentClick" />
    <HomeMenu />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AppointmentPoll from './components/AppointmentPoll';
import HomeMenu from './components/menu';

export default {
  components: { AppointmentPoll, HomeMenu },
  computed: {
    ...mapState('home', {
      nextsAppointments: state => state.nextsAppointments
    })
  },
  created() {
    this.$store.dispatch('home/nextsAppointments');
  },
  methods: {
    handleAppointmentClick(id) {
      this.$router.push({
        name: 'appointmentEdit',
        params: { id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';

.home-view {
  font-size: 5vw;
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
