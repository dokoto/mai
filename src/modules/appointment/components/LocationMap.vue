<template>
  <section class="location">
    <ListBoxed id="address-list"
               :items="streets"
               placeHolder="placeHolder"
               :showOpen="true"
               :autoCloseOnSelected="false"
               v-if="!readOnly"
               @listBoxedItemHasSelected="handleAddressSelected">
      <template slot-scope="slot">
        <div class="flex-row">
          <i class="icon">
            <font-awesome-icon :icon="slot.item.icon"
                               :color="slot.item.colorIcon" />
          </i>
          <span class="street grow-2 slipsis"
                :class="{action: slot.item.id === 'new'}"
                :data-type="slot.item.type"
                :data-id="slot.item.id"
                :data-value="slot.item.value">{{ slot.item.value }}</span>
        </div>
      </template>
    </ListBoxed>
    <InputBoxed :value="address"
                :noIcon="true"
                v-if="readOnly" />
    <Collapsible>
      <div id="map-container"
           class="map"
           :class="[ readOnly ? 'dynamic-height' : 'static-height' ]"
           v-show="hasShowMap">
        <StaticMap :address="address"
                   :size="staticMapSize"
                   :zoom="zoom"
                   v-if="readOnly" />
      </div>
    </Collapsible>
  </section>
</template>

<script>
import { head } from 'lodash';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { USER, NEW, TEXT } from '@/common/constants';
import {
  faPlus,
  faHome,
  faAmbulance
} from '@fortawesome/fontawesome-free-solid';
import Collapsible from '@/common/components/Collapsible';
import InputBoxed from '@/common/components/InputBoxed';
import ListBoxed from '@/common/components/ListBoxed';
import StaticMap from '@/common/components/StaticMap';
import GeoMapper from '@/common/GeoMapper';
import picDefaultStaticMap from '../../../../static/img/default-static-map.png';

export default {
  props: {
    id: {
      type: String,
      default: 'locationMap'
    },
    addresses: {
      type: Array
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
  components: {
    InputBoxed,
    StaticMap,
    FontAwesomeIcon,
    Collapsible,
    ListBoxed
  },
  computed: {
    staticMapSize: function() {
      return {
        width: 400,
        height: 200
      };
    },
    streets: function() {
      const streets = this.addresses.map(item => ({
        id: item._id,
        value: item.street,
        type: item.type,
        icon:
          item.type === USER || item.type === NEW
            ? this.iconHome
            : this.iconDoctorAddress,
        selected: item.selected,
        colorIcon: 'black'
      }));
      streets.push({
        id: 'new',
        value: 'Add new address',
        icon: this.iconAdd,
        type: TEXT,
        colorIcon: '#2196F3'
      });

      document
        .querySelectorAll('li.item .street')
        .forEach(item => item.classList.remove('item-selected'));

      this.hideMap();

      return streets;
    }
  },
  async mounted() {
    if (!this.readOnly) {
      await this.geoMapper.activateGoogleMaps();
      const $map = document.querySelector('#map-container');
      if ($map && this.addresses.length) {
        const street = head(this.addresses).street;
        this.geoMapper.renderDynamicMap($map, this.zoom, street);
      }
    }
  },
  data() {
    return {
      defaulMapImage: picDefaultStaticMap,
      iconAdd: faPlus,
      iconDoctorAddress: faAmbulance,
      iconHome: faHome,
      hasShowMap: this.showMap,
      geoMapper: new GeoMapper(this.apikey, ['places'])
    };
  },
  methods: {
    hideMap() {
      this.hasShowMap = false;
    },
    async updateMap(address) {
      if (address) {
        this.hasShowMap = true;
        const $map = document.querySelector('#map-container');
        this.geoMapper
          .renderDynamicMap($map, this.zoom, address)
          .then(() =>
            this.$emit('newAddress', this.geoMapper.addressComponents)
          );
      }
    },
    handleAddressSelected(ev) {
      ev.currentTarget.parentElement
        .querySelectorAll('li.item .street')
        .forEach(item => item.classList.remove('item-selected'));
      ev.currentTarget.querySelector('.street').classList.add('item-selected');
      const tag = ev.currentTarget.querySelector('.street').dataset;
      const id = tag.id;
      const street = tag.value;
      const type = tag.type;
      if (id && street && type) {
        if (id !== 'new') {
          this.hasShowMap = true;
          this.updateMap(street);
        }
        this.$emit('addressSelected', { id, street, type });
      }
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
.location {
  .action {
    color: #2196f3;
  }
  .street {
    margin-left: 0.4em;
    width: 100%;
  }
  .icon {
    width: 10%;
  }
  .item-selected {
    font-weight: bold;
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
