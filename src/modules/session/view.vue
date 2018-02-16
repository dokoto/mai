<template>
  <article class="session-page container bg-beach">    
    <div class="symbol-container">
      <img class="symbol" src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card
      id="session-card"
      :title="literals.sessionTitle" 
      iconColor="blue">
      <SessionCard 
        :id="session.id" 
        :sessionDate="session.date" 
        :sessionTherapy="session.therapy" 
        :withTimeInterval="true" 
        v-if="session.id !== undefined" />
    </Card>
    <Card
      id="therapist-carrusel-card"
      :title="literals.therapistTitle" 
      iconColor="blue">
        <TherapistCarrusel 
          :id="`therapist-carrusel-${session.date}`" 
          :therapists="therapists"
          v-if="therapists.length > 0" />
    </Card>
    <Card
      id="location-card"
      :title="literals.locationTitle" 
      iconColor="blue">
      <LocationMap 
        :address="therapistAdress" 
        :zoom="mapZoom" 
        :showMap="true"
        v-if="therapists.length > 0" />
    </Card>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import SessionCard from '../../common/components/sessionCard.vue';
import DayCard from '../../common/components/dayCard.vue';
import TherapistCarrusel from '../../common/components/TherapistCarrusel.vue';
import LocationMap from '../../common/components/LocationMap.vue';
import Card from '../../common/components/Card.vue';


export default {
  components: {
    Card,
    DayCard,
    SessionCard,
    TherapistCarrusel,
    LocationMap,
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
  data() {
    return {
      literals: {
        sessionTitle: this.$i18n.t('session.title.session'),
        therapistTitle: this.$i18n.t('session.title.therapist'),
        locationTitle: this.$i18n.t('session.title.location'),
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.session-page {
  overflow-y: scroll;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  margin-bottom: 2%;

  &.bg-beach {
    background-image: url('../../../static/img/app-bg.jpeg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  .symbol-container {
    margin-top: 10%;
    margin-bottom: 5%;
    text-align: center;
    .symbol {
      width: 9em;
      border: solid 0.1em;
      border-radius: 50%;
      border-color: white;
      padding: 0px;
    }
  }
}
</style>
