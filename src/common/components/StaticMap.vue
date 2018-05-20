<template>
  <div class="static-map-container">
    <router-link :to="linkGoogleMaps">
      <img :id="id"
           ref="staticMap"
           :src="defaulMapImage" />
    </router-link>
  </div>
</template>

<script>
import { EMPTY_STRING } from '@/common/constants';
import GeoMapper from '../GeoMapper';
import picDefaultStaticMap from '../../../static/img/default-static-map.png';

export default {
  props: {
    id: {
      type: String,
      default: 'static-map'
    },
    address: {
      type: String,
      default: 'Calle Antillon, 4 28011 Madrid España'
    },
    size: {
      type: Object,
      default: function() {
        return {
          width: 320,
          height: 240
        };
      }
    },
    apikey: {
      type: String,
      default: 'AIzaSyBnnYz5MN9EkxI-lmKNLE1GvxkqvrxPDvQ'
    },
    zoom: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      defaulMapImage: picDefaultStaticMap,
      geoMapper: new GeoMapper(this.apikey),
      position: {}
    };
  },
  computed: {
    linkGoogleMaps: function() {
      if (this.position.center) {
        return `https://www.google.com/maps/search/?api=1&query=${
          this.position.center.lat
        },${this.position.center.lng}&zoom=${this.zoom}`;
      }
      return EMPTY_STRING;
    }
  },
  async mounted() {
    this.position = await this.geoMapper.geocodeAddress(this.address);
    const blob = await this.geoMapper.getStaticMapImage(
      this.position.center,
      this.zoom,
      this.size
    );
    const objectUrl = URL.createObjectURL(blob);
    this.$refs.staticMap.src = objectUrl;
  }
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
