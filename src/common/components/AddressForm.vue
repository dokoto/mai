<template>
  <section class="address"
           :id="id">
    <div class="flex-column flex-align-first-corners">
      <InputBoxed id="new-address"
                  :placeHolder="$t(addressPlaceHolder)"
                  :noIcon="true"
                  :value="address"
                  :readOnly="false"
                  class="map-autocomplete edit" />
      <InputBoxed id="new-floor"
                  :placeHolder="$t(floorPlaceHolder)"
                  :noIcon="true"
                  :value="floor"
                  :readOnly="false"
                  class="edit" />
      <InputBoxed id="postal-code"
                  :placeHolder="$t(postalCodePlaceHolder)"
                  :noIcon="true"
                  :value="postalCode"
                  :readOnly="false"
                  class="edit" />
    </div>
    <Collapsible>
      <div id="edit-map"
           class="map"
           :class="[ readOnly ? 'dynamic-height' : 'static-height' ]"
           v-show="hasShowMap">
        <StaticMap :address="address"
                   :size="staticMapSize"
                   v-if="readOnly" />
      </div>
    </Collapsible>
  </section>
</template>

<script>
import Collapsible from './Collapsible';
import InputBoxed from './InputBoxed';
import StaticMap from './StaticMap';
import GeoMapper from '../GeoMapper';
import picDefaultStaticMap from '../../../static/img/default-static-map.png';

export default {
  components: { InputBoxed, StaticMap, Collapsible },
  props: {
    id: {
      type: String,
      default: 'new-address'
    },
    address: {
      type: String
    },
    addressPlaceHolder: {
      type: String,
      default: 'Street, City Country'
    },
    floor: {
      type: String
    },
    zoom: {
      type: Number,
      default: 15
    },
    floorPlaceHolder: {
      type: String,
      default: 'Floor or Room number'
    },
    postalCode: {
      type: String
    },
    readOnly: {
      type: Boolean,
      default: true
    },
    postalCodePlaceHolder: {
      type: String,
      default: '[Optional] Postal code'
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
  computed: {
    staticMapSize: function() {
      return {
        width: 400,
        height: 200
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
      const $map = document.querySelector('#edit-map');
      const $autoCompleInput = document.querySelector('#new-address input');
      await this.geoMapper.activateGoogleMaps();
      this.geoMapper.activateAutoComplete(
        $autoCompleInput,
        this.handleAutoCompleteFinish
      );
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
      hasShowMap: this.showMap,
      showEdit: false,
      geoMapper: new GeoMapper(this.apikey, ['places'])
    };
  },
  methods: {
    handleAutoCompleteFinish(street) {
      this.$emit('autoCompleteFinish', street);
      this.hasShowMap = true;
      this.updateMap(street);
      this.geoMapper.resize();
    },
    async updateMap(street) {
      const $map = document.querySelector('#edit-map');
      this.geoMapper
        .renderDynamicMap($map, this.zoom, street)
        .then(() => this.$emit('newAddress', this.geoMapper.addressComponents));
    },
    handleResizeMap() {
      this.geoMapper.resize();
    }
  },
  beforeDestroy() {
    this.geoMapper.releaseGoogleMaps();
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
.address {
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
}
</style>
