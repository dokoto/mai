<template>
  <section class="therapist-carrusel flex-row" :id="id">
    <div class="therapist-carrusel-item flex-column" 
      v-for="therapist in therapists" 
      :key="therapist.id"
      :id="therapist.id"
      v-show="!disablesTherapists.includes(therapist.id)"
      @click="handleTherapistSelected" >      
      <div class="therapist-img-box">
        <img class="therapist-img" :src="therapist.thumb" 
          :class="{ 'therapist-img-selected': therapistSelected === therapist.id }" />
      </div>
      <div class="flex-column">
        <span class="h-separator"></span>
        <div class="flex-row flex-align-first-center">
          <p class="therapist-name"
          :class="{ 'therapist-name-selected': therapistSelected === therapist.id }">{{ therapist.name }}</p>
        </div>
      </div>
    </div>    
  </section>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    id: {
      type: String,
      default: 'therapist-carrusel',
    },
    therapists: {
      type: Array,
      default: function() {
        return [
          {
            id: 'T1',
            name: 'Paka',
            thumb: 'https://www.online-therapy.com/files/img/slider/therapist.jpg',
          },
        ];
      },
    },
    therapistSelected: {
      type: String,
      default: 'T1',
    },
    disablesTherapists: {
      type: Array,
      default: function() {
        return ['T2', 'T5'];
      },
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hitler: 'oasdoi',
    };
  },
  methods: {
    handleTherapistSelected(ev) {
      if (!this.multiSelect) {
        $('.therapist-img').removeClass('therapist-img-selected');
        $('.therapist-name').removeClass('therapist-name-selected');
      }
      $(ev.currentTarget)
        .find('.therapist-img')
        .toggleClass('therapist-img-selected');
      $(ev.currentTarget)
        .find('.therapist-name')
        .toggleClass('therapist-name-selected');
      this.itemSelectedValue = $(ev.currentTarget).attr('id');
      this.$emit('therapistCarrusel:onChange', this.itemSelectedValue);
    },
  },
};
</script>

<style lang="scss">
@import '../styles/base.scss';

.therapist-carrusel {
  font-family: Arial, Tahoma, HelveticaNeue;
  overflow: auto;
  width: 100%;
}

::-webkit-scrollbar {
  display: none;
}

.therapist-carrusel-item {
  width: 100%;
  margin-left: 5%;
  margin-right: 5%;
}
.therapist-img-box {
  text-align: center;
  height: 110px;
}

.therapist-img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.h-separator {
  height: 2px;
  margin: 4% 0%;
  background: $colorGrey2;
}

.therapist-img-selected {
  border: solid;
  border-color: $colorPastelGreen0;
}

.therapist-name-selected {
  color: $colorDarkGrey3;
  font-weight: bold;
}

.therapist-name {
  margin: 0;
  text-align: center;
  font-size: $form-font-size;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 10ch;
}

</style>
