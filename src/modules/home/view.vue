<template>
  <div id="home-container" class="home-view container bg" >
    <SessionPool :sessions="sessions" v-if="sessions.length > 0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SessionPool from './components/sessionPool.vue';

export default {
  components: {SessionPool},
  computed: mapGetters({
    sessions: 'nextSessions'
  }),
  created () {
    this.$store.dispatch('getNextSessions', this.$route.params.userId)
  }
};
</script>

<style lang="scss" scoped>
.home-view {
  &.container {
    width: 100%;
    height: 100%;
  }

  &.bg {
    background-image: url("./assets/img/app-bg.jpeg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}
</style>