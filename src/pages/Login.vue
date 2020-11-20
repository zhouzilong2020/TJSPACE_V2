<template>
  <div class="container row justify-center">
    <img :src="bgPath" alt="" />
    <login />
  </div>
</template>

<script>
import login from "../components/userInfo/login";

export default {
  data() {
    return {
      bgPath: require("../assets/school.jpeg"),
    };
  },

  components: {
    login,
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
img {
  position: fixed;
  height: 100%;
  width: 100%;
  margin-top: -120px;
  padding: 0;
  z-index: -1;
}
.container {
  margin-top: 90px;
}
</style>