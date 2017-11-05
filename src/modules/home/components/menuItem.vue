<template>
  <span class="option" v-bind:class="className">
    <a v-bind:href="calendarUrl" target="_self">
      <img v-bind:src="icon" class="option-icon" />
    </a>
  </span>
</template>

<script>
export default {
  props: ["className", "calendarUrl", "icon"]
};
</script>

<style lang="scss" scoped>
.option {
  width: 20vw;
  height: 20vw;
}

.option-icon {
  width: 50%;
  margin: 25%;
}

.pastel-orange {
  background-color: rgb(253, 202, 162);
}

.pastel-pink {
  background-color: rgb(251, 182, 202);
}

.pastel-blue {
  background-color: rgb(199, 236, 255);
}

.pastel-yellow {
  background-color: rgb(255, 237, 120);
}
</style>
