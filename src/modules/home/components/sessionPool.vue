<template> 
<section class="appointments">
  <Card v-for="session in sessions" :key="session.id" 
    v-bind:id="session.id"
    v-bind:sessionDate="session.date" 
    v-bind:sessionTherapy="session.therapy" 
    v-bind:withTimeInterval="false" />
</section>
</template>

<script>
import Card from "../../../app/components/sessionCard.vue";
export default {
  components: { Card },
  props: ["sessions"]
};
</script>

<style lang="scss" scoped>
.appointments {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 3%;
}
</style>

