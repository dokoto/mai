import Vue from 'vue';

import { storiesOf } from '@storybook/vue';
import { faMapMarkerAlt } from '@fortawesome/fontawesome-free-solid';

import LocationMap from '../../../src/common/components/LocationMap.vue';
import InputBoxed from '../../../src/common/components/InputBoxed.vue';
import StaticMap from '../../../src/common/components/StaticMap.vue';
import ComboBoxed from '../../../src/common/components/ComboBoxed.vue';
import DayCarrusel from '../../../src/common/components/DayCarrusel.vue';
import DayCarruselBoxed from '../../../src/common/components/DayCarruselBoxed.vue';
import GridSelectorBoxed from '../../../src/common/components/GridSelectorBoxed.vue';
import TherapistCarrusel from '../../../src/common/components/TherapistCarrusel.vue';
import Card from '../../../src/common/components/Card.vue';

storiesOf('InputBoxed', module)
  .add('InputBoxed: read only', () => ({
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
  }))
  .add('InputBoxed: write turn on', () => ({
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

storiesOf('ComboBoxed', module)
  .add('ComboBoxed: single selection', () => ({
    components: { ComboBoxed },
    data() {
      return {
        id: 'comboboxed-test',
      };
    },
    template: '<ComboBoxed :id="id" />',
  }))
  .add('ComboBoxed: multiselection', () => ({
    components: { ComboBoxed },
    data() {
      return {
        id: 'comboboxed-test',
        multiSelect: true,
      };
    },
    template: '<ComboBoxed :id="id" :multiSelect="multiSelect" />',
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

storiesOf('LocationMap', module)
  .add('LocationMap: read only Closed', () => ({
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
  }))
  .add('LocationMap: read only Opened', () => ({
    components: { LocationMap },
    data() {
      return {
        address: 'Av. de Portugal, 71, 28011 Madrid, España',
        zoom: 15,
        id: 'story-inputBoxed',
        placeHolder: 'Fake Address',
        icon: faMapMarkerAlt,
        readOnly: true,
        showMap: true,
      };
    },
    template: '<LocationMap :address="address" :zoom="zoom" :showMap="showMap" />',
  }))
  .add('LocationMap: writable', () => ({
    components: { LocationMap },
    data() {
      return {
        zoom: 15,
        id: 'story-inputBoxed',
        placeHolder: 'Calle Antillon, 4 28011 Madrid España',
        icon: faMapMarkerAlt,
        readOnly: false,
      };
    },
    template:
      '<LocationMap :zoom="zoom" :placeHolder="placeHolder" :readOnly="readOnly" :icon="icon" />',
  }));

storiesOf('DayCarrusel', module).add('DayCarrusel', () => ({
  components: { DayCarrusel },
  data() {
    return {
      id: 'day-carrusel-test',
    };
  },
  template: '<DayCarrusel :id="id" />',
}));

storiesOf('DayCarruselBoxed', module).add('DayCarruselBoxed', () => ({
  components: { DayCarruselBoxed },
  data() {
    return {
      id: 'day-carrusel-boxed-test',
    };
  },
  template: '<DayCarruselBoxed :id="id" />',
}));

storiesOf('GridSelectorBoxed', module).add('GridSelectorBoxed', () => ({
  components: { GridSelectorBoxed },
  data() {
    return {
      id: 'grid-selector-boxed-test',
    };
  },
  template: '<GridSelectorBoxed :id="id" />',
}));

storiesOf('Card', module).add('Card', () => ({
  components: { Card },
  data() {
    return {
      id: 'white-card-test',
      title: 'Card Super Title',
    };
  },
  template: '<Card :id="id" :title="title"><p>Contenido muy chulo</p>',
}));

storiesOf('TherapistCarrusel', module)
  .add('TherapistCarrusel: One Item', () => ({
    components: { TherapistCarrusel },
    data() {
      return {
        id: 'therapist-carrusel-test',
        therapistsDisabled: [],
        therapists: [
          {
            id: 'T1',
            name: 'Paka',
            thumb: 'https://www.online-therapy.com/files/img/slider/therapist.jpg',
          },
        ],
      };
    },
    template: '<TherapistCarrusel :id="id" :therapists="therapists" :therapistsDisabled="therapistsDisabled" />',
  }))
  .add('TherapistCarrusel: Two Items', () => ({
    components: { TherapistCarrusel },
    data() {
      return {
        id: 'therapist-carrusel-test',
        therapistsDisabled: [],
        therapists: [
          {
            id: 'T1',
            name: 'Paka',
            thumb: 'https://www.online-therapy.com/files/img/slider/therapist.jpg',
          },
          {
            id: 'T2',
            name: 'Pakajara',
            thumb:
              'https://vmtherapy.com/wp-content/uploads/2014/01/Vanessa-Marin_AB-6709-1024x682.jpg',
          },
        ],
      };
    },
    template: '<TherapistCarrusel :id="id" :therapists="therapists" :therapistsDisabled="therapistsDisabled" />',
  }))
  .add('TherapistCarrusel: Three Items', () => ({
    components: { TherapistCarrusel },
    data() {
      return {
        id: 'therapist-carrusel-test',
        therapistsDisabled: [],
        therapists: [
          {
            id: 'T1',
            name: 'Paka',
            thumb: 'https://www.online-therapy.com/files/img/slider/therapist.jpg',
          },
          {
            id: 'T2',
            name: 'Pakajara',
            thumb:
              'https://vmtherapy.com/wp-content/uploads/2014/01/Vanessa-Marin_AB-6709-1024x682.jpg',
          },
          {
            id: 'T3',
            name: 'Perojeres',
            thumb:
              'https://i1.wp.com/smileconcepts.co.uk/wp-content/uploads/2017/11/lucy-fisher-dental-therapist.jpg',
          },
        ],
      };
    },
    template: '<TherapistCarrusel :id="id" :therapists="therapists" :therapistsDisabled="therapistsDisabled" />',
  }))
  .add('TherapistCarrusel: Multiples Items', () => ({
    components: { TherapistCarrusel },
    data() {
      return {
        id: 'therapist-carrusel-test',
        therapists: [
          {
            id: 'T1',
            name: 'Paka:T1',
            thumb: 'https://www.online-therapy.com/files/img/slider/therapist.jpg',
          },
          {
            id: 'T2',
            name: 'Pakajara:T2',
            thumb:
              'https://vmtherapy.com/wp-content/uploads/2014/01/Vanessa-Marin_AB-6709-1024x682.jpg',
          },
          {
            id: 'T3',
            name: 'Perojeres:T3',
            thumb:
              'https://i1.wp.com/smileconcepts.co.uk/wp-content/uploads/2017/11/lucy-fisher-dental-therapist.jpg',
          },
          {
            id: 'T4',
            name: 'Paka:T4',
            thumb: 'https://www.online-therapy.com/files/img/slider/therapist.jpg',
          },
          {
            id: 'T5',
            name: 'Pakajara:T5',
            thumb:
              'https://vmtherapy.com/wp-content/uploads/2014/01/Vanessa-Marin_AB-6709-1024x682.jpg',
          },
          {
            id: 'T6',
            name: 'Perojeres:T6',
            thumb:
              'https://i1.wp.com/smileconcepts.co.uk/wp-content/uploads/2017/11/lucy-fisher-dental-therapist.jpg',
          },
        ],
      };
    },
    template: '<TherapistCarrusel :id="id" :therapists="therapists" />',
  }));
