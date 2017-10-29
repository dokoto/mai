<template> 
<div>
  <section v-for="session in sessions" :key="session.id" class="appointments">
    <Card v-bind:sessionDate="session.date" v-bind:sessionTherapy="session.therapy" v-bind:withTimeInterval="false" />
  </section>
</div>
</template>

<script>
import Card from "./sessionCard.vue";
export default {
  components: { Card },
  props: ["sessions"],
  computed: {
    formatDate() {
      return this.sessionDate.year;
    }
  }
};
</script>

<style lang="scss" scoped>
.appointments {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
}
</style>

