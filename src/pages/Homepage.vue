<template>
  <div class="row q-gutter-md q-pa-md flex-center no-wrap items-stretch">
    <div class="detial col-2 q-gutter-md">
      <UserInfo />
      <CourseInfo />
    </div>
    <div class="column q-gutter-md" style="max-width: 550pt">
      <Header />
      <!-- 个人历史评价做无限滚动 -->
      <q-infinite-scroll
        :disable="isDisableScroll"
        @load="onLoad"
        :offset="250"
      >
        <CourseComment
          v-for="comment in commentList"
          :key="comment.commentId"
          :apiData="comment"
          :disableBtn="true"
        />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
    <div class="column col-2 q-gutter-md">
      <BBSHistory />
    </div>
  </div>
</template>

<script>
import { getHistoryComment } from "../services/commentService";
import UserInfo from "../components/homepage/UserInfo";
import CourseInfo from "../components/homepage/CourseInfo";
import BBSHistory from "../components/homepage/BBSHistory";
import CourseComment from "../components/courseInfo/CourseComment";
import Header from "../components/homepage/Header";
//import { mapState } from "vuex";

export default {
  components: {
    UserInfo,
    CourseInfo,
    BBSHistory,
    CourseComment,
    Header,
  },

  data() {
    return {
      logoPath: require("../assets/TJU.png"),
      avatarPath: require("../assets/boy-avatar.png"),
      avatarBGPath: require("../assets/material.png"),
      active: -1,
      Grade: "大二",
      Major: "软件工程",
      Gender: "男",
      Degree: "本科",
      NickName: "lili",
      phonenumber: "13127527753",

      commentList: [],
      currentPage: 1,
      totalPage: 0,
      limit: 3,
      isDisableScroll: false,
    };
  },
  methods: {
    getUserComment() {},
    onLoad(index, done) {
      this.currentPage = index;
      getHistoryComment({
        limit: this.limit,
        currentPage: this.currentPage,
      })
        .then((resp) => {
          console.log(resp);
          if (resp.success) {
            Array.prototype.push.apply(this.commentList, resp.data.commentList);
            this.currentPage = resp.data.currentPage;
            this.totalPage = resp.data.totalPage;
          }
          if (this.currentPage == this.totalPage) {
            this.isDisableScroll = true;
          }
          done();
        })
        .catch((e) => {
          console.log(e);
          done();
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>