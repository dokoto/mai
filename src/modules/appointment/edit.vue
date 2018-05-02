<template>
  <article class="appointment-edit-page bg-beach">
    <div class="symbol-container">
      <img class="symbol"
           src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="appointment-edit-doctors-carrusel-card"
          title="appointment.titles.treatment"
          :icon="UIdoctorIconStatus.icon"
          :iconColor="UIdoctorIconStatus.color">
      <DoctorsCarrusel :id="`doctors-carrusel-${$route.params.id}`"
                       :doctors="UIdoctors"
                       :doctorSelected="UIdoctorSelected ? UIdoctorSelected.id : ''"
                       @doctorHasSelected="loadDoctorTreatments"
                       v-if="UIdoctors.length" />
    </Card>
    <Card id="appointment-edit-card"
          title="appointment.titles.appointment"
          :icon="UIappointmentIconStatus.icon"
          :iconColor="UIappointmentIconStatus.color">
      <ComboBoxed id="appointment-edit-treatments"
                  :noBorder="true"
                  :items="UItreatmentsByDoctor"
                  placeHolder="appointment.treatment.type"
                  :itemSelected="UItreatmentSelected"
                  :showOpen="UItreatmentsShowOpen"
                  :autoCloseOnSelected="true"
                  @comboBoxedItemHasSelected="loadDoctorSchedule" />
      <DayCarruselBoxed id="appointment-edit-date"
                        placeHolder="appointment.treatment.date"
                        :disablesDates="UIdisableDates"
                        :initDate="UIinitDate"
                        :selectedDate="UIdateSelected"
                        :noBorder="true"
                        :autoCloseOnSelected="true"
                        @dayCarruselBoxed:dayClick="loadDoctorTimeSchedule" />
      <GridSelectorBoxed id="appointment-edit-time"
                         placeHolder="appointment.treatment.time"
                         :items="UIschedulesByDoctor"
                         :disableItems="UIdisableTimes"
                         :itemSelected="UItimeSelected"
                         :noBorder="true"
                         :autoCloseOnSelected="true"
                         @gridSelectorBoxed:onChange="saveDoctorTIme" />
    </Card>
    <Card id="appointment-edit-location-card"
          title="appointment.titles.location"
          :icon="UIlocaltionIconStatus.icon"
          :iconColor="UIlocaltionIconStatus.color">

      <LocationMap ref="locationMap"
                   placeHolder="appointment.treatment.address"
                   :zoom="UImapZoom"
                   :addresses="UIaddresses"
                   :showMap="false"
                   :readOnly="false"
                   @addressSelected="commitAddressSelected" />
    </Card>
    <Card id="appointment-edit-save"
          :noTitle="true"
          v-show="UIreadyToSave">
      <div class="flex-column flex-align-first-center">
        <button class="save"
                @click="saveAppointment">{{ $t("appointment.actions.save") }}</button>
      </div>
    </Card>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
      'UIdoctorSelected',
      'UItreatmentsShowOpen',
      'UIappointmentIconStatus',
      'UIdoctorIconStatus',
      'UIlocaltionIconStatus',
      'UIreadyToSave',
      'UImapZoom',
      'UIaddresses',
      'UIschedulesByDoctor',
      'UIinitDate',
      'UIdoctors',
      'UItreatmentsByDoctor',
      'UIdisableDates',
      'UIdisableTimes',
      'UItreatmentSelected',
      'UIdateSelected',
      'UItimeSelected'
    ])
  },
  methods: {
    ...mapActions('appointment', [
      'loadDoctorTreatments',
      'loadDoctorSchedule',
      'loadDoctorTimeSchedule',
      'saveDoctorTIme',
      'saveAppointment',
      'commitAddressSelected'
    ])
  },
  created() {
    this.$store.dispatch('appointment/fetchInitDatas', this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
@import 'animate.css/animate.min.css';
@import '../../common/styles/base.scss';
.appointment-edit-page {
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
.save {
  color: $colorBlue1;
  font-size: 1.3em;
  font-weight: bold;
}
</style>
