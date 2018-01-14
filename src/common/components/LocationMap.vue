<template>
  <section class="location box">
    <div class="address">{{ address.formatted_address }}</div>
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
  props: ['address', 'zoom'],
  created() {
    GoogleMapsLoader.KEY = process.env.MAPS_KEY;
    GoogleMapsLoader.load(google => {
      const map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        zoom: this.zoom,
        center: this.address.localtion,
      });
      const marker = new google.maps.Marker({
        position: this.address.localtion,
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
    font-family: Arial, Tahoma, HelveticaNeue;
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


