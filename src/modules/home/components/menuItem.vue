<template>
  <span class="option"
        :class="className">
    <router-link :to="url">
      <img :src="icon"
           class="option-icon" />
    </router-link>
  </span>
</template>

<script>
export default {
  props: {
    className: {
      type: String
    },
    url: {
      type: String
    },
    icon: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../common/styles/base.scss';
.option {
  width: 20vw;
  height: 20vw;
  border-radius: 5px;
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
