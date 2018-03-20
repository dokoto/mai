//DELTE?
<template>
  <dialog class="modal"
    :id="dialodId">
    <div class="meeting-date">
      <span class="mediumSizeText">{{ yearMonth }}</span>
      <span class="bigSizeText">{{ sessionDay }}</span>
      <span class="mediumSizeText">{{ timeSelected }}</span>
    </div>
    <TherapistCarrusel v-bind:therapists="therapists"
      v-if="therapists.length > 0" />
    <div class="menu">
      <button class="c-button accept"
        v-on:click="handleAcceptClick">Accept</button>
      <span class="v-separator"></span>
      <button class="c-button cancel"
        v-on:click="handleCancelClick">Cancel</button>
    </div>
  </dialog>
</template>

<script>
import moment from 'moment';
import TherapistCarrusel from '../../../common/components/TherapistCarrusel.vue';
import * as consts from '../../../common/constants';

moment.locale(window.glob.language);

export default {
  components: { TherapistCarrusel },
  computed: {
    yearMonth() {
      return `${moment(this.selectedDay, consts.INT_DATE_FORMAT)
        .format('MMM')
        .toUpperCase()} ${moment(this.selectedDay, consts.INT_DATE_FORMAT).format('YYYY')}`;
    },
    sessionDay() {
      return moment(this.daySelected, consts.INT_DATE_FORMAT)
        .format('dddd')
        .toUpperCase();
    },
  },
  props: ['dialodId', 'timeSelected', 'daySelected', 'session', 'therapists', 'therapies'],
  methods: {
    handleAcceptClick(ev) {
      this.$emit('dialogAcept', ev);
    },
    handleCancelClick(ev) {
      this.$emit('dialogCancel', ev);
    },
  },
  mounted() {
    console.log('opening dialog');
  },
};
</script>
<style lang="scss" scoped>
dialog {
  border: solid 1px;
  top: 10%;
  width: 80%;
  z-index: 5;
}

.modal {
  display: inline-flex;
  flex-direction: column;

  button.c-button:active {
    font-weight: bold;
  }

  .therapist-img {
    width: 100px;
    border-radius: 50%;
  }

  .meeting-date {
    display: inline-flex;
    flex-direction: column;
    border-bottom: solid;
    border-bottom-color: #ddd;
    margin-bottom: 4%;
    padding-bottom: 4%;

    .mediumSizeText {
      color: crimson;
      font-size: 1.2em;
      font-weight: bold;
      align-self: center;
    }

    .bigSizeText {
      color: crimson;
      font-size: 1.8em;
      align-self: center;
      font-weight: bold;
    }
  }

  .therapist-carrusel {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: solid 1px;
    border-bottom-color: #ddd;
    margin-bottom: 4%;
    padding-bottom: 4%;
  }

  .menu {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
  }

  .c-button {
    font-size: 1.8em;
  }

  .cancel {
    margin-left: 4%;
  }

  .accept {
    margin-right: 4%;
  }
}
</style>
