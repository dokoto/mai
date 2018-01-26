import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

import LocationMap from '../../../src/common/components/LocationMap.vue';
import InputBoxed from '../../../src/common/components/InputBoxed.vue';
import StaticMap from '../../../src/common/components/StaticMap.vue';

storiesOf('InputBoxed', module).add('InputBoxed: read only', () => ({
  components: { InputBoxed },
  data() {
    return {
      id: 'story-inputBoxed',
      placeHolder: 'Fake Address',
      icon: faMapMarkerAlt,
      readOnly: true,
    };
  },
  template:
    '<InputBoxed v-bind:id="id" v-bind:placeHolder="placeHolder" v-bind:icon="icon" v-bind:readOnly="readOnly" />',
})).add('InputBoxed: write turn on', () => ({
  components: { InputBoxed },
  data() {
    return {
      id: 'story-inputBoxed',
      placeHolder: 'Fake Address',
      icon: faMapMarkerAlt,
      readOnly: false,
    };
  },
  template:
    '<InputBoxed v-bind:id="id" v-bind:placeHolder="placeHolder" v-bind:icon="icon" v-bind:readOnly="readOnly" />',
}));

storiesOf('StaticMap', module).add('StaticMap', () => ({
  components: { StaticMap },
  data() {
    return {
      address: 'Av. de Portugal, 71, 28011 Madrid, España',
      zoom: 15,
    };
  },
  template: '<StaticMap :address="address" :zoom="zoom" />',
}));

storiesOf('LocationMap', module).add('LocationMap: read only', () => ({
  components: { LocationMap },
  data() {
    return {
      address: 'Av. de Portugal, 71, 28011 Madrid, España',
      zoom: 15,
      id: 'story-inputBoxed',
      placeHolder: 'Fake Address',
      icon: faMapMarkerAlt,
      readOnly: true,
    };
  },
  template: '<LocationMap v-bind:address="address" v-bind:zoom="zoom" />',
}));
