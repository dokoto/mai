<template>
  <article class="session-page container bg-beach">
    <DayCard />
    <Card v-bind:id="session.id" v-bind:sessionDate="session.date" v-bind:sessionTherapy="session.therapy" v-bind:withTimeInterval="true" v-if="session.id !== undefined" />
    <TherapistCarrusel v-bind:therapists="therapists" v-if="therapists.length > 0" />
    <Map v-bind:therapistAdress="therapistAdress" v-bind:mapZoom="mapZoom" v-if="therapists.length > 0" />
    </section>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "../../app/components/sessionCard.vue";
import DayCard from "../../app/components/dayCard.vue";
import TherapistCarrusel from "../../app/components/therapistCarrusel.vue";
import Map from "../../app/components/map.vue";

export default {
  components: { DayCard, Card, TherapistCarrusel, Map },
  computed: mapGetters({
    session: "session",
    therapists: "therapists",
    therapistAdress: "therapistAdress",
    mapZoom: "mapZoom"
  }),
  created() {
    this.$store.dispatch("getSession", this.$route.params.sessionId);
  }
};
</script>

<style lang="scss" scoped>
.session-page {
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
