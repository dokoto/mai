<template>
  <div id="home-container" class="home-view container bg-beach">
    <DayCard />
    <SessionPool :sessions="sessions" v-if="sessions.length > 0" v-on:sessionClick="handleSessionClick" />
    <HomeMenu />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SessionPool from "./components/sessionPool.vue";
import HomeMenu from "./components/menu.vue";
import DayCard from "../../app/components/dayCard.vue";

export default {
  components: { SessionPool, HomeMenu, DayCard },
  computed: mapGetters({
    sessions: "nextSessions"
  }),
  created() {
    this.$store.dispatch("getNextSessions", this.$route.params.userId);
  },
  methods: {
    handleSessionClick(ev) {
      this.$router.push({
        name: "session",
        params: { sessionId: ev.currentTarget.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../app/app.scss";

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
    background-image: url("../../app/assets/img/app-bg.jpeg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}
</style>