<template>
  <div class="static-map-container">
    <img :id="id" :src="defaulMapImage" />
  </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps';
import picDefaultStaticMap from '../../../static/img/default-static-map.png';

export default {
  props: {
    id: {
      type: String,
      default: 'static-map',
    },
    address: {
      type: String,
      default: 'Calle Antillon, 4 28011 Madrid España',
    },
    size: {
      type: Object,
      default: function() {
        return {
          width: 320,
          height: 240,
        };
      },
    },
    apiKey: {
      type: String,
      default: 'AIzaSyBnnYz5MN9EkxI-lmKNLE1GvxkqvrxPDvQ',
    },
    zoom: {
      type: Number,
      default: 15,
    },
  },
  data() {
    return {
      defaulMapImage: picDefaultStaticMap,
      locationMap: new LocationMap(this.apikey),
    };
  },
  async mounted() {
    const center = await this.locationMap.geocodeAddress(this.address);
    const blob = await this.locationMap.getStaticMapImage(
      center,
      this.zoom,
      this.size,
    );
    const objectUrl = URL.createObjectURL(blob);
    const img = document.querySelector('#static-map');
    img.src = objectUrl;
  },
};
</script>

<style lang="scss" scoped>
.static-map-container {
  width: 100%;
  text-align: center;  
  img {
    width: 100%;
  }
}
</style>
