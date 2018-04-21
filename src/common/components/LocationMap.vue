<template>
  <section class="location">
    <InputBoxed :id="ids.idInput"
                :placeHolder="placeHolder"
                :value="address"
                :icon="icon"
                :readOnly="readOnly"
                @handleInputBoxedClick="handleInputBoxedClicked"
                class="map-autocomplete" />
    <transition name="fade"
                @before-enter="animateSlideDown"
                @leave="animateSlideUp"
                :css="false">
      <div :id="ids.idMap"
           class="map"
           :class="[ readOnly ? 'dynamic-height' : 'static-height' ]"
           v-show="hasShowMap">
        <StaticMap :address="address"
                   :size="staticMapSize"
                   v-if="readOnly" />
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
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';
import InputBoxed from './InputBoxed';
import StaticMap from './StaticMap';
import GeoMapper from '../GeoMapper';
import picDefaultStaticMap from '../../../static/img/default-static-map.png';

export default {
  props: {
    id: {
      type: String,
      default: 'locationMap'
    },
    address: {
      type: String
    },
    zoom: {
      type: Number,
      default: 15
    },
    placeHolder: {
      type: String,
      default: 'Address'
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    showMap: {
      type: Boolean,
      default: false
    },
    apikey: {
      type: String,
      default: 'AIzaSyBnnYz5MN9EkxI-lmKNLE1GvxkqvrxPDvQ'
    }
  },
  components: { InputBoxed, StaticMap },
  computed: {
    staticMapSize: function() {
      return {
        width: 400,
        height: 200
      };
    },
    ids: function() {
      return {
        idInput: `${this.id}-inputboxed-map`,
        idMap: `${this.id}-map`
      };
    }
  },
  watch: {
    address: function() {
      this.updateMap(this.address);
    }
  },
  async mounted() {
    if (!this.readOnly) {
      const $map = $(`#${this.ids.idMap}`).first();
      const $autoCompleInput = $(`#${this.ids.idInput} input`).first();
      await this.geoMapper.activateGoogleMaps();
      this.geoMapper.activateAutoComplete($autoCompleInput);
      this.geoMapper.renderDynamicMap(
        $map,
        this.zoom,
        this.address || this.placeHolder
      );
    }
  },
  data() {
    return {
      defaulMapImage: picDefaultStaticMap,
      icon: faMapMarkerAlt,
      hasShowMap: this.showMap,
      geoMapper: new GeoMapper(this.apikey, ['places'])
    };
  },
  methods: {
    updateMap(address) {
      const $map = $(`#${this.ids.idMap}`).first();
      this.geoMapper.renderDynamicMap($map, this.zoom, address);
    },
    handleInputBoxedClicked(address) {
      this.hasShowMap = !this.hasShowMap;
      this.updateMap(address);
    },
    handleResizeMap() {
      this.geoMapper.resize();
    },
    animateSlideDown(el) {
      $(el).slideDown('slow', !this.readOnly ? this.handleResizeMap : null);
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', () => done());
    }
  },
  beforeDestroy() {
    this.geoMapper.releaseGoogleMaps();
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
.location {
  .address {
    font-family: Arial, Tahoma, HelveticaNeue;
    font-size: 0.8em;
    margin-left: 2%;
    margin-top: 2%;
  }
  .map {
    margin-top: 1%;
    border-radius: 5px;
    &.static-height {
      height: 200px;
    }
    &.dynamic-height {
      height: auto;
    }
  }
}
</style>
