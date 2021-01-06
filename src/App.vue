<template>
  <div id="app">
    <layout>
      <template v-slot:main>
        <router-view></router-view>
      </template>
    </layout>
  </div>
</template>

<script>
import layout from "./components/layout/layout";

import { checkCookie } from "./utils/utils";
import { mapState } from "vuex";
export default {
  name: "APP",
  components: {
    layout,
  },
  data() {
    return {};
  },
  computed: mapState("userInfo", ["userInfo"]),
  methods: {},
  mounted() {},

  async beforeCreate() {
    //console.log(!this.userInfo, checkCookie());
    if (!this.userInfo) {
      //如果当前用户信息没有，先检查cookie中是否含有信息
      if (checkCookie()) {
        this.$store
          .dispatch("userInfo/loginUser")
          .then(() => {})
          .catch(async () => {
            this.$store.dispatch("userInfo/logoutUser").then(() => {
              this.$router.push({
                name: "index",
              });
            });
          });
      } else if (
        !(this.$route.name == "register" || this.$route.name == "login")
      ) {
        // 如果cookie没有信息，应当为未登录
        this.$router.push({
          name: "index",
        });
      }
    }
  },
};
</script>

<style>
@import "~@/styles/global.css";
html, body {
  height: 100%; /*让页面撑满窗口*/
}
body {
  background-color: #f0f0f0;
}
</style>
