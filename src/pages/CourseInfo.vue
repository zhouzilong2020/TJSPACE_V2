<template>
  <div class="row q-gutter-md q-pa-md flex-center no-wrap items-stretch">
    <!-- <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 detail body-left"> -->
    <div class="col-3 q-pt-sm" style="max-width: 215px">
      <course-detail refs="courseDeatil" :courseInfo="courseInfo" />
    </div>

    <!-- <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8 body-right"> -->
    <div class="q-gutter-sm col-9" style="max-width: 800px">
      <div class="course-head">
        <course-head :courseInfo="courseInfo" />
      </div>
      <!-- 筛选条件栏 -->
      <q-card flat class="row justify-between q-px-md" style="max-width: 800px">
        <div class="q-gutter-sm">
          <q-icon name="list" size="28px" />
          <q-btn-toggle
            v-model="sort"
            dense
            unelevated
            toggle-color="primary"
            :options="[
              { label: '评价时间', value: 'createTime' },
              { label: '评价分数', value: 'totScore' },
              { label: '点赞数', value: 'positiveCount' },
            ]"
          />
        </div>

        <div class="q-gutter-sm">
          <q-icon name="vertical_align_center" size="24px" />
          <q-btn-toggle
            v-model="orderBy"
            dense
            unelevated
            toggle-color="primary"
            :options="[
              { label: '降序排序', value: 'desc' },
              { label: '升序排序', value: 'asc' },
            ]"
          />
          <q-btn
            dense
            unelevated
            icon="refresh"
            :disable="disableRefresh"
            @click="
              {
                disableRefresh = true;
                onRefresh();
                disableRefresh = false;
              }
            "
          />
        </div>
      </q-card>

      <div class="course-comment">
        <template v-if="commentList.length > 0">
          <!-- 无限滚动 -->
          <q-infinite-scroll
            :disable="isDisableScroll"
            @load="onLoad"
            :offset="250"
          >
            <course-comment
              v-for="comment in commentList"
              :key="comment.commentId"
              :apiData="comment"
              :isAuthor="true"
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
        </template>

        <template v-else class="row justify-between">
          <div class="text-h6 text-center">暂时还没有人评价该课程哦！</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment } from "../services/commentService";
import { getCourseInfo } from "../services/courseService";
import { mapState } from "vuex";

import CourseComment from "../components/courseInfo/CourseComment";
import CourseDetail from "../components/courseInfo/CourseDetail";
import CourseHead from "../components/courseInfo/CourseHead";

export default {
  name: "CourseInfo",
  components: {
    CourseComment,
    CourseDetail,
    CourseHead,
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
  },
  data() {
    return {
      text: "",
      logoPath: require("../assets/TJU.png"),
      avatarPath: null,
      avatarBGPath: require("../assets/material.png"),
      courseInfo: {
        avgContentScore: 4,
        avgGradingScore: 3,
        avgTeachingScore: 5,
        avgTotScore: 3.5,
        avgWorkloadScore: 2,
        checkType: 1,
        commentCount: 0,
        credit: 3,
        deptName: "新生院",
        historyTeachingList: [],
        majorName: "新生院",
        officialId: "42034201",
        period: 3,
        teacherDeptName: "新生院",
        teacherName: "杜庆峰",
        teacherTitle: "教授",
        title: "软件工程",
      },
      disableRefresh: false,
      // 排序方式
      sort: "createTime",
      orderBy: "desc",
      commentList: [],
      currentPage: 1,
      totalPage: 0,
      limit: 6,
      isDisableScroll: true,
    };
  },
  methods: {
    onRefresh() {
      this.commentList = [];
      getComment({
        courseId: this.$route.params.courseId,
        currentPage: this.currentPage,
        limit: this.limit,
        orderBy: this.orderBy,
        sort: this.sort,
      })
        .then((resp) => {
          //console.log(resp);
          // 逆序，让时间晚的在上面
          this.commentList = resp.data.commentList;
          this.currentPage = resp.data.currentPage;
          this.totalPage = resp.data.totalPage;
          this.isDisableScroll = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onLoad(index, done) {
      this.isDisableScroll = true;
      // console.log(index, this.totalPage);
      this.currentPage = index + 1;
      if (this.currentPage > this.totalPage) {
        return;
      }
      getComment({
        courseId: this.$route.params.courseId,
        limit: this.limit,
        currentPage: this.currentPage,
        orderBy: this.orderBy,
        sort: this.sort,
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
    window.scrollTo({
      top: 0,
      type: "auto",
    });
    getCourseInfo({
      courseId: this.$route.params.courseId,
    })
      .then((resp) => {
        if (resp.success) {
          //console.log(resp);
          this.courseInfo = {
            ...resp.data,
            schoolTime: resp.data.historyTeachingList[0].schoolTime,
          };
          this.$store.commit("courseInfo/setCourseInfo", this.courseInfo);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    getComment({
      courseId: this.$route.params.courseId,
      currentPage: this.currentPage,
      limit: this.limit,
      orderBy: this.orderBy,
      sort: this.sort,
    })
      .then((resp) => {
        //console.log(resp);
        // 逆序，让时间晚的在上面
        this.commentList = resp.data.commentList;
        this.currentPage = resp.data.currentPage;
        this.totalPage = resp.data.totalPage;
        this.isDisableScroll = false;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
</style>