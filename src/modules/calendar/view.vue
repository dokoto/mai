<template>
  <!--
  Idea !!!
  poner una foto de algo relacionado con la fisioterapia de fondo que ocupe el 70% del alto y el 100% del ancho sin paddin
  luego meter la foto de la doctor en la parte inferior de lo enterior alineado al centro del final de la foto.
  Y en la parte de abajo se meten los datos de la hora, la terapia y doctora y direccion.
  -->
  <article class="calendar-page container font-size">
    <HeaderCalendar :selectedDate="UISelectedDate" />
    <DayCarrusel id="day-carrusel"
                 :initDate="initDate"
                 :selectedDate="UISelectedDate"
                 :numberOfMonths="monthsAHead"
                 @dayCarruselDayClick="setNewDate"
                 class="box shrink-0" />
    <div class="appointment-detail-container box flex-column flex-align-first-corners"
         ref="appointmentDetail"
         v-if="UIappointments.length">
      <div class="header-pic"
           ref="headerPic" />
      <div class="img-box"
           ref="docPic">
        <img class="img"
             :src="UIappointments[0].doctor.picture || defaultDocPicture" />
      </div>
      <div class="appoinment-details flex-row flex-align-space-around">
        <div class="flex-row flex-align-second-baseline">
          <font-awesome-icon :icon="iconDoc"
                             color="grey"
                             size="1x" />
          <span class="text">{{ UIappointments[0].doctor.name }}</span>
        </div>
        <div class="flex-row flex-align-second-baseline">
          <font-awesome-icon :icon="iconTime"
                             color="grey"
                             size="1x" />
          <span class="text">{{ UIappointments[0].time }}</span>
        </div>
      </div>
    </div>
    <div class="request box flex-row flex-align-second-center rounded padding-2x">
      <font-awesome-icon :icon="iconAdd"
                         class="action"
                         size="2x" />
      <span class="text">Solicitar Cita</span>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formatDateNumeric } from '@/common/utils';
import { MONTHS_AHEAD } from '@/common/constants';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faClock } from '@fortawesome/fontawesome-free-regular';
import { faUserMd, faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import DayCarrusel from '@/common/components/DayCarrusel';
import defaultProfile from '@/assets/img/default.png';
import defaultTherapy from '@/assets/img/therapy-symbol.png';
import HeaderCalendar from './components/header';

export default {
  components: {
    HeaderCalendar,
    DayCarrusel,
    FontAwesomeIcon
  },
  data: function() {
    return {
      iconTime: faClock,
      iconDoc: faUserMd,
      iconAdd: faPlusCircle,
      defaultDocPicture: defaultProfile,
      defaultPicture: defaultTherapy,
      doctorMakedAsSelected: '',
      monthsAHead: MONTHS_AHEAD,
      initDate: formatDateNumeric()
    };
  },
  computed: {
    ...mapState('calendar', ['UISelectedDate', 'UIappointments']),
    tmpTreatment: function() {
      return this.UIappointments[0].treatment.filter(
        item => item.lang === window.glob.language
      )[0].name;
    }
  },
  updated: function() {
    this.$nextTick(function() {
      if (
        this.$refs.headerPic &&
        this.$refs.docPic &&
        this.$refs.appointmentDetail
      ) {
        const appointmentDetail = this.$refs.appointmentDetail;
        const porcen =
          window.innerHeight > 800 ? 80 : window.innerHeight > 500 ? 70 : 60;
        const newHeight = appointmentDetail.offsetHeight * porcen / 100;
        const headerPic = this.$refs.headerPic;
        headerPic.style.height = `${newHeight}px`;
        const docPic = this.$refs.docPic;
        docPic.style.top = `${newHeight - docPic.offsetHeight / 2}px`;
      }
    });
  },
  methods: {
    ...mapActions('calendar', ['setNewDate'])
  },
  created() {
    this.$store.dispatch('calendar/init');
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/styles/base.scss';

$image-size: 4em;

.font-size {
  font-size: 6.2vw;
}
.calendar-page {
  position: relative;
  display: inline-flex;
  flex-direction: column;

  &.container {
    width: 100%;
    height: 100%;
  }

  .action {
    color: $colorBlue2;
  }

  .request {
    margin-bottom: 0.5em;
    .text {
      margin-left: 1.2em;
    }
  }

  .appointment-detail-container {
    font-family: Arial, Tahoma, HelveticaNeue;
    border-radius: 5px;
    flex-grow: 2;
    position: relative;
    .header-pic {
      background-image: url('../../assets/img/fisioterapia-bg.jpg');
      background-size: cover;
      background-repeat: space;
      border-radius: 5px 5px 0 0;
    }
    .appoinment-details {
      margin-bottom: 3%;
      .text {
        font-size: 1.2em;
        margin-left: 0.3em;
      }
    }
    .img-box {
      position: absolute;
      text-align: center;
      width: 100%;

      .img {
        height: $image-size;
        width: $image-size;
        border-radius: 50%;
      }
    }
  }
}
</style>
