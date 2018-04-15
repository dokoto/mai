<template>
  <section class="doctor-carrusel flex-row"
           :id="id">
    <div class="doctor-carrusel-item flex-column"
         v-for="doctor in doctors"
         :key="doctor.id"
         :id="doctor.id"
         v-show="!disablesDoctors.includes(doctor.id)"
         @click="handleDoctorSelected">
      <div class="doctor-img-box">
        <img class="doctor-img"
             :src="doctor.picture || defaultPicture"
             :class="{ 'doctor-img-selected': doctorMakedAsSelected === doctor.id }" />
      </div>
      <div class="flex-column">
        <span class="h-separator"></span>
        <div class="flex-row flex-align-first-center">
          <p class="doctor-name"
             :class="{ 'doctor-name-selected': doctorSelected === doctor.id }">{{ doctor.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery';
import defaultProfile from '@/assets/img/default.png';

export default {
  props: {
    id: {
      type: String,
      default: 'doctor-carrusel'
    },
    doctors: {
      type: Array,
      default: function() {
        return [
          {
            id: 'T1',
            name: 'Paka',
            surname: 'kromer',
            email: 'cool@email.com',
            picture:
              'https://www.online-therapy.com/files/img/slider/therapist.jpg'
          }
        ];
      }
    },
    doctorSelected: {
      type: String,
      default: 'T1'
    },
    disablesDoctors: {
      type: Array,
      default: function() {
        return ['T2', 'T5'];
      }
    },
    multiSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultPicture: defaultProfile,
      doctorMakedAsSelected: ''
    };
  },
  methods: {
    handleDoctorSelected(ev) {
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
      this.doctorMakedAsSelected = ev.currentTarget.id;
      this.$emit('doctorHasSelected', ev.currentTarget.id);
    }
  }
};
</script>

<style lang="scss">
@import '../styles/base.scss';

.doctor-carrusel {
  font-family: Arial, Tahoma, HelveticaNeue;
  overflow: auto;
  width: 100%;
}

::-webkit-scrollbar {
  display: none;
}

.doctor-carrusel-item {
  width: 100%;
  margin-left: 5%;
  margin-right: 5%;
}
.doctor-img-box {
  text-align: center;
  height: 110px;
}

.doctor-img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.h-separator {
  height: 2px;
  margin: 4% 0%;
  background: $colorGrey2;
}

.doctor-img-selected {
  border: solid;
  border-color: $colorPastelGreen0;
}

.doctor-name-selected {
  color: $colorDarkGrey3;
  font-weight: bold;
}

.doctor-name {
  margin: 0;
  text-align: center;
  font-size: $form-font-size;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 10ch;
}
</style>
