<template>
  <section class="location box">
    <InputBoxed :id="ids.idInput"
      :placeHolder="placeHolder"
      :value="address"
      :icon="icon"
      :readOnly="readOnly"
      v-on:handleInputBoxedClick="handleInputBoxedClicked"
      class="map-autocomplete" />
      <transition name="fade"
        @before-enter="animateSlideDown"
        @leave="animateSlideUp"
        :css="false">
        <div :id="ids.idMap" class="map" v-show="hasShowMap">      
          <StaticMap :address="address" :size="staticMapSize" v-if="readOnly" />
        </div>
      </transition>
  </section>
</template>

<script>
/**
 * GEOCODING
 * https://github.com/Carrooi/Js-GoogleMapsLoader
 */
import $ from 'jquery';
import GoogleMapsLoader from 'google-maps';
import InputBoxed from './InputBoxed.vue';
import StaticMap from './StaticMap.vue';
import LocationMap from './LocationMap';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';
import picDefaultStaticMap from '../../../static/img/default-static-map.png';

export default {
  props: {
    id: {
      type: String,
      default: 'locationMap',
    },
    address: {
      type: String,
    },
    zoom: {
      type: Number,
      default: 15,
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
    apikey: {
      type: String,
      default: 'AIzaSyBnnYz5MN9EkxI-lmKNLE1GvxkqvrxPDvQ',
    },
  },
  components: { InputBoxed, StaticMap },
  computed: {
    staticMapSize: function() {
      return {
        width: 400,
        height: 200,
      };
    },
    ids: function() {
      return {
        idInput: `${this.id}-inputboxed-map`,
        idMap: `${this.id}-map`,
      };
    },
  },
  async mounted() {
    if (!this.readOnly) {
      const $map = $(`#${this.ids.idMap}`).first();
      const $autoCompleInput = $(`#${this.ids.idInput} input`).first();
      await this.locationMap.activateGoogleMaps();
      this.locationMap.activateAutoComplete($autoCompleInput);
      this.locationMap.renderDynamicMap($map, this.zoom, this.address || this.placeHolder); 
    }
  },
  data() {
    return {
      defaulMapImage: picDefaultStaticMap,
      icon: faMapMarkerAlt,
      hasShowMap: this.showMap,
      locationMap: new LocationMap(this.apikey, ['places']),
    };
  },
  methods: {
    handleInputBoxedClicked(ev) {
      this.hasShowMap = !this.hasShowMap;
    },
    handleResizeMap() {
      this.locationMap.resize();
    },
    animateSlideDown(el) {
      $(el).slideDown('slow', !this.readOnly ? this.handleResizeMap : null);
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', function() {
        done();
      });
    },
  },
  beforeDestroy() {
    this.locationMap.releaseGoogleMaps();
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