<template>
  <section class="location box">
    <InputBoxed v-bind:id="id"
      v-bind:placeHolder="placeHolder"
      v-bind:icon="icon"
      v-bind:readOnly="readOnly" />
    <div class="map hide"
      id="map"></div>
  </section>
</template>

<script>
/**
 * GEOCODING
 * https://github.com/Carrooi/Js-GoogleMapsLoader
 */
import GoogleMapsLoader from 'google-maps';
import InputBoxed from './InputBoxed.vue';

export default {
  props: ['address', 'zoom', 'icon', 'placeHolder', 'readOnly'],
  components: { InputBoxed },
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
@import '../styles/base.scss';
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


