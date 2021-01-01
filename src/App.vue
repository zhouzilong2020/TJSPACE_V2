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
    console.log(checkCookie());
    if (!this.userInfo) {
      //如果当前用户信息没有，先检查cookie中是否含有信息
      if (checkCookie()) {
        this.$store
          .dispatch("userInfo/loginUser")
          .then(() => {})
          .catch(async () => {
            this.$store.dispatch("userInfo/logoutUser").then(() => {
              // console.log("ajsdbfkjhsadfjkshadf");
              this.$router.push({
                name: "index",
              });
            });
          });
      } else {
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

body {
  background-color: rgb(245, 246, 247);
}
</style>
