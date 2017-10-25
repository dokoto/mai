<template>
  <div id="login-view" class="login-view">
    <label for="user">{{ user }}</label>
    <input type="text" id="user" />
    <label for="password">{{ password }}</label>
    <input type="password" id="password" /><br>
    <button id="go" class="form-button" v-on:click="goNext">Go</button>
    <router-link to="/schedule">Gooo</router-link>
  </div>
</template>

<style>
.login-view {
  background: aliceblue;
  position: absolute;
  height: 40%;
  top: 20%;
  left: 15%;
  font-size: 3em;
  padding: 4%;
  border: solid;
}
.form-button {
  font-size: 1em;
  border: solid;
}
</style>

<script>
export default {
  data() {
    return {
      user: "User",
      password: "Password"
    };
  },
  methods: {
    goNext: function(ev) {
      console.log(ev);
      this.$router.push("schedule");
    }
  }
};
</script>