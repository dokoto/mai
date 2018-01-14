<template>
  <article class="session-page container bg-beach">
    <DayCard />
    <Card v-bind:id="session.id" v-bind:sessionDate="session.date" v-bind:sessionTherapy="session.therapy" v-bind:withTimeInterval="true" v-if="session.id !== undefined" />
    <TherapistCarrusel v-bind:therapists="therapists" v-if="therapists.length > 0" />
    <LocationMap v-bind:address="therapistAdress" v-bind:zoom="mapZoom" v-if="therapists.length > 0" />
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '../../common/components/sessionCard.vue';
import DayCard from '../../common/components/dayCard.vue';
import TherapistCarrusel from '../../common/components/therapistCarrusel.vue';
import LocationMap from '../../common/components/LocationMap.vue';

export default {
  components: {
    DayCard, Card, TherapistCarrusel, LocationMap,
  },
  computed: mapGetters({
    session: 'session/session',
    therapists: 'session/therapists',
    therapistAdress: 'session/therapistAdress',
    mapZoom: 'session/mapZoom',
  }),
  created() {
    this.$store.dispatch('session/getSession', this.$route.params.sessionId);
  },
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
    background-image: url('../../../static/img/app-bg.jpeg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}
</style>
