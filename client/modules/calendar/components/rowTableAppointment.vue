<template>
  <li class="time-box" v-bind:class="{ sessionUnavailable: !session.isSessionAvailable }">
      <span class="time">{{ session.time }}</span>
      <span class="v-separator"></span>
      <input type="checkbox" v-bind:id="session.id" :checked="!session.isSessionAvailable" :disabled="!session.isSessionAvailable">
      <label v-bind:for="session.id">{{ session.name }}</label>
    </li>
</template>

<script>
export default {
  props: ["session"],
};
</script>

<style lang="scss" scoped>
.time-box {
  display: inline-flex;
  flex-direction: row;
  border-bottom: solid 1px;
  border-color: #c5c4c4;
  flex: 0 0 auto;

  .time {
    font-size: 1em;
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
    background: #c5c4c4;
  }

  .sessionUnavailable .time {
    color: #ddd;
  }

  .sessionUnavailable input[type="checkbox"] + label {
    color: #ddd;
  }

  .sessionUnavailable input[type="checkbox"] + label:before {
    border-color: #ddd;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label {
    display: block;
    position: relative;
    padding-left: 10%;
    font-size: 1em;
    color: #ddd;
    cursor: pointer;
    margin-top: 6%;
    margin-left: 8%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  input[type="checkbox"] + label:last-child {
    margin-bottom: 0;
  }

  input[type="checkbox"] + label:before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #6cc0e5;
    position: absolute;
    left: -14px;
    top: -5px;
    opacity: 0.6;
    -webkit-transition: all 0.12s, border-color 0.08s;
    transition: all 0.12s, border-color 0.08s;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  input[type="checkbox"]:checked + label:before {
    width: 10px;
    top: -10px;
    left: -5px;
    border-radius: 0;
    opacity: 1;
    border-top-color: transparent;
    border-left-color: transparent;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
</style>
