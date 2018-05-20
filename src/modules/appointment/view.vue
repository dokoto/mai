<template>
  <article class="appointment-view-page">
    <div class="symbol-container">
      <img class="symbol"
           src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="appointment-view-card"
          title="appointment.titles.appointment"
          iconColor="blue">
      <InputBoxed id="appointment-view-type"
                  placeHolder="Appointment Type"
                  :readOnly="readOnly"
                  :value="UIappointment.treatment ? treatmentByLang.name : ''"
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
                  :value="UIappointment.treatment ? UIappointment.time : ''"
                  :noBorder="noBorder"
                  :noIcon="noIcon" />
    </Card>
    <Card id="appointment-doctors-carrusel-card"
          title="appointment.titles.treatment"
          iconColor="blue">
      <DoctorsCarrusel :id="`doctors-carrusel-${$route.params.id}`"
                       :doctors="[UIappointment.doctor]"
                       :doctorSelected="UIappointment.doctor._id"
                       v-if="UIappointment.doctor" />
    </Card>
    <Card id="appointment-view-location-card"
          title="appointment.titles.location"
          iconColor="blue">
      <LocationMap :address="formatAddress"
                   :zoom="mapZoom"
                   :showMap="showMap"
                   v-if="UIappointment.address" />
    </Card>
  </article>
</template>

<script>
import moment from 'moment';
import get from 'lodash/get';
import { mapState } from 'vuex';
import { INT_DATE_FORMAT, MAP_ZOOM } from '@/common/constants';
import InputBoxed from '@/common/components/InputBoxed';
import DoctorsCarrusel from '@/common/components/DoctorsCarrusel';
import Card from '@/common/components/Card';
import LocationMap from './components/LocationMap';
import { filterLang } from './logic/functionals';

moment.locale(window.glob.language);
export default {
  components: {
    Card,
    InputBoxed,
    DoctorsCarrusel,
    LocationMap
  },
  computed: {
    ...mapState('appointment', ['UIappointment']),
    formatAddress() {
      return `${this.UIappointment.address.street} ${
        this.UIappointment.address.city
      } ${this.UIappointment.address.postCode} ${
        this.UIappointment.address.country
      }`;
    },
    formatDate() {
      return moment(`${this.UIappointment.date}`, INT_DATE_FORMAT)
        .format('dddd D MMMM')
        .toUpperCase();
    },
    treatmentByLang() {
      return get(this.UIappointment.treatment.filter(filterLang), '[0]', '');
    }
  },
  created() {
    this.$store.dispatch('appointment/fetchAppointment', this.$route.params.id);
  },
  data() {
    return {
      mapZoom: MAP_ZOOM,
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
