<template>
  <div :class="['appointment-detail-container', 'box', 'flex-column', 'relative', !indexes.length ? 'goodDay':'']"
       ref="appointmentDetail"
       v-touch:swipe.left="moveRight"
       v-touch:swipe.right="moveLeft">
    <div class="indexes flex-row flex-align-first-center flex-align-second-center">
      <div class="circle"
           ref="index"
           v-if="indexes.length > 0"
           v-for="(index, i) in indexes"
           :class="{selected: index}"
           :key="i" />
    </div>
    <div class="track grow-2 flex-row flex-align-first-corners"
         v-if="appointments.length"
         ref="track">
      <div class="carrousel-item flex-column flex-align-first-corners grow-2 shrink-0"
           ref="item"
           v-for="(appointment, index) in appointments"
           :id="appointment.id"
           @click="() => $router.push({ name: 'appointmentView', params: { id: appointment.id } })"
           :key="index">
        <div :class="['header-pic', treatmentClass(index)]"
             ref="headerPic" />
        <div class="img-box"
             ref="docPic">
          <img class="img"
               :src="appointment.doctor.picture || defaultDocPicture" />
        </div>
        <div class="appoinment-details flex-row flex-align-space-around">
          <div class="flex-row flex-align-second-baseline">
            <font-awesome-icon :icon="iconDoc"
                               color="grey"
                               size="1x" />
            <span class="text">{{ appointment.doctor.name }}</span>
          </div>
          <div class="flex-row flex-align-second-baseline">
            <font-awesome-icon :icon="iconTime"
                               color="grey"
                               size="1x" />
            <span class="text">{{ appointment.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
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
  watch: {
    appointments: function(val) {
      if (this.$refs.track) {
        this.$refs.track.scrollTo({ left: 0 });
      }
      this.indexes = val.map((k, i) => i === 0);
    }
  },
  data: function() {
    return {
      indexes: [],
      iconTime: faClock,
      iconDoc: faUserMd,
      defaultDocPicture: defaultProfile,
      defaultPicture: defaultTherapy
    };
  },
  updated() {
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
      const index = this.$refs.index.findIndex($el =>
        $el.className.includes('selected')
      );
      if (index < this.appointments.length - 1) {
        const $track = this.$refs.track;
        $track.scrollTo({
          left: $track.scrollLeft + get(this.$refs, 'item[0].offsetWidth', 0),
          behavior: 'smooth'
        });
        this.indexes = this.indexes.map((k, i) => i === index + 1);
      }
    },
    moveLeft() {
      const index = this.$refs.index.findIndex($el =>
        $el.className.includes('selected')
      );
      if (index > 0) {
        const $track = this.$refs.track;
        $track.scrollTo({
          left: $track.scrollLeft - get(this.$refs, 'item[0].offsetWidth', 0),
          behavior: 'smooth'
        });
        this.indexes = this.indexes.map((k, i) => i === index - 1);
      }
    },
    treatmentClass(index) {
      const key = get(this.appointments[index], 'treatment[0].key', '');
      if (key === 'fisiotherapy') {
        return 'fisiotherapy';
      } else if (key === 'osteopaty') {
        return 'osteopathy';
      } else if (key === 'M.A.I.') {
        return 'mai';
      }
      return 'fisiotherapy';
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

  &.goodDay {
    background-size: cover;
    background-repeat: space;
    border-radius: 5px;
    background-color: transparent;
    background-image: url('../../../assets/img/goodday-bg.png');
  }

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
        width: 12px;
        height: 12px;
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
      &.osteopathy {
        background-image: url('../../../assets/img/osteopathy-bg.jpg');
      }
      &.mai {
        background-image: url('../../../assets/img/mai-bg.jpg');
      }
      &.fisiotherapy {
        background-image: url('../../../assets/img/fisioterapia-bg.jpg');
      }
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
        border: solid 2px white;
      }
    }
  }
}
</style>

