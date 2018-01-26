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
        @enter="animateSlideDown"
        @leave="animateSlideUp">
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
import * as maps from '../utils.map';
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
  created() {
    if (this.readOnly) {
    }
  },
  data() {
    return {
      defaulMapImage: picDefaultStaticMap,
      icon: faMapMarkerAlt,
      hasShowMap: this.showMap,
    };
  },
  methods: {
    handleInputBoxedClicked(ev) {
      this.hasShowMap = !this.hasShowMap;
    },
    animateSlideDown(el, done) {
      $(el).slideDown('slow', function () {
        done();
      });
    },
    animateSlideUp(el, done) {
      $(el).slideUp('slow', function () {
        done();
      });      
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
