<template>
  <article class="session-edit-page bg-beach">    
    <div class="symbol-container">
      <img class="symbol" src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card
      id="session-edit-card"
      :title="literals.sessionTitle" 
      iconColor="blue">
      <ComboBoxed 
        id="session-edit-therapies"
        :noBorder="true" 
        :items="allTherapiesName"
        v-if="allTherapiesName.length > 0"/>
      <DayCarruselBoxed 
        id="session-edit-type"
        :noBorder="true" />
      <GridSelectorBoxed 
        id="session-edit-type"
        :noBorder="true" />    
    </Card>
    <Card
      id="session-edit-therapist-carrusel-card"
      :title="literals.therapistTitle" 
      iconColor="blue">
        <TherapistCarrusel 
          :id="`session-edit-therapist-carrusel-${session.date}`" 
          :therapists="therapists"
          v-if="therapists.length > 0" />
    </Card>
    <Card
      id="session-edit-location-card"
      :title="literals.locationTitle" 
      iconColor="blue">
      <LocationMap 
        :address="therapistAddress" 
        :zoom="mapZoom" 
        :showMap="true"
        :readOnly="false"
        v-if="therapists.length > 0" />
    </Card>
  </article>
</template>

<script>
import moment from 'moment';
import * as consts from '../../common/constants';

import { mapGetters } from 'vuex';
import ComboBoxed from '../../common/components/ComboBoxed.vue';
import DayCarruselBoxed from '../../common/components/DayCarruselBoxed.vue';
import GridSelectorBoxed from '../../common/components/GridSelectorBoxed.vue';
import TherapistCarrusel from '../../common/components/TherapistCarrusel.vue';
import LocationMap from '../../common/components/LocationMap.vue';
import Card from '../../common/components/Card.vue';

moment.locale(window.glob.language);
export default {
  components: {
    Card,
    ComboBoxed,
    DayCarruselBoxed,
    GridSelectorBoxed,
    TherapistCarrusel,
    LocationMap,
  },
  computed: {
    ...mapGetters({
      session: 'session/session',
      therapy: 'session/therapy',
      therapists: 'session/therapists',
      therapistAddress: 'session/therapistAddress',
      mapZoom: 'session/mapZoom',
      // NEW
      allTherapiesName: 'session/allTherapiesName'
    }),
    formatDate () {
      return moment(`${ this.session.date.year }-${ this.session.date.month }-${ this.session.date
        .day }`, consts.INT_DATE_FORMAT)
        .format('dddd D MMMM')
        .toUpperCase();
    },
    timeBegin () {
      return moment(`${ this.session.date.year }-${ this.session.date.month }-${ this.session.date
        .day } ${ this.session.date.time }`, consts.INT_DATE_FORMAT).format('hh:mm A');
    },
    timeEnd () {
      return moment(`${ this.session.date.year }-${ this.session.date.month }-${ this.session.date
        .day } ${ this.session.date.time }`, consts.INT_DATE_FORMAT)
        .add(consts.THERAPY_SESSION_IN_MINUTES, 'm')
        .format('hh:mm A');
    },
  },
  created() {    
      const date = this.$route.query.date;
      const time = this.$route.query.time;
      //this.$store.dispatch('session/getSession', this.$route.params.sessionId);   
      this.$store.dispatch('session/getAllTherapies', this.$route.params.sessionId); 
  },
  data() {
    return {
      literals: {
        sessionTitle: this.$i18n.t('session.title.session'),
        therapistTitle: this.$i18n.t('session.title.therapist'),
        locationTitle: this.$i18n.t('session.title.location'),
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.session-edit-page {
  overflow-y: scroll;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  margin-bottom: 2%;

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

