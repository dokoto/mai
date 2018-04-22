<template>
  <section class="location">
    <div class="flex-row">
      <InputBoxed :id="ids.idInput"
                  :placeHolder="placeHolder"
                  :value="address"
                  :noIcon="true"
                  :readOnly="true"
                  class="grow-2" />
      <div class="flex-row">
        <div class="input-icon"
             @click="handleInputBoxedClicked">
          <font-awesome-icon :icon="icon" />
        </div>
        <div class="input-icon"
             @click="handleEdit">
          <font-awesome-icon :icon="iconPencil" />
        </div>
      </div>
    </div>
    <transition name="fade"
                @before-enter="animateSlideDown"
                @leave="animateSlideUp"
                :css="false">
      <div class="flex-column flex-align-first-corners"
           v-show="showEdit">
        <InputBoxed id="new-address"
                    placeHolder="New address"
                    :noIcon="true"
                    :readOnly="false"
                    class="map-autocomplete edit" />
        <InputBoxed id="new-floor"
                    placeHolder="New Floor"
                    :noIcon="true"
                    :readOnly="false"
                    class="edit" />
        <InputBoxed id="postal-code"
                    placeHolder="Postal Code"
                    :noIcon="true"
                    :readOnly="false"
                    class="edit" />
      </div>
    </transition>
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
import $ from 'jquery';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import {
  faPencilAlt,
  faMapMarkerAlt
} from '@fortawesome/fontawesome-free-solid';
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
  components: { InputBoxed, StaticMap, FontAwesomeIcon },
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
      const $map = document.querySelector(`#${this.ids.idMap}`);
      const $autoCompleInput = document.querySelector('#new-address input');
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
      iconPencil: faPencilAlt,
      hasShowMap: this.showMap,
      showEdit: false,
      geoMapper: new GeoMapper(this.apikey, ['places'])
    };
  },
  methods: {
    async updateMap(address) {
      const $map = document.querySelector(`#${this.ids.idMap}`);
      this.geoMapper
        .renderDynamicMap($map, this.zoom, address)
        .then(() => this.$emit('newAddress', this.geoMapper.addressComponents));
    },
    handleInputBoxedClicked(ev) {
      this.hasShowMap = !this.hasShowMap;
      this.updateMap(
        ev.currentTarget.parentElement.parentElement.querySelector('input')
          .value
      );
    },
    handleEdit() {
      this.showEdit = !this.showEdit;
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
  .edit {
    margin-top: 0.3em;
  }
  .input-icon {
    width: 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $colorWhite0;
    border-bottom: 0;
    border-top: 0;
  }
}
</style>
