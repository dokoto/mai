/*
  MIRA ESTA:
  https://webdesign.tutsplus.com/es/articles/css3-transitions-and-transforms-from-scratch--webdesign-4975
*/

<template>
  <section class="therapist-carrusel box">
    <span class="therapist-carrusel-item">
      <span class="therapist-img-box">
        <img class="therapist-img" src="../../app/assets/img/therapist-1.jpg" />
      </span>
      <span class="h-separator"></span>
      <span class="therapist-name">Maria del Bosque Martin Perez Castro</span>
    </span>
    <span class="therapist-carrusel-item">
      <span class="therapist-img-box">
        <img class="therapist-img" src="../../app/assets/img/therapist-1.jpg" />
      </span>
      <span class="h-separator"></span>
      <span class="therapist-name">Maria del Bosque Martin Perez Castro</span>
    </span>
    <span class="therapist-carrusel-item">
      <span class="therapist-img-box">
        <img class="therapist-img" src="../../app/assets/img/therapist-1.jpg" />
      </span>
      <span class="h-separator"></span>
      <span class="therapist-name">Maria del Bosque Martin Perez Castro</span>
    </span>
  </section>
</template>

<script>
import "slick-carousel";

export default {
  mounted() {
    $(".therapist-carrusel").slick({
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 2
    });
  }
};
</script>

<style lang="scss">
@import "node_modules/slick-carousel/slick/slick.scss";
@import "../app.scss";

.slick-slide img {
  display: inline-flex;
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
  width: auto !important;
  margin-right: 10px;
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
  font-size: 0.8em;
}
</style>
