<template>
  <div class="row q-gutter-md q-pa-md flex-center no-wrap items-stretch">
    <div class="detial col-2 q-gutter-md ">
      <q-card elevated>
        <q-item>
          <q-item-section>
            <q-item-label>个人信息</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section class="text-center">
          <q-avatar size="80px">
            <img :src="avatarPath" />
          </q-avatar>
        </q-card-section>
        <q-card-section horizontal>
          <q-list padding>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="face" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>昵称</q-item-label>
                <q-item-label> {{ NickName }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <img :src="genderPath" width="25px" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>性别</q-item-label>
                <q-item-label>{{ Gender }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="red" name="call" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>手机号</q-item-label>
                <q-item-label>{{ phonenumber }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="amber" name="local_offer" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>年级</q-item-label>
                <q-item-label> {{ Grade }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="green" name="book" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>专业</q-item-label>
                <q-item-label> {{ Major }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="grey" name="school" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>学历</q-item-label>
                <q-item-label> {{ Degree }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-btn
          class="full-width btn gt-sm"
          color="primary"
          icon-right="build"
          type="修改个人信息"
          label="修改信息"
          :to="{ name: 'SelfInfoModify', params: { userId: NickName } }"
          unelevated
        />
      </q-card>
      <CourseInfo />
    </div>
    <div
      class="column col-8 q-gutter-md" 
            style="max-width: 550pt" 

    >
    <Header/>
      <CommentHistory v-if="ok" />
    </div>
    <div class="column col-2 q-gutter-md">
      <BBSHistory />
    </div>  
  </div>
</template>

<script>
import CourseInfo from "../components/homepage/CourseInfo";
import BBSHistory from "../components/homepage/BBSHistory";
import CommentHistory from "../components/homepage/CommentHistory";
import Header from "../components/homepage/Header";
//import { mapState } from "vuex";

export default {
  components: {
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
      genderPath: require("../assets/user-info-icon/gender-male-female.svg"),
      drawer: false,
      active: -1,
      Grade: "大二",
      Major: "软件工程",
      Gender: "男",
      Degree: "本科",
      NickName: "lili",
      phonenumber: "13127527753",
      ok:false,
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