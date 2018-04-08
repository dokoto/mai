<template>
  <article class="session-view-page">
    <div class="symbol-container">
      <img class="symbol" src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card
      id="session-view-card"
      :title="literals.sessionTitle"
      iconColor="blue">
      <InputBoxed id="session-view-type"
        placeHolder="Session Type#Error"
        :readOnly="readOnly"
        :value="firstTherapy.name"
        :noBorder="noBorder"
        :noIcon="noIcon"
        v-if="therapists.length > 0" />
      <InputBoxed id="session-view-date"
        placeHolder="Session Type#Error"
        :readOnly="readOnly"
        :value="formatDate"
        :noBorder="noBorder"
        :noIcon="noIcon"
        v-if="therapists.length > 0" />
      <InputBoxed id="session-view-time"
        placeHolder="Session Type#Error"
        :readOnly="readOnly"
        :value="`${timeBegin} >> ${timeEnd}`"
        :noBorder="noBorder"
        :noIcon="noIcon"
        v-if="therapists.length > 0" />
    </Card>
    <Card
      id="session-view-therapist-carrusel-card"
      :title="literals.therapistTitle"
      iconColor="blue">
        <TherapistCarrusel
          :id="`session-view-therapist-carrusel-${session.date}`"
          :therapists="therapists"
          v-if="therapists.length > 0" />
    </Card>
    <Card
      id="session-view-location-card"
      :title="literals.locationTitle"
      iconColor="blue">
      <LocationMap
        :address="therapistAddress"
        :zoom="mapZoom"
        :showMap="showMap"
        v-if="therapists.length > 0" />
    </Card>
  </article>
</template>

<script>
import moment from 'moment';
import * as consts from '../../common/constants';

import { mapGetters } from 'vuex';
import InputBoxed from '../../common/components/InputBoxed.vue';
import TherapistCarrusel from '../../common/components/TherapistCarrusel.vue';
import LocationMap from '../../common/components/LocationMap.vue';
import Card from '../../common/components/Card.vue';

moment.locale(window.glob.language);
export default {
  components: {
    Card,
    InputBoxed,
    TherapistCarrusel,
    LocationMap,
  },
  computed: {
    ...mapGetters({
      session: 'appointment/session',
      firstTherapy: 'appointment/firstTherapy',
      therapists: 'appointment/therapists',
      therapistAddress: 'appointment/therapistAddress',
      mapZoom: 'appointment/mapZoom',
    }),
    formatDate() {
      return moment(`${ this.session.date}`, consts.INT_DATE_FORMAT)
        .format('dddd D MMMM')
        .toUpperCase();
    },
    timeBegin() {
      return moment(`${ this.session.date } ${ this.session.date.time }`, consts.INT_DATE_FORMAT).format('hh:mm A');
    },
    timeEnd() {
      return moment(`${ this.session.date } ${ this.session.date.time }`, consts.INT_DATE_FORMAT)
        .add(consts.THERAPY_SESSION_IN_MINUTES, 'm')
        .format('hh:mm A');
    },
  },
  created() {
    this.$store.dispatch('session/getSession', this.$route.params.sessionId);
  },
  data() {
    return {
      literals: {
        sessionTitle: this.$i18n.t('session.title.session'),
        therapistTitle: this.$i18n.t('session.title.therapist'),
        locationTitle: this.$i18n.t('session.title.location'),
      },
      readOnly: true,
      showMap: true,
      noBorder: true,
      noIcon: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';
.session-view-page {
  overflow-y: scroll;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  margin-bottom: 2%;
}
</style>
