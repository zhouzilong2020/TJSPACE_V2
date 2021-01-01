<template>
  <div class="row q-gutter-md q-py-sm flex-center no-wrap items-stretch">
    <div class="detial col-2 q-gutter-md">
      <UserInfo />
      <CourseInfo />
    </div>
    <div class="column q-gutter-md" style="max-width: 550pt">
      <Header
        :content="{
          title: '请开始您的旅程并留下您的足迹',
          content: commentList.length
            ? '今天还想评论点什么吗？'
            : '您还没有对任何课程发表您的评价。',
          subcontent:
            '请点击下方的搜索课程按钮进入搜索页面选择您想评价的课程，并撰写下您的评价。',
        }"
      />
      <CommentHeatChart />
      <!-- 个人历史评价做无限滚动 -->
      <q-infinite-scroll
        :disable="isDisableScroll"
        @load="onLoad"
        :offset="250"
      >
        <CourseComment
          @delete="onDeleteComment(i)"
          v-for="(comment, i) in commentList"
          :isAuthor="false"
          :isDetail="false"
          :key="i"
          :apiData="comment"
          :disableBtn="true"
          :deleteBtn="true"
        />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
        <div v-if="isDisableScroll" class="text-grey-7 caption text-center">
          已经到底啦！
        </div>
      </q-infinite-scroll>
    </div>
    <div class="column col-2 q-gutter-md">
      <BBSHistory />
    </div>
  </div>
</template>

<script>
import CommentHeatChart from "../components/homepage/CommentHeatChart";
import { getHistoryComment } from "../services/commentService";
import UserInfo from "../components/homepage/UserInfo";
import CourseInfo from "../components/homepage/CourseInfo";
import BBSHistory from "../components/homepage/BBSHistory";
import CourseComment from "../components/courseInfo/CourseComment";
import Header from "../components/homepage/Header";
//import { mapState } from "vuex";

export default {
  components: {
    CommentHeatChart,
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
    onDeleteComment(i) {
      // console.log("delete No:", i);
      this.commentList.splice(i, 1);
    },
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
            this.$q.notify({
              message: "已经全部加载了哦",
              caption: "快去评论更多课程吧",
              color: "info",
              icon: "tag_faces",
              timeout: 2000,
            });
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