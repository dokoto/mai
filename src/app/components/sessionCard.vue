<template>
  <div class="sessionCard box" v-bind:id="id" v-on:click="handleSessionClick">
    <span class="date">{{ formatDateTime }}</span>
    <span class="name" v-bind:class="{ marginxl: !withTimeInterval }">{{ sessionTherapy.name }}</span>
    <span class="time-interval" v-if="withTimeInterval">{{ timeBegin }} &#8680; {{ timeEnd }}</span>
  </div>
</template>

<script>
import moment from "moment";

moment.locale(LANGUAGE);
export default {
  props: ["id", "sessionDate", "sessionTherapy", "withTimeInterval"],
  computed: {
    formatDateTime() {
      return moment(
        `${this.sessionDate.year}-${this.sessionDate.month}-${this.sessionDate
          .day} ${this.sessionDate.time}`
      )
        .format("dddd D MMMM")
        .toUpperCase();
    },
    timeBegin() {
      return moment(
        `${this.sessionDate.year}-${this.sessionDate.month}-${this.sessionDate
          .day} ${this.sessionDate.time}`
      ).format("hh:mm A");
    },
    timeEnd() {
      return moment(
        `${this.sessionDate.year}-${this.sessionDate.month}-${this.sessionDate
          .day} ${this.sessionDate.time}`
      )
        .add(45, "m")
        .format("hh:mm A");
    }
  },
  methods: {
    handleSessionClick: function(ev) {
      this.$emit("sessionClick", ev);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../app.scss";

.sessionCard {
  display: inline-flex;
  flex-direction: column;
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

