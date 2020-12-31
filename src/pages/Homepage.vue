<template>
  <div class="row q-gutter-md q-pa-md flex-center no-wrap items-stretch">
    <div class="detial col-2 q-gutter-md">
      <UserInfo />
      <CourseInfo />
    </div>
    <div class="column q-gutter-md" style="max-width: 550pt">
      <Header />
      <CommentHistory v-if="ok" />
    </div>
    <div class="column col-2 q-gutter-md">
      <BBSHistory />
    </div>
  </div>
</template>

<script>
import UserInfo from "../components/homepage/UserInfo";
import CourseInfo from "../components/homepage/CourseInfo";
import BBSHistory from "../components/homepage/BBSHistory";
import CommentHistory from "../components/homepage/CommentHistory";
import Header from "../components/homepage/Header";
//import { mapState } from "vuex";

export default {
  components: {
    UserInfo,
    CourseInfo,
    BBSHistory,
    CommentHistory,
    Header,
  },

  data() {
    return {
      inputSearch: "",
      logoPath: require("../assets/TJU.png"),
      avatarPath: require("../assets/boy-avatar.png"),
      avatarBGPath: require("../assets/material.png"),

      drawer: false,
      active: -1,
      Grade: "大二",
      Major: "软件工程",
      Gender: "男",
      Degree: "本科",
      NickName: "lili",
      phonenumber: "13127527753",
      ok: false,
    };
  },

  //computed: mapState("userInfo", ["userInfo"]),
  //created() {
  //  console.log("in homepage created", this.userInfo);
  //  switch (this.userInfo.gender) {
  //  case 0:
  //  this.Gender = "男";
  //  break;
  //  case 1:
  //  this.Gender = "女";
  //  break;
  //}
  //switch (this.userInfo.majorid) {
  // case "1":
  //  this.Major = "软件工程";
  // break;
  // case "2":
  // this.Major = "土木工程";
  // break;
  //case "3":
  // this.Major = "经济与管理";
  // break;
  // }
  // switch (this.userInfo.year) {
  //  case 1:
  //   this.Grade = "大一";
  //   break;
  // case 2:
  //   this.Grade = "大二";
  //   break;
  // case 3:
  //   this.Grade = "大三";
  //   break;
  // case 4:
  //   this.Grade = "大四";
  //   break;
  // }
  //switch (this.userInfo.degree) {
  // case 1:
  //  this.Degree = "本科生";
  //  break;
  // case 2:
  //   this.Degree = "研究生";
  //   break;
  // case 3:
  //   this.Degreer = "博士生";
  //   break;
  //}

  //这一块加不加好像都没用
  // this.$store.commit('userInfo/setUserInfo', {
  //     userid: this.userInfo.userid,
  //     nickname: this.userInfo.nickname,
  //     phonenumber:this.userInfo.phonenumber,
  //     gender:this.userInfo.gender,
  //     year:this.userInfo.year,
  //     degree:this.userInfo.degree
  // })

  //},
};
</script>

<style scoped>
</style>