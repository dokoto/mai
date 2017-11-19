<template>
  <dialog class="modal"
    :id="dialodId">
    <div class="meeting-date">
      <span class="time">date</span>
      <span class="date">time</span>
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
import TherapistCarrusel from '../../../app/components/therapistCarrusel';

export default {
  components: { TherapistCarrusel },
  props: ['dialodId', 'timeSelected', 'daySelected', 'session', 'therapists', 'therapies'],
  methods: {
    handleAcceptClick: function(ev) {},
    handleCancelClick: function(ev) {
      $('.modal')[0].close();
      $('.modal').removeClass('dialog-scale');
    },
  },
  created() {
    //$('.modal')[0].showModal();
  }
};
</script>
<style lang="scss" scoped>
dialog {
  border: solid 1px;
  top: 30%;
  //visibility: hidden;
  transform: scale(0.1);
  transition: transform 200ms;

  &.dialog-scale {
    top: 35%;
    width: 90%;
    visibility: visible;
    transform: scale(1);
  }

  &.undialog-scale {
    //visibility: hidden;
    transform: scale(0.1);
    transition: transform 200ms;
  }
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
  }

  .meeting-date .time {
    color: crimson;
    font-size: 2.5em;
    font-weight: bold;
    align-self: center;
  }

  .meeting-date .date {
    color: crimson;
    font-size: 0.9em;
    align-self: center;
    font-weight: bold;
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
