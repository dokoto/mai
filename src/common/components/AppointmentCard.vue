<template>
  <div class="sessionCard box"
    :id="id"
    v-on:click="handleAppointmentCardClick">
    <span class="date">{{ formatDateTime }}</span>
    <span class="name"
      :class="{ marginxl: !withTimeInterval }">{{ treatmentLocated.name }}</span>
    <span class="time-interval"
      v-if="withTimeInterval">{{ timeBegin }} &#8680; {{ timeEnd }}</span>
  </div>
</template>

<script>
import moment from 'moment';
import * as consts from '../../common/constants';
moment.locale(window.glob.language);
export default {
  props: {
    id: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    treatment: {
      type: Array,
    },
    withTimeInterval: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    treatmentLocated() {
      return this.treatment.reduce(
        (curr, next) => (next.lang === window.glob.language ? next : curr),
        {},
      );
    },
    formatDateTime() {
      return moment(`${this.date}`, consts.INT_DATE_FORMAT)
        .format('dddd D MMMM')
        .toUpperCase();
    },
    timeBegin() {
      return moment(`${this.date} ${this.time}`, consts.INT_DATE_FORMAT).format('hh:mm A');
    },
    timeEnd() {
      return moment(`${this.date} ${this.time}`, consts.INT_DATE_FORMAT)
        .add(45, 'm')
        .format('hh:mm A');
    },
  },
  methods: {
    handleAppointmentCardClick(ev) {
      this.$emit('appointmentCardClick', ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
.sessionCard {
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  flex-shrink: 0;
  .date {
    font-size: 1em;
    font-weight: bold;
    margin-top: 3%;
    margin-left: 3%;
  }
  .name {
    font-size: 1.6em;
    margin-top: 1%;
    margin-left: 3%;
  }
  .marginxl {
    margin-bottom: 3%;
  }
  .time-interval {
    font-size: 1.6em;
    color: $colorGrey1;
    margin-left: 2%;
    margin-top: 2%;
  }
}
</style>
