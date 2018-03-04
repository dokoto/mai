<template>
  <section class="menu">
    <HomeMenuItem className="pastel-orange"
      :icon="calendarIcon"
      :calendarUrl="calendarUrl" />
    <HomeMenuItem className="pastel-pink"
      :icon="emailIcon"
      url="/email" />
    <HomeMenuItem className="pastel-blue"
      :icon="chatIcon"
      url="/chat" />
    <HomeMenuItem className="pastel-yellow"
      :icon="phoneIcon"
      url="/phone" />
  </section>
</template>

<script>
import moment from 'moment';

import HomeMenuItem from './menuItem.vue';
import calendarIcon from '../../../../static/img/icon-calendar.png';
import emailIcon from '../../../../static/img/icon-email.png';
import chatIcon from '../../../../static/img/icon-chat.png';
import phoneIcon from '../../../../static/img/icon-phone.png';
import * as consts from '../../../common/constants.js'

moment.locale(window.glob.language);

export default {
  props: ['userId'],
  components: { HomeMenuItem },
  data() {
    return {
      calendarIcon,
      emailIcon,
      chatIcon,
      phoneIcon,
    };
  },
  computed: {
    calendarUrl() {
      return `/calendar/${ this.userId }/${ moment().add(1, 'days').format(consts.INT_DATE_FORMAT) }`;
    },
  },
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
  border-radius: 5px;
}
</style>

