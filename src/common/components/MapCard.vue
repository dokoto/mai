<template>
  <section class="location box">
    <div class="address">{{ therapistAdress.formatted_address }}</div>
    <div class="map" id="map"></div>
  </section>
</template>

<script>
/**
 * GEOCODING
 * https://github.com/Carrooi/Js-GoogleMapsLoader
 */
import GoogleMapsLoader from 'google-maps';

export default {
  props: ['therapistAdress', 'mapZoom'],
  created() {
    GoogleMapsLoader.KEY = process.env.MAPS_KEY;
    GoogleMapsLoader.load(google => {
      const map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        zoom: this.mapZoom,
        center: this.therapistAdress.localtion,
      });
      const marker = new google.maps.Marker({
        position: this.therapistAdress.localtion,
        map,
      });
      marker.setMap(map);
    });
  },
  beforeDestroy() {
    GoogleMapsLoader.release(console.log('Google API released'));
  },
};
</script>

<style lang="scss" scoped>
.location {
  margin-bottom: 2%;
  margin-top: 2%;
  .address {
    font-size: 0.8em;
    margin-left: 2%;
    margin-top: 2%;
  }
  .map {
    height: 200px;
    margin-top: 1%;
  }
}
</style>


