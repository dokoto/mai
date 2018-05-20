<template>
  <div class="appointment-detail-container box flex-column relative"
       ref="appointmentDetail"
       v-touch:swipe.left="moveRight"
       v-touch:swipe.right="moveLeft"
       v-if="appointments.length">
    <div class="indexes flex-row flex-align-first-center">
      <div class="circle"
           v-for="(item, index) in [1, 2, 3,]"
           :class="{selected: isSelected(index)}"
           :key="index" />
    </div>
    <div class="track grow-2 flex-row flex-align-first-corners"
         ref="track">
      <div class="carrousel-item flex-column flex-align-first-corners grow-2 shrink-0"
           ref="item"
           v-for="(item, index) in [1, 2, 3]"
           :key="index">
        <div class="header-pic"
             ref="headerPic" />
        <div class="img-box"
             ref="docPic">
          <img class="img"
               :src="appointments[0].doctor.picture || defaultDocPicture" />
        </div>
        <div class="appoinment-details flex-row flex-align-space-around">
          <div class="flex-row flex-align-second-baseline">
            <font-awesome-icon :icon="iconDoc"
                               color="grey"
                               size="1x" />
            <span class="text">{{ appointments[0].doctor.name }}</span>
          </div>
          <div class="flex-row flex-align-second-baseline">
            <font-awesome-icon :icon="iconTime"
                               color="grey"
                               size="1x" />
            <span class="text">{{ appointments[0].time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faClock } from '@fortawesome/fontawesome-free-regular';
import { faUserMd } from '@fortawesome/fontawesome-free-solid';
import defaultProfile from '@/assets/img/default.png';
import defaultTherapy from '@/assets/img/therapy-symbol.png';

export default {
  components: { FontAwesomeIcon },
  props: {
    appointments: {
      type: Array
    }
  },
  data: function() {
    return {
      iconTime: faClock,
      iconDoc: faUserMd,
      defaultDocPicture: defaultProfile,
      defaultPicture: defaultTherapy
    };
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
        headerPic.forEach(item => {
          item.style.height = `${newHeight}px`;
        });
        const docPic = this.$refs.docPic;
        docPic.forEach(item => {
          item.style.top = `${newHeight - item.offsetHeight / 2}px`;
        });
      }
    });
  },
  methods: {
    moveRight() {
      const $track = this.$refs.track;
      $track.scrollTo({
        left: $track.scrollLeft + this.$refs.item[0].offsetWidth,
        behavior: 'smooth'
      });
    },
    moveLeft() {
      const $track = this.$refs.track;
      $track.scrollTo({
        left: $track.scrollLeft - this.$refs.item[0].offsetWidth,
        behavior: 'smooth'
      });
    },
    isSelected(index) {
      if (this.$refs.track) {
        const $track = this.$refs.track;
        return $track.scrollWidth / this.$refs.item[0].offsetWidth === index;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../common/styles/base.scss';

$image-size: 4em;
.appointment-detail-container {
  font-family: Arial, Tahoma, HelveticaNeue;
  border-radius: 5px;
  flex-grow: 2;

  .indexes {
    position: absolute;
    top: 2%;
    width: 100%;
    z-index: 9;
    .circle {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      margin-right: 0.2em;
      background-color: $colorBlue2;
      &.selected {
        background-color: $colorGreen0;
      }
    }
  }
  .track {
    overflow-x: hidden;
  }
  .carrousel-item {
    position: relative;
    width: 100%;

    .header-pic {
      background-image: url('../../../assets/img/fisioterapia-bg.jpg');
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

