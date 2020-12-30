<template>
  <div class="row q-gutter-sm q-pa-md flex-center no-wrap items-stretch">
    <!-- <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 detail body-left"> -->
    <div class="detail body-left q-gutter-sm">
      <course-detail refs="courseDeatil" :courseInfo="courseInfo" />
    </div>

    <!-- <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8 body-right"> -->
    <div class="body-right q-gutter-sm">
      <div class="course-head">
        <course-head :courseInfo="courseInfo" />
      </div>
      <!-- 搜索栏 -->
      <!-- <div class="option-group row justify-start q-gutter-sm">
        <q-select
          v-model="order"
          label="选择排序方式"
          :options="orderOptions"
          style="width: 250px"
          behavior="menu"
        />
        <q-select
          v-model="dept"
          label="选择其他学院"
          :options="deptsOptions"
          style="width: 250px"
          behavior="menu"
        />
      </div> -->

      <div class="course-comment">
        <template v-if="comments.length > 0">
          <course-comment
            v-for="(comment, i) in comments"
            :key="comment.commentid"
            :apiData="comment"
            :taker="commentor[i]"
          />
        </template>
        <template v-else class="row justify-between">
          <div class="text-h6">暂时还没有人评价该课程哦！</div>
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
      avatarPath: require("../assets/boy-avatar.png"),
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
      comments: [],
    };
  },
  async created() {
    getCourseInfo({
      courseId: this.$route.params.courseId,
    })
      .then((resp) => {
        console.log("in receiving courseResp ", resp);
        if (resp.success) {
          console.log(resp)
          this.courseInfo = {
            ...resp.data,
            schoolTime:resp.data.historyTeachingList[0].schoolTime
          }
          
          this.$store.commit("courseInfo/setCourseInfo", this.courseInfo);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    getComment({
      courseId: this.$route.params.courseId,
    })
      .then((resp) => {
        this.comments = resp.data1;
        this.commentor = resp.data2;
      })
      .catch((e) => {
        console.log(e);
      });

    this.$store.commit("courseInfo/setCourseInfo", {
      courseInfo: this.courseInfo,
      statistic: this.commentStatistic,
    });
  },
};
</script>

<style scoped>
.body-right .course-comment {
  margin-top: 15px;
}
.body-right {
  min-width: 60%;
}

.body-right .option-group {
  margin-top: 15px;
  max-width: 80px;
}

.body-right .option-group .btn {
  margin-top: 10px;
}
</style>