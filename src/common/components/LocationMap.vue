<template>
  <section class="location box">
    <InputBoxed :id="id"
      :placeHolder="placeHolder"
      :icon="icon"
      :readOnly="readOnly"
      v-on:handleInputBoxedClick="handleInputBoxedClicked" />
    <div class="map" v-show="showMap"      
      :id="id + 'map'">
      <img id="static-map" v-if="readOnly" :src="defaulMapImage" />
      </div>
  </section>
</template>

<script>
/**
 * GEOCODING
 * https://github.com/Carrooi/Js-GoogleMapsLoader
 */
import GoogleMapsLoader from 'google-maps';
import InputBoxed from './InputBoxed.vue';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';
import defaultStaticMap from '../../../static/img/default-static-map.png';

export default {
  props: {
    id: {
      type: String,
      default: 'locationMap',
    },
    address: {
      type: Object,
    },
    zoom: {
      type: Number,
      default: 15,
    },
    icon: {
      default: faMapMarkerAlt,
    },
    placeHolder: {
      type: String,
      default: 'Address',
    },
    readOnly: {
      type: Boolean,
      default: true,
    },
    showMap: {
      type: Boolean,
      default: false,
    },
  },
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
  data() {
    return {
      defaulMapImage: defaultStaticMap,
    };
  },
  methods: {
    handleInputBoxedClicked(ev) {
      console.log('Inputboxed cliecked')
    }
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
