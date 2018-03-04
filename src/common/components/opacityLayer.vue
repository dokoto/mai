//DELTE?
<template>
  <div v-bind:class="{ lock: active }"></div>
</template>

<script>
export default {
  props: ['active'],
};
</script>


<style lang="scss" scoped>
.lock {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
}
</style>

