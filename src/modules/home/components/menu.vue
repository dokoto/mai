<template>
  <section class="menu">
    <HomeMenuItem className="pastel-orange" :icon="calendarIcon" :calendarUrl="calendarUrl" />
    <HomeMenuItem className="pastel-pink" :icon="emailIcon" url="/email" />
    <HomeMenuItem className="pastel-blue" :icon="chatIcon" url="/chat" />
    <HomeMenuItem className="pastel-yellow" :icon="phoneIcon" url="/phone" />
  </section>
</template>

<script>
import moment from "moment";

import HomeMenuItem from "./menuItem";
import calendarIcon from '../../../app/assets/img/icon-calendar.png';
import emailIcon from '../../../app/assets/img/icon-email.png';
import chatIcon from '../../../app/assets/img/icon-chat.png';
import phoneIcon from '../../../app/assets/img/icon-phone.png';

moment.locale(LANGUAGE);

export default {
  props: ['userId'],
  components: { HomeMenuItem },
  data () {
    return {
      calendarIcon,
      emailIcon,
      chatIcon,
      phoneIcon,
    }
  },
  computed: {
    calendarUrl: function () {
      return `/calendar/${this.userId}/${moment().format("YYYY")}/${moment().format("M")}/${moment().format("D")}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  padding-top: 3%;
  margin-left: 3%;
  padding-bottom: 3%;
  margin-right: 3%;
  margin-bottom: 3%;
  display: inline-flex;
  flex-direction: row;
  background-color: white;
  justify-content: space-evenly;
}
</style>

