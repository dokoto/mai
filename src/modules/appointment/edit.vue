<template>
  <article class="appointment-edit-page bg-beach">
    <div class="symbol-container">
      <img class="symbol"
           src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="appointment-edit-doctors-carrusel-card"
          title="appointment.titles.treatment"
          :icon="doctorIconStatus.icon"
          :iconColor="doctorIconStatus.color">
      <DoctorsCarrusel :id="`doctors-carrusel-${$route.params.id}`"
                       :doctors="doctors"
                       :doctorSelected="appointment.doctor ? appointment.doctor.id : ''"
                       @doctorHasSelected="loadDoctorTreatments"
                       v-if="doctors.length" />
    </Card>
    <Card id="appointment-edit-card"
          title="appointment.titles.appointment"
          :icon="appointmentIconStatus.icon"
          :iconColor="appointmentIconStatus.color">
      <ComboBoxed id="appointment-edit-treatments"
                  :noBorder="true"
                  :items="treatmentsByDoctor"
                  placeHolder="appointment.treatment.type"
                  :itemSelected="treatmentSelected"
                  :showOpen="treatmentsShowOpen"
                  :autoCloseOnSelected="true"
                  @comboBoxedItemHasSelected="loadDoctorSchedule" />
      <DayCarruselBoxed id="appointment-edit-date"
                        placeHolder="appointment.treatment.date"
                        :disablesDates="disableDates"
                        :initDate="initDate"
                        :selectedDate="dateSelected"
                        :noBorder="true"
                        :autoCloseOnSelected="true"
                        @dayCarruselBoxed:dayClick="loadDoctorTimeSchedule" />
      <GridSelectorBoxed id="appointment-edit-time"
                         placeHolder="appointment.treatment.time"
                         :items="schedulesByDoctor"
                         :disableItems="disableTimes"
                         :itemSelected="timeSelected"
                         :noBorder="true"
                         :autoCloseOnSelected="true"
                         @gridSelectorBoxed:onChange="saveDoctorTIme" />
    </Card>
    <Card id="appointment-edit-location-card"
          title="appointment.titles.location"
          :icon="localtionIconStatus.icon"
          :iconColor="localtionIconStatus.color">
      <LocationMap ref="locationMap"
                   placeHolder="appointment.treatment.address"
                   :zoom="mapZoom"
                   :address="addressSelected"
                   :showMap="false"
                   :readOnly="false"
                   @newAddress="saveNewAddress" />
    </Card>
    <Card id="appointment-edit-save"
          :noTitle="true" v-show="readyToSave">
      <div class="flex-column flex-align-first-center">
        <button class="save" @click="saveAppointment">{{ $t("appointment.actions.save") }}</button>
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
      'doctors',
      'treatmentsByDoctor',
      'schedules',
      'disableDates',
      'initDate',
      'disableTimes',
      'treatmentSelected',
      'dateSelected',
      'timeSelected',
      'treatmentsShowOpen',
      'mapZoom',
      'schedulesByDoctor',
      'addressSelected',
      'appointmentIconStatus',
      'doctorIconStatus',
      'localtionIconStatus',
      'readyToSave'
    ])
  },
  methods: {
    ...mapActions('appointment', [
      'loadDoctorTreatments',
      'loadDoctorSchedule',
      'loadDoctorTimeSchedule',
      'saveDoctorTIme',
      'saveAppointment',
      'saveNewAddress'
    ])
  },
  created() {
    this.$store.dispatch('appointment/fetchInitDatas', this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
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
