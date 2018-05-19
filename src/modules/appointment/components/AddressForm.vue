<template>
  <section class="address"
           :id="id">
    <div class="flex-column flex-align-first-corners">
      <InputBoxed id="new-address"
                  ref="address"
                  :placeHolder="$t(addressPlaceHolder)"
                  :noIcon="true"
                  :value="address"
                  :readOnly="false"
                  class="map-autocomplete edit" />
      <InputBoxed id="new-floor"
                  ref="floor"
                  :placeHolder="$t(floorPlaceHolder)"
                  :noIcon="true"
                  :value="floor"
                  :readOnly="false"
                  class="edit" />
      <InputBoxed id="postal-code"
                  ref="postalCode"
                  :placeHolder="$t(postalCodePlaceHolder)"
                  :noIcon="true"
                  :value="postalCode"
                  :readOnly="false"
                  class="edit" />
    </div>
    <Collapsible>
      <div ref="editMap"
           class="map"
           :class="[ readOnly ? 'dynamic-height' : 'static-height' ]"
           v-show="hasShowMap">
        <StaticMap :address="address"
                   :size="staticMapSize"
                   v-if="readOnly" />
      </div>
    </Collapsible>
    <div class="flex-row flex-align-first-corners padding-0-5em margin-top-1x">
      <button class="button"
              @click="saveNewAddress">{{ $t("appointment.actions.accept") }}</button>
      <button class="button"
              @click="$store.commit('appointment/TOGGLE_NEW_ADDRESS', false)">{{ $t("appointment.actions.cancel") }}</button>
    </div>
  </section>
</template>

<script>
import Collapsible from '@/common/components/Collapsible';
import InputBoxed from '@/common/components/InputBoxed';
import StaticMap from '@/common/components/StaticMap';
import GeoMapper from '@/common/GeoMapper';
import picDefaultStaticMap from '@/assets/img/default-static-map.png';

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
      const $autoCompleInput = document.querySelector('#new-address input');
      await this.geoMapper.activateGoogleMaps();
      this.geoMapper.activateAutoComplete(
        $autoCompleInput,
        this.handleAutoCompleteFinish
      );
      this.geoMapper.renderDynamicMap(
        this.$refs.editMap,
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
      geoMapper: new GeoMapper(this.apikey, ['places']),
      addressComponents: {}
    };
  },
  methods: {
    saveNewAddress() {
      const postal_code = this.$refs.postalCode.$el.querySelector('input')
        .value;
      const floor = this.$refs.floor.$el.querySelector('input').value;
      const address = this.$refs.address.$el.querySelector('input').value;
      if (address && floor) {
        this.$emit('saveNewAddress', {
          ...this.addressComponents,
          postal_code,
          floor
        });
        this.$store.commit('appointment/TOGGLE_NEW_ADDRESS', false);
      } else {
        this.$store.dispatch('app/show', 'appointment.errors.requiredFields', { root: true });
      }
    },
    handleAutoCompleteFinish(street) {
      this.$emit('autoCompleteFinish', street);
      this.hasShowMap = true;
      this.updateMap(street);
      this.geoMapper.resize();
    },
    async updateMap(street) {
      this.geoMapper
        .renderDynamicMap(this.$refs.editMap, this.zoom, street)
        .then(() => {
          this.addressComponents = this.geoMapper.addressComponents;
        });
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
@import '../../../common/styles/base.scss';
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
