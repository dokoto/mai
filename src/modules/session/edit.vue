<template>
  <article class="session-edit-page bg-beach">
    <div class="symbol-container">
      <img class="symbol"
        src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="session-edit-therapist-carrusel-card"
      :title="literals.therapistTitle"
      :icon="therapistStatus.icon"
      :iconColor="therapistStatus.color">
      <TherapistCarrusel id="session-edit-therapist-carrusel"
        :therapists="therapists"
        :disablesTherapists="disablesTherapists"
        :therapistSelected="therapiSelected"
        @therapistCarrusel:onChange="handleTherapiSelected" />
    </Card>
    <Card id="session-edit-card"
      :title="literals.sessionTitle"
      :icon="sessionIconStatus.icon"
      :iconColor="sessionIconStatus.color">
      <ComboBoxed id="session-edit-therapies"
        :noBorder="true"
        :items="allTherapiesName"
        :itemSelected="therapySelected"
        :placeHolder="literals.therapieTypeComboDefault"
        @comboBoxed:onChange="onChangeTherapies" />
      <DayCarruselBoxed id="session-edit-date"
        :placeHolder="literals.therapieDateComboDefault"
        :disablesDates="disablesDates"
        :initDate="initDate"
        :selectedDate="daySelected"
        :noBorder="true"
        @dayCarruselBoxed:dayClick="handleDateSelected" />
      <GridSelectorBoxed id="session-edit-time"
        :placeHolder="literals.therapieTimeComboDefault"
        :items="sessionTimeSchedule"
        :disableItems="disablesTimes"
        :itemSelected="timeSelected"
        :noBorder="true"
        @gridSelectorBoxed:onChange="handleTimeSelected" />
    </Card>
    <Card id="session-edit-location-card"
      :title="literals.locationTitle"
      :icon="locationStatus.icon"
      :iconColor="locationStatus.color">
      <LocationMap ref="locationMap"
        :placeHolder="literals.therapieLocationDefault"
        :zoom="mapZoom"
        :address="addressSelected"
        :showMap="false"
        :readOnly="false" />
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
    //DELTE?
    ...mapGetters({
      //session: 'session/session',
      //therapy: 'session/therapy',
      //therapistAddress: 'session/therapistAddress',
      // mapZoom: 'session/mapZoom',
      // NEW
      allTherapiesName: 'session/allTherapiesName',
    }),
    ...mapState('session', {
      therapiSelected: state => state.selected.therapi,
      therapySelected: state => state.selected.type,
      daySelected: state => state.selected.date,
      timeSelected: state => state.selected.time,
      addressSelected: state => state.selected.address,
      sessionTimeSchedule: state => state.sessionTimeSchedule,
      disablesDates: state => state.disablesDates,
      disablesTimes: state => state.disablesTimes,
      disablesTherapists: state => state.disablesTherapists,
      initDate: state => state.initDate,
      therapists: state => state.therapists,
      mapZoom: state => state.mapZoom,
    }),
    sessionIconStatus() {
      return this.$store.state.session.selected.type &&
        this.$store.state.session.selected.date &&
        this.$store.state.session.selected.time
        ? {
            icon: faCheckCircle,
            color: 'green',
          }
        : {
            icon: faQuestionCircle,
            color: 'red',
          };
    },
    therapistStatus() {
      return this.$store.state.session.selected.therapi
        ? {
            icon: faCheckCircle,
            color: 'green',
          }
        : {
            icon: faQuestionCircle,
            color: 'red',
          };
    },
    locationStatus() {
      return this.$store.state.session.selected.address
        ? {
            icon: faCheckCircle,
            color: 'green',
          }
        : {
            icon: faQuestionCircle,
            color: 'red',
          };
    },
  },
  methods: {
    handleTherapiSelected(newTherapi) {
      this.$store.dispatch('session/setTherapi', newTherapi);
      this.$store.dispatch('session/setAddress', newTherapi);
      this.$store.dispatch('session/fetchAllTherapies');
      this.$store.dispatch('session/fetchBusyDays', newTherapi);
      this.$refs.locationMap.updateMap(this.$store.state.session.selected.address);
    },
    handleDateSelected(newSelectedDate) {
      this.$store.dispatch('session/setDate', newSelectedDate);
      this.$store.dispatch('session/fetchBusyTimes', newSelectedDate);
    },
    onChangeTherapies(newTherapy) {
      this.$store.dispatch('session/setTherapyType', newTherapy);
    },
    handleTimeSelected(newTime) {
      this.$store.dispatch('session/setTime', newTime);
    },
  },
  created() {
    this.$store.dispatch('session/initDate');
    this.$store.dispatch('session/fetchAllTherapies');
    this.$store.dispatch('session/fetchAllTherapists');
    this.$store.dispatch('session/fetchBusyTherapists');
    this.$store.dispatch('session/fetchBusyDays');
    this.$store.dispatch('session/fetchSessionTimeSchedule');
    if (this.$route.params.date && this.$route.params.time) {
      this.$store.dispatch('session/setDate', this.$route.params.date);
      this.$store.dispatch('session/setTime', this.$route.params.time);
    }
  },
  data() {
    return {
      //DELTE?-INIT
      /* sessionId: consts.EMPTY_STRING,
      date: consts.EMPTY_STRING,
      time: consts.EMPTY_STRING,
      selectedDate: consts.EMPTY_STRING,
      selectTime: consts.EMPTY_STRING,*/
      //DELTE?-END
      literals: {
        sessionTitle: this.$i18n.t('session.title.session'),
        therapistTitle: this.$i18n.t('session.title.therapist'),
        locationTitle: this.$i18n.t('session.title.location'),
        therapieTypeComboDefault: this.$i18n.t('session.therapi.type'),
        therapieDateComboDefault: this.$i18n.t('session.therapi.date'),
        therapieTimeComboDefault: this.$i18n.t('session.therapi.time'),
        therapieLocationDefault: this.$i18n.t('session.therapi.address'),
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
