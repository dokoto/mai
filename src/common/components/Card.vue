<template>
   <section :id="id" class="card white-box">
      <div class="title-section flex-row flex-align-first-corners flex-align-second-center">
        <span class="title">{{ title }}</span>
        <font-awesome-icon :icon="icon" :color="iconColor" :size="iconSize"/>
      </div>
      <slot />
   </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: String,
      default: 'white-card',
    },
    title: {
      type: String,
      default: 'title',
    },
    icon: {
      default: function() {
        return faCheckCircle;
      }
    },
    iconColor: {
      default: 'green',
    },
    iconSize: {
      default: '2x',
    },
  }
}
</script>


<style lang="scss" scoped>
@import '../styles/base.scss';
.card {
  font-family: Arial, Tahoma, HelveticaNeue;
  &.white-box {
    margin-right: 2%;
    margin-left: 2%;
    margin-top: 2%;
    padding: 2%;
    background-color: $colorWhite0;
  }
  .title-section {
    padding: 2%;
    background-color: $colorWhite2;
    border-color: $colorGrey4;
    margin-bottom: 3%;
    .title {
      font-size: 1.3em;
      font-weight: bold;
      color: $colorDarkGrey3;
    }
  }
}
</style>
