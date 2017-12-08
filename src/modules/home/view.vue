<template>
  <div id="home-container" class="home-view container bg-beach">
    <DayCard />
    <SessionPool :sessions="sessions" :therapys="therapys" v-if="sessions.length > 0 && therapys.length > 0" v-on:sessionClick="handleSessionClick" />
    <HomeMenu :userId="userId" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SessionPool from './components/sessionPool.vue';
import HomeMenu from './components/menu.vue';
import DayCard from '../../common/components/dayCard.vue';

export default {
  components: { SessionPool, HomeMenu, DayCard },
  computed: mapGetters({
    sessions: 'home/nextSessions',
    therapys: 'home/getTherapys',
  }),
  data() {
    return {
      userId: this.$route.params.userId,
    };
  },
  created() {
    this.$store.dispatch('home/getNextSessions', this.$route.params.userId);
  },
  methods: {
    handleSessionClick(ev) {
      this.$router.push({
        name: 'session',
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

  &.bg-beach {
    background-image: url('../../../static/img/app-bg.jpeg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}
</style>