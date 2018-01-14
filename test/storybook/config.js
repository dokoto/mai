import { configure } from '@storybook/vue';

import Vue from 'vue';
import Vuex from 'vuex'; // Vue plugins

// Import your custom components.
import LocationMap from '../../src/common/components/LocationMap.vue';
import InputBoxed from '../../src/common/components/InputBoxed.vue';

// Install Vue plugins.
Vue.use(Vuex);

// Register custom components.
Vue.component('LocationMap', LocationMap);
Vue.component('InputBoxed', InputBoxed);

function loadStories() {
  // You can require as many stories as you need.
  require('./stories');
}

configure(loadStories, module);
