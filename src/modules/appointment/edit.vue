<template>
  <section>
    <article class="appointment-edit-page font-size bg-beach"
             :class="{blur: UIopenNewAddress}">
      <div class="symbol-container">
        <img class="symbol"
             src="@/assets/img/therapy-symbol.png" />
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
          <button class="button"
                  @click="saveAppointment">{{ $t("appointment.actions.save") }}</button>
        </div>
      </Card>
    </article>
    <transition enter-active-class="animated bounceInDown"
                leave-active-class="animated bounceOutUp"
                @before-enter="setTopDistance">
      <div id="new-address-container"
           ref="newAddress"
           class="full-screen flex-column flex-align-first-center font-size"
           v-show="UIopenNewAddress">
        <Card id="appointment-new-address"
              :title="$t('appointment.newAddress.title')">
          <AddressForm :readOnly="false"
                       addressPlaceHolder="appointment.newAddress.placeHolders.street"
                       floorPlaceHolder="appointment.newAddress.placeHolders.floor"
                       postalCodePlaceHolder="appointment.newAddress.placeHolders.postalCode"
                       @saveNewAddress="saveNewAddress" />
        </Card>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ComboBoxed from '@/common/components/ComboBoxed';
import DayCarruselBoxed from '@/common/components/DayCarruselBoxed';
import GridSelectorBoxed from '@/common/components/GridSelectorBoxed';
import DoctorsCarrusel from '@/common/components/DoctorsCarrusel';
import Card from '@/common/components/Card';
import AddressForm from './components/AddressForm';
import LocationMap from './components/LocationMap';

export default {
  components: {
    Card,
    DoctorsCarrusel,
    ComboBoxed,
    DayCarruselBoxed,
    GridSelectorBoxed,
    LocationMap,
    AddressForm
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
      'UItimeSelected',
      'UIopenNewAddress'
    ])
  },
  methods: {
    ...mapActions('appointment', [
      'loadDoctorTreatments',
      'loadDoctorSchedule',
      'loadDoctorTimeSchedule',
      'saveDoctorTIme',
      'saveAppointment',
      'commitAddressSelected',
      'saveNewAddress'
    ]),
    setTopDistance() {
      this.$refs.newAddress.style.top = `${window.scrollY}px`;
    }
  },
  created() {
    this.$store.dispatch('appointment/init', this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
@import 'animate.css/animate.min.css';
@import '../../common/styles/base.scss';
.font-size {
  font-size: 6.2vw;
}
.appointment-edit-page {
  overflow-y: scroll;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  margin-bottom: 2%;
}
.blur {
  filter: blur(5px);
}
.full-screen {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
