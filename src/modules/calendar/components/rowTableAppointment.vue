<template>
  <li :id="session.id"
    class="time-box flex-row shrink-0"
    :class="{ sessionUnavailable: !session.permisions.editable }"
    :data-time="session.time"
    :data-selectedday="selectedDay"
    @click="handleSessionClick">
    <span class="time flex-column flex-align-first-center">{{ session.time }}</span>
    <span class="v-separator"></span>
    <div class="mini-session-data flex-column flex-align-first-center grow-2">
      <span class="add"
        v-show="!session.sessionOccupy">Nueva cita</span>
      <span class="therapy">{{ session.therapy }}</span>
      <span class="therapi">{{ session.therapi }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: ['session', 'selectedDay'],
  computed: {
    sessionName() {
      return this.session.permisions.view ? this.session.name : this.$i18n.t('calendar.noAvaiable');
    },
  },
  data() {
    return {
      checkId: `${this.session.id}-check`,
    };
  },
  methods: {
    handleSessionClick(ev) {
      this.$emit('sessionClick', ev);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../common/styles/base.scss';
.time-box {
  border-bottom: solid 1px;
  border-color: $colorGrey3;
  height: 6em;

  .time {
    font-size: 1.1em;
    color: black;
    font-weight: bold;
    margin: 5%;
    width: 15%;
  }

  .appointment {
    font-size: 2.7em;
    margin-left: 10%;
    margin-top: 6%;
  }

  .v-separator {
    width: 1px;
    margin: 6px 0;
    background: $colorGrey3;
  }

  .sessionUnavailable .time {
    color: $colorGrey2;
  }

  .mini-session-data {
    padding-left: 1em;
    .add {
      font-size: 1.2em;
      color: green;
    }
    .therapy {
    }
    .therapi {
    }
  }
}
</style>
