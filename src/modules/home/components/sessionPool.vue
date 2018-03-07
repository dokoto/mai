<template>
  <section class="appointments">
    <Card v-for="session in sessions"
      :key="session.id"
      v-bind:id="session.id"
      v-bind:sessionDate="session.date"
      v-bind:sessionTherapy="therapysByLang[session.therapy]"
      v-bind:withTimeInterval="false"
      v-on:sessionClick="handleSessionClick" />
  </section>
</template>

<script>
import Card from '../../../common/components/sessionCard.vue';
import { reduceTherapysByLanguage } from '../../../common/utils';

export default {
  components: { Card },
  props: ['sessions', 'therapys'],
  methods: {
    handleSessionClick(ev) {
      this.$emit('sessionClick', ev);
    },
  },
  computed: {
    therapysByLang() {
      return this.therapys.reduce(reduceTherapysByLanguage, {});
    },
  },
};
</script>

<style lang="scss" scoped>
.appointments {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 3%;
  padding-top: 4%;
}
::-webkit-scrollbar {
  display: none;
}
</style>

