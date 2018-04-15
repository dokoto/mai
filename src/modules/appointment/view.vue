<template>
  <article class="appointment-view-page">
    <div class="symbol-container">
      <img class="symbol"
           src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="appointment-view-card"
          :title="literals.appointmentTitle"
          iconColor="blue">
      <InputBoxed id="appointment-view-type"
                  placeHolder="Appointment Type"
                  :readOnly="readOnly"
                  :value="appointment.treatment ? appointment.treatment.name : ''"
                  :noBorder="noBorder"
                  :noIcon="noIcon" />
      <InputBoxed id="appointment-view-date"
                  placeHolder="Appointment Date"
                  :readOnly="readOnly"
                  :value="formatDate"
                  :noBorder="noBorder"
                  :noIcon="noIcon" />
      <InputBoxed id="appointment-view-time"
                  placeHolder="Appointment Time"
                  :readOnly="readOnly"
                  :value="appointment.treatment ? appointment.time : ''"
                  :noBorder="noBorder"
                  :noIcon="noIcon" />
    </Card>
    <Card id="appointment-doctors-carrusel-card"
          :title="literals.treatmentTitle"
          iconColor="blue">
      <DoctorsCarrusel :id="`doctors-carrusel-${$route.params.id}`"
                       :doctors="[appointment.doctor]"
                       :doctorSelected="appointment.doctor._id"
                       v-if="appointment.doctor" />
    </Card>
    <Card id="appointment-view-location-card"
          :title="literals.locationTitle"
          iconColor="blue">
      <LocationMap :address="formatAddress"
                   :zoom="mapZoom"
                   :showMap="showMap"
                   v-if="appointment.address" />
    </Card>
  </article>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { INT_DATE_FORMAT } from '@/common/constants';
import InputBoxed from '@/common/components/InputBoxed';
import DoctorsCarrusel from '@/common/components/DoctorsCarrusel';
import LocationMap from '@/common/components/LocationMap';
import Card from '@/common/components/Card';

moment.locale(window.glob.language);
export default {
  components: {
    Card,
    InputBoxed,
    DoctorsCarrusel,
    LocationMap
  },
  computed: {
    ...mapState('appointment', ['appointment', 'mapZoom']),
    formatAddress() {
      return `${this.appointment.address.street} ${
        this.appointment.address.city
      } ${this.appointment.address.postCode} ${
        this.appointment.address.country
      }`;
    },
    formatDate() {
      return moment(`${this.appointment.date}`, INT_DATE_FORMAT)
        .format('dddd D MMMM')
        .toUpperCase();
    }
  },
  created() {
    this.$store.dispatch('appointment/fetchAppointment', this.$route.params.id);
  },
  data() {
    return {
      literals: {
        appointmentTitle: this.$i18n.t('appointment.titles.appointment'),
        treatmentTitle: this.$i18n.t('appointment.titles.treatment'),
        locationTitle: this.$i18n.t('appointment.titles.location')
      },
      readOnly: true,
      showMap: true,
      noBorder: true,
      noIcon: true
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';
.appointment-view-page {
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
