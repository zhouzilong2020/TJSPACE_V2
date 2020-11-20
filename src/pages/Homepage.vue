<template>
  <div class="row flex-center items-stretch no-wrap">
    <div class="card col-4" style="max-width: 250pt; margin-top: 50pt">
      <!-- <q-card class="my-card text-white" style="background: radial-gradient(circle, #00FFFF 0%, #1E90FF 100%)"  > -->
      <q-card class="my-card">
        <q-card-section style="background: #315ca1">
          <div class="text-white">个人信息</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="margin-top: 8pt">
          <div class="row" style="font-size: 15px; height: 0pt">
            <div>昵称: {{ userInfo.nickname }}</div>
          </div>
        </q-card-section>
        <q-card-section style="margin-top: 8pt">
          <div class="row" style="font-size: 15px; height: 0pt">
            <div>性别: {{ Gender }}</div>
          </div>
        </q-card-section>

        <q-card-section style="margin-top: 8pt">
          <div class="row" style="font-size: 15px; height: 0pt">
            <div>手机号: {{ userInfo.phonenumber }}</div>
          </div>
        </q-card-section>
        <q-card-section style="margin-top: 8pt">
          <div class="row" style="font-size: 15px; height: 0pt">
            <div>年级: {{ Grade }}</div>
          </div>
        </q-card-section>
        <q-card-section style="margin-top: 8pt">
          <div class="row" style="font-size: 15px; height: 0pt">
            <div>主修专业: {{ Major }}</div>
          </div>
        </q-card-section>
        <q-card-section style="margin-top: 8pt">
          <div
            class="row"
            style="font-size: 15px; height: 0pt; margin-bottom: 30pt"
          >
            <div>学历: {{ Degree }}</div>
          </div>
        </q-card-section>

        <q-separator />

        <q-btn
          label="修改个人信息"
          type="修改个人信息"
          color="primary"
          :to="{ name: 'SelfInfoModify', params: { userId: userInfo.userid } }"
          style="width: 100%"
        />

        <!-- <q-btn style="margin: 0 auto">
          <router-link :to="{ name: 'SelfInfoModify', params: { userid: userInfo.userid } }">
            修改个人信息
          </router-link> 
        </q-btn>-->
      </q-card>
    </div>
    <div
      class="column col-8 q-gutter-sm"
      style="max-width: 600pt; margin-left: 20pt"
    >
      <CourseInfo />
      <!-- <TeacherInfo /> -->
      <CommentInfo />

      <test />
    </div>
  </div>
</template>

<script>
// import TeacherInfo from "../components/homepage/TeacherInfo";
import CourseInfo from "../components/homepage/CourseInfo";
import CommentInfo from "../components/homepage/CommentInfo";
import { mapState } from "vuex";

import test from "../components/test";

export default {
  components: {
    // TeacherInfo,
    CommentInfo,
    CourseInfo,
    test,
  },

  data() {
    return {
      inputSearch: "",
      logoPath: require("../assets/TJU.png"),
      avatarPath: require("../assets/boy-avatar.png"),
      avatarBGPath: require("../assets/material.png"),
      drawer: false,
      active: -1,
      Grade: "",
      Major: "",
      Gender: "",
      Degree: "",
    };
  },

  computed: mapState("userInfo", ["userInfo"]),
  created() {
    console.log("in homepage created", this.userInfo);
    switch (this.userInfo.gender) {
      case 0:
        this.Gender = "男";
        break;
      case 1:
        this.Gender = "女";
        break;
    }
    switch (this.userInfo.majorid) {
      case "1":
        this.Major = "软件工程";
        break;
      case "2":
        this.Major = "土木工程";
        break;
      case "3":
        this.Major = "经济与管理";
        break;
    }
    switch (this.userInfo.year) {
      case 1:
        this.Grade = "大一";
        break;
      case 2:
        this.Grade = "大二";
        break;
      case 3:
        this.Grade = "大三";
        break;
      case 4:
        this.Grade = "大四";
        break;
    }
    switch (this.userInfo.degree) {
      case 1:
        this.Degree = "本科生";
        break;
      case 2:
        this.Degree = "研究生";
        break;
      case 3:
        this.Degreer = "博士生";
        break;
    }

    //这一块加不加好像都没用
    // this.$store.commit('userInfo/setUserInfo', {
    //     userid: this.userInfo.userid,
    //     nickname: this.userInfo.nickname,
    //     phonenumber:this.userInfo.phonenumber,
    //     gender:this.userInfo.gender,
    //     year:this.userInfo.year,
    //     degree:this.userInfo.degree
    // })
  },
};
</script>

<style scoped>
</style>