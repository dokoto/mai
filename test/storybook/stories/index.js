import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

import LocationMap from '../../../src/common/components/LocationMap.vue';
import InputBoxed from '../../../src/common/components/InputBoxed.vue';

storiesOf('InputBoxed', module).add('InputBoxed: read only', () => ({
  components: { InputBoxed },
  data() {
    return {
      id: 'story-inputBoxed',
      placeHolder: 'Avenida de Portugal 71',
      iconClasses: 'fas fa-map-marker-alt',
      icon: faMapMarkerAlt,
    };
  },
  template:
    '<InputBoxed v-bind:id="id" v-bind:placeHolder="placeHolder" v-bind:icon="icon" />',
}));

storiesOf('LocationMap', module).add('LocationMap: read only', () => ({
  components: { LocationMap },
  data() {
    return {
      address: {
        localtion: {
          lat: 40.41594508029149,
          lng: -3.727298319708498,
        },
        formatted_address: 'Av. de Portugal, 71, 28011 Madrid, España',
      },
      zoom: 15,
    };
  },
  template: '<LocationMap v-bind:address="address" v-bind:zoom="zoom" />',
}));
