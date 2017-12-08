<template>
  <section class="therapist-carrusel box">
    <span class="therapist-carrusel-item" v-for="therapist in therapists" :key="therapist.id">
      <span class="therapist-img-box">
        <img class="therapist-img" :src="therapist.thumb" />
      </span>
      <div class="wrapper">
        <span class="h-separator"></span>
        <span class="therapist-name">{{ therapist.name }}</span>
      </div>
    </span>
  </section>
</template>

<script>
import $ from 'jquery';
import 'slick-carousel';

export default {
  props: ['therapists'],
  mounted() {
    $('.therapist-carrusel').slick({
      arrows: true,
      dots: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  },
};
</script>

<style lang="scss">
@import 'node_modules/slick-carousel/slick/slick.scss';
@import '../styles/base.scss';

.slick-slide img {
  display: inline-flex;
}
.slick-next {
  background-image: url('../../../static/img/next.png');
  background-repeat: no-repeat;
  width: 20px;
  background-size: contain;
  background-position-y: center;
  background-color: transparent;
  border: 0px;
  font-size: 0;
  outline: none;
}

.slick-prev {
  background-image: url('../../../static/img/back.png');
  background-repeat: no-repeat;
  width: 20px;
  background-size: contain;
  background-position-y: center;
  background-color: transparent;
  border: 0px;
  font-size: 0;
  outline: none;
}

.therapist-carrusel {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: solid;
  border-bottom-color: #ddd;
  padding-bottom: 4%;
  padding: 2%;
}

.therapist-carrusel-item {
  display: inline-flex !important;
  flex-direction: column;
  /*width: auto !important;
  margin-right: 10px;*/
  .wrapper {
    display: inline-flex !important;
    flex-direction: column;
  }
}
.therapist-img-box {
  text-align: center;
}

.therapist-img {
  width: 100px;
  border-radius: 50%;
}

.h-separator {
  height: 2px;
  margin: 4% 0%;
  background: #c5c4c4;
}

.therapist-name {
  text-align: center;
  font-size: 0.7em;
}
</style>
