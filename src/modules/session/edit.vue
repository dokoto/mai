<template>
  <article class="session-edit-page bg-beach">
    <div class="symbol-container">
      <img class="symbol"
        src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="session-edit-card"
      :title="literals.sessionTitle"
      :icon="sessionIconStatus.icon"
      :iconColor="sessionIconStatus.color">
      <ComboBoxed id="session-edit-therapies"
        :noBorder="true"
        :items="allTherapiesName"
        :itemSelected="therapySelected"
        :placeHolder="literals.therapieTypeComboDefault"
        @onChange="onChange" />
      <DayCarruselBoxed id="session-edit-date"
        :placeHolder="literals.therapieDateComboDefault"
        :noBorder="true" />
      <GridSelectorBoxed id="session-edit-time"
        :placeHolder="literals.therapieTimeComboDefault"
        :items="sessionTimeSchedule"
        :noBorder="true" />
    </Card>
    <Card id="session-edit-therapist-carrusel-card"
      :title="literals.therapistTitle"
      :icon="therapistStatus.icon"
      :iconColor="therapistStatus.color">
      <TherapistCarrusel :id="`session-edit-therapist-carrusel-${session.date}`"
        :therapists="therapists"
        v-if="therapists.length > 0" />
    </Card>
    <Card id="session-edit-location-card"
      :title="literals.locationTitle"
      :icon="locationStatus.icon"
      :iconColor="locationStatus.color">
      <LocationMap :address="therapistAddress"
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

import { mapGetters, mapState } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faCheckCircle, faQuestionCircle } from '@fortawesome/fontawesome-free-solid';
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
      allTherapiesName: 'session/allTherapiesName',
    }),
    ...mapState({
      therapySelected: state => state.session.selected.type,
      sessionTimeSchedule: state => state.session.sessionTimeSchedule,
    }),
    formatDate() {
      return moment(
        `${this.session.date.year}-${this.session.date.month}-${this.session.date.day}`,
        consts.INT_DATE_FORMAT,
      )
        .format('dddd D MMMM')
        .toUpperCase();
    },
    timeBegin() {
      return moment(
        `${this.session.date.year}-${this.session.date.month}-${this.session.date.day} ${
          this.session.date.time
        }`,
        consts.INT_DATE_FORMAT,
      ).format('hh:mm A');
    },
    timeEnd() {
      return moment(
        `${this.session.date.year}-${this.session.date.month}-${this.session.date.day} ${
          this.session.date.time
        }`,
        consts.INT_DATE_FORMAT,
      )
        .add(consts.THERAPY_SESSION_IN_MINUTES, 'm')
        .format('hh:mm A');
    },
    sessionIconStatus() {
      return {
        icon: faQuestionCircle,
        color: 'red',
      };
    },
    therapistStatus() {
      return {
        icon: faQuestionCircle,
        color: 'red',
      };
    },
    locationStatus() {
      return {
        icon: faQuestionCircle,
        color: 'red',
      };
    },
  },
  methods: {
    onChange(value) {
      this.$store.dispatch('session/setTherapyType', value);
    },
  },
  created() {
    this.date = this.$route.query.date;
    this.time = this.$route.query.time;
    this.sessionId = this.$route.query.sessionId;
    this.$store.dispatch('session/fetchAllTherapies', this.$route.params.sessionId);
    this.$store.dispatch('session/fetchSessionTimeSchedule');
    if (sessionId) {
      this.$store.dispatch('session/getSession', sessionId);
    } else if (date && time) {
    }
  },
  data() {
    return {
      sessionId: consts.EMPTY_STRING,
      date: consts.EMPTY_STRING,
      time: consts.EMPTY_STRING,
      selectedDate: consts.EMPTY_STRING,
      selectTime: consts.EMPTY_STRING,
      literals: {
        sessionTitle: this.$i18n.t('session.title.session'),
        therapistTitle: this.$i18n.t('session.title.therapist'),
        locationTitle: this.$i18n.t('session.title.location'),
        therapieTypeComboDefault: this.$i18n.t('session.therapi.type'),
        therapieDateComboDefault: this.$i18n.t('session.therapi.date'),
        therapieTimeComboDefault: this.$i18n.t('session.therapi.time'),
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
