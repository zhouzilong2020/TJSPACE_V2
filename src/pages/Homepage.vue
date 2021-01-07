<template>
  <div class="row q-gutter-md q-py-sm flex-center no-wrap items-stretch">
    <div class="detial col-2 q-gutter-md">
      <UserInfo />
      <CourseInfo />
    </div>
    <div class="col-5 column q-gutter-md" >
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
          @delete="onDeleteComment(comment.commentId)"
          v-for="comment in commentList"
          :isAuthor="false"
          :isDetail="false"
          :key="comment.commentId"
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
      // avatarPath: require("../assets/boy-avatar.png"),
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
      limit: 5,
      isDisableScroll: true,
    };
  },
  methods: {
    onDeleteComment(commentId) {
      //console.log("delete No:", i);
      this.commentList.splice(
        this.commentList.findIndex((e) => e.commentId === commentId),
        1
      );
      // this.commentList.splice(i, 1);
      this.$q.notify({
        type: "positive",
        message: `评论删除成功`,
        position: "center",
      });
    },
    getUserComment() {},
    onLoad(index, done) {
      this.isDisableScroll = true;
      this.currentPage = index + 1;
      if (this.currentPage >= this.totalPage) {
        return;
      }
      getHistoryComment({
        limit: this.limit,
        currentPage: this.currentPage,
      })
        .then((resp) => {
          //console.log(resp);
          if (resp.success) {
            Array.prototype.push.apply(this.commentList, resp.data.commentList);
            this.currentPage = resp.data.currentPage;
            this.totalPage = resp.data.totalPage;
          }
          this.isDisableScroll = false;
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
  mounted() {
    getHistoryComment({
      limit: this.limit,
      currentPage: this.currentPage,
    }).then((resp) => {
      //console.log(resp);
      if (resp.success) {
        Array.prototype.push.apply(this.commentList, resp.data.commentList);
        this.currentPage = resp.data.currentPage;
        this.totalPage = resp.data.totalPage;
        this.isDisableScroll = false;
      }
    });
  },
};
</script>

<style scoped>
</style>