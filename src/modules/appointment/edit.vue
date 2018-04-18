<template>
  <article class="session-edit-page bg-beach">
    <div class="symbol-container">
      <img class="symbol"
           src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="appointment-edit-doctors-carrusel-card"
          :title="literals.treatmentTitle">
      <DoctorsCarrusel :id="`doctors-carrusel-${$route.params.id}`"
                       :doctors="doctors"
                       :doctorSelected="appointment.doctor ? appointment.doctor.id : ''"
                       @doctorHasSelected="loadDoctorTreatments"
                       v-if="doctors.length" />
    </Card>
    <Card id="session-edit-card"
          :title="literals.appointmentTitle"
          :icon="sessionIconStatus.icon"
          :iconColor="sessionIconStatus.color">
      <ComboBoxed id="session-edit-therapies"
                  :noBorder="true"
                  :items="treatmentsByDoctor"
                  :placeHolder="literals.treatmentTypeComboDefault"
                  @comboBoxedItemHasSelected="loadDoctorSchedule" />
      <DayCarruselBoxed id="session-edit-date"
                        :placeHolder="literals.treatmentDateComboDefault"
                        :disablesDates="disableDates"
                        :initDate="initDate"
                        :selectedDate="daySelected"
                        :noBorder="true"
                        @dayCarruselBoxed:dayClick="loadDoctorTimeSchedule" />
      <GridSelectorBoxed id="session-edit-time"
                         :placeHolder="literals.treatmentTimeComboDefault"
                         :items="sessionTimeSchedule"
                         :disableItems="disableTimes"
                         :itemSelected="timeSelected"
                         :noBorder="true"
                         @gridSelectorBoxed:onChange="handleTimeSelected" />
    </Card>
    <Card id="session-edit-location-card"
          :title="literals.locationTitle"
          :icon="locationStatus.icon"
          :iconColor="locationStatus.color">
      <LocationMap ref="locationMap"
                   :placeHolder="literals.treatmentLocationDefault"
                   :zoom="mapZoom"
                   :address="addressSelected"
                   :showMap="false"
                   :readOnly="false" />
    </Card>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  faCheckCircle,
  faQuestionCircle
} from '@fortawesome/fontawesome-free-solid';

import ComboBoxed from '@/common/components/ComboBoxed';
import DayCarruselBoxed from '@/common/components/DayCarruselBoxed';
import GridSelectorBoxed from '@/common/components/GridSelectorBoxed';
import LocationMap from '@/common/components/LocationMap';
import DoctorsCarrusel from '@/common/components/DoctorsCarrusel';
import Card from '@/common/components/Card';

export default {
  components: {
    Card,
    DoctorsCarrusel,
    ComboBoxed,
    DayCarruselBoxed,
    GridSelectorBoxed,
    LocationMap
  },
  computed: {
    ...mapState('appointment', [
      'appointment',
      'doctors',
      'treatmentsByDoctor',
      'schedules',
      'disableDates',
      'initDate',
      'disableTimes',
      'mapZoom'
    ]),
    sessionIconStatus() {
      return {
        icon: faCheckCircle,
        color: 'green'
      };
    },
    therapistStatus() {
      return {
        icon: faCheckCircle,
        color: 'green'
      };
    },
    locationStatus() {
      return {
        icon: faCheckCircle,
        color: 'green'
      };
    }
  },
  methods: {
    ...mapActions('appointment', ['loadDoctorTreatments', 'loadDoctorSchedule', 'loadDoctorTimeSchedule'])
  },
  created() {
    this.$store.dispatch('appointment/fetchComboDatas', this.$route.params.id);
  },
  data() {
    return {
      literals: {
        appointmentTitle: this.$i18n.t('appointment.titles.appointment'),
        treatmentTitle: this.$i18n.t('appointment.titles.treatment'),
        locationTitle: this.$i18n.t('appointment.titles.location'),
        treatmentTypeComboDefault: this.$i18n.t('appointment.treatment.type'),
        treatmentDateComboDefault: this.$i18n.t('appointment.treatment.date'),
        treatmentTimeComboDefault: this.$i18n.t('appointment.treatment.time'),
        treatmentLocationDefault: this.$i18n.t('appointment.treatment.address')
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';
.session-edit-page {
  font-size: 6.2vw;
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
