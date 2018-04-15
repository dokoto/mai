<template>
  <section class="menu">
    <HomeMenuItem className="pastel-orange"
                  :icon="calendarIcon"
                  url="/calendar" />
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
import calendarIcon from '@/assets/img/icon-calendar.png';
import emailIcon from '@/assets/img/icon-email.png';
import chatIcon from '@/assets/img/icon-chat.png';
import phoneIcon from '@/assets/img/icon-phone.png';
import HomeMenuItem from './menuItem';

export default {
  components: { HomeMenuItem },
  data() {
    return {
      calendarIcon,
      emailIcon,
      chatIcon,
      phoneIcon
    };
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
  border-radius: 5px;
  flex-shrink: 0;
}
</style>

