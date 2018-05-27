<template>
  <article class="appointment-view-page">
    <nav class="back"
         @click="$router.go(-1)">
      <font-awesome-icon :icon="iconBack"
                         color="white"
                         size="2x" />
    </nav>
    <div class="symbol-container">
      <img class="symbol"
           src="../../../static/img/therapy-symbol.png" />
    </div>
    <Card id="appointment-view-card"
          title="appointment.titles.appointment"
          iconColor="blue">
      <InputBoxed id="appointment-view-type"
                  class="font-siez-2x"
                  placeHolder="Appointment Type"
                  :readOnly="readOnly"
                  :value="UIappointment.treatment ? treatmentByLang.name : ''"
                  :noBorder="noBorder"
                  :noIcon="noIcon" />
      <InputBoxed id="appointment-view-date"
                  class="font-siez-2x"
                  placeHolder="Appointment Date"
                  :readOnly="readOnly"
                  :value="formatDate"
                  :noBorder="noBorder"
                  :noIcon="noIcon" />
      <InputBoxed id="appointment-view-time"
                  class="font-siez-2x"
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
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/fontawesome-free-regular';
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
    FontAwesomeIcon,
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
      noIcon: true,
      iconBack: faArrowAltCircleLeft
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';

.back {
  padding: 0.4em 0 0 0.4em;
}

.font-siez-2x {
  font-size: 1.4em;
  margin-bottom: 0.1em;
}

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
