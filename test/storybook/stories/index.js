import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import MapCard from '../../../src/common/components/MapCard.vue';

storiesOf('MapCard', module).add('MapCard: read only', () => ({
  components: { MapCard },
  data() {
    return {
      therapistAdress: {
        localtion: {
          lat: 40.41594508029149,
          lng: -3.727298319708498,
        },
        formatted_address: 'Av. de Portugal, 71, 28011 Madrid, España',
      },
      mapZoom: 15,
    };
  },
  template:
    '<MapCard v-bind:therapistAdress="therapistAdress" v-bind:mapZoom="mapZoom" />',
}));
