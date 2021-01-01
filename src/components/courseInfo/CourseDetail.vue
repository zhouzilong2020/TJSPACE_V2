<template>
  <q-card elevated class="course-detail row">
    <img :src="path" class="course-detail-img" />

    <q-card-section horizontal>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="local_library" />
          </q-item-section>
          <q-item-section>
            <q-item-label>课程名称</q-item-label>
            <q-item-label caption>{{ courseInfo.title }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="red" name="people" />
          </q-item-section>

          <q-item-section>
            <q-item-label>授课教师</q-item-label>
            <q-item-label caption>{{ courseInfo.teacherName }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="amber" name="near_me" />
          </q-item-section>

          <q-item-section>
            <q-item-label>课程编号</q-item-label>
            <q-item-label caption>{{ courseInfo.officialId }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="green" name="today" />
          </q-item-section>

          <q-item-section>
            <q-item-label>开课时间</q-item-label>
            <q-item-label caption>{{ courseInfo.schoolTime }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="green" name="apartment" />
          </q-item-section>

          <q-item-section>
            <q-item-label>开设学院</q-item-label>
            <q-item-label caption>{{ courseInfo.deptName }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="spellcheck" />
          </q-item-section>
          <q-item-section>
            <q-item-label>考察类型</q-item-label>
            <q-item-label caption>{{
              courseInfo.checkType == 0 ? "考察" : "考试"
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section style="padding: 0 auto">
      <CourseAttitudeChart :courseInfo="this.courseInfo" />
    </q-card-section>
    <q-card-section>
      <course-statistic class="q-my-sm" :commentStatistic="commentStatistic" />
      <!-- 这里需要有id才能展示 记得去掉zhushi -->
      <q-btn
        stretch
        class="full-width"
        color="primary"
        icon-right="comment"
        :disable="!canMakeComment"
        :to="{
          name: 'MakeComment',
          params: {
            courseId: this.$route.params.courseId,
          },
        }"
        label="撰写评论"
        unelevated
      >
        <q-tooltip content-class="bg-accent">{{
          canMakeComment ? "现在就撰写你的评论吧！" : "你已经评价过该课程！"
        }}</q-tooltip>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import CourseStatistic from "./CourseStatistic";
import CourseAttitudeChart from "./CourseAttituteChart";
import { mapState } from "vuex";
export default {
  name: "CourseDetail",
  components: {
    CourseStatistic,
    CourseAttitudeChart,
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    commentStatistic() {
      return {
        avgContentScore: this.courseInfo.avgContentScore,
        avgGradingScore: this.courseInfo.avgGradingScore,
        avgTeachingScore: this.courseInfo.avgTeachingScore,
        avgTotScore: this.courseInfo.avgTotScore,
        avgWorkloadScore: this.courseInfo.avgWorkloadScore,
        commentCount: this.courseInfo.commentCount,
      };
    },
  },
  props: {
    courseInfo: {
      type: Object,
      default: () => {
        return {
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
        };
      },
    },
  },
  data() {
    return {
      path: require("../../assets/TJU.png"),
      canMakeComment: true,
    };
  },
  mounted() {},
};
</script>

<style scoped>
.course-detail {
  max-width: 215px;
}
.course-detail .course-detail-img {
  max-width: 80px;
  padding: 10px;
  margin: 0 auto;
}
</style>
