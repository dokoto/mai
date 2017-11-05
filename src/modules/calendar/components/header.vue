<template>
  <header class="calendar-header box">
    <section class="today-view">
      <span class="month-year">
        {{ yearMonth }}
      </span>
      <span class="day-name">
        {{ dayName }}
      </span>
    </section>
    <nav class="menu">
      <a href="#">
        <img :src="toDayIcon" class="icon-menu" />
      </a>
      <a :href="homeUrl">
        <img :src="homeIcon" class="icon-menu" />
      </a>
    </nav>
  </header>
</template>

<script>
import moment from "moment";
import toDayIcon from "../../../app/assets/img/icon-today.png";
import homeIcon from "../../../app/assets/img/icon-home.png";
moment.locale(LANGUAGE);

export default {
  props: ['userId'],
  computed: {
    yearMonth: function() {
      return `${moment()
        .format("MMM")
        .toUpperCase()} ${moment().format("YYYY")}`;
    },
    dayName: function() {
      return moment()
        .format("dddd")
        .toUpperCase();
    },
    homeUrl: function() {
      return `${/home/}${this.userId}`;
    }
  },
  data() {
    return {
      toDayIcon,
      homeIcon,
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../app/app.scss";

.calendar-header {
  display: inline-flex;
  flex-direction: row;

  .today-view {
    display: inline-flex;
    flex-direction: column;
    padding: 2%;
  }

  .today-view .month-year {
    font-size: 0.8em;
    color: crimson;
    font-weight: bold;
  }

  .today-view .day-name {
    font-size: 1.7em;
    font-weight: bold;
    color: crimson;
  }

  .menu {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-right: 4%;
    a {
      margin-left: 8%;
    }

    .icon-menu {
      width: 20px;
    }
  }
}
</style>

