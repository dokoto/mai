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
@import "../../../app/app.scss";
.option {
  width: 20vw;
  height: 20vw;
}

.option-icon {
  width: 50%;
  margin: 25%;
}

.pastel-orange {
  background-color: $colorPastelOrange;
}

.pastel-pink {
  background-color: $colorPastelPink;
}

.pastel-blue {
  background-color: $colorPastelBlue;
}

.pastel-yellow {
  background-color: $colorPastelYellow;
}
</style>
