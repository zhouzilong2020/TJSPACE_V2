/* eslint-disable no-undef */
<template>
  <div>data:{{ myData }}</div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    //  login,
  },
  data() {
    return {
      myData: "nothing",
    };
  },

  mounted() {
    axios.defaults.withCredentials = false;
    axios({
      method: "get",
      url: "http://175.24.115.240:8080/api/Login/login",
      paras: {
        email: "111",
        password: "111",
      },
    })
      .then((res) => {
        console.log(res);
        this.myData = res;
      })
      .catch((err) => {
        console.log(err);
        this.myData = err;
      });
  },
};
</script>

<style>
</style>