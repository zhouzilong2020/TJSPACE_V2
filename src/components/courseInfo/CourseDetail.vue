<template>
  <q-card elevated class="course-detail">
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
            <q-item-label caption>{{ courseInfo.teacher }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="amber" name="near_me" />
          </q-item-section>

          <q-item-section>
            <q-item-label>课程编号</q-item-label>
            <q-item-label caption>{{ courseInfo.courseId }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="green" name="today" />
          </q-item-section>

          <q-item-section>
            <q-item-label>开课时间</q-item-label>
            <q-item-label caption>{{ openTime }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="place" />
          </q-item-section>
          <q-item-section>
            <q-item-label>开设学院</q-item-label>
            <q-item-label caption>{{ courseInfo.department }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-section>
      <course-statistic class="q-my-sm" :commentStatistic="commentStatistic" />
      <q-btn
        stretch
        class="full-width btn gt-sm"
        color="primary"
        icon-right="comment"
        :disable="!canMakeComment"
        :to="{
          name: 'MakeComment',
          params: {
            userId: this.userInfo.userid,
            courseId: this.courseInfo.courseId,
          },
        }"
        label="撰写评论"
        unelevated
      >
        <q-tooltip content-class="bg-accent">{{canMakeComment ? '现在就撰写你的评论吧！' : '你已经评价过该课程！'}}</q-tooltip>
      </q-btn>

      <q-btn
        stretch
        class="full-width btn lt-md"
        color="primary"
        icon-right="comment"
        :disable="!canMakeComment"
        :to="{
          name: 'MakeComment',
          params: {
            teacherId: this.courseInfo.teacherId,
            courseId: this.courseInfo.courseId,
          },
        }"
        unelevated
      >
        <q-tooltip content-class="bg-accent">{{canMakeComment ? '现在就撰写你的评论吧！' : '你已经评价过该课程！'}}</q-tooltip>
      </q-btn>

    </q-card-section>
  </q-card>
</template>

<script>
import CourseStatistic from "./CourseStatistic";
import { canMakeComment } from "../../services/commentService";
import { mapState } from "vuex";
export default {
  name: "CourseDetail",
  components: {
    CourseStatistic,
  },
  computed: {
    ...mapState("userInfo", ["userInfo", "token"]),
    openTime() {
      let index = this.courseInfo.section.length - 1;
      return (
        this.courseInfo.section[index].year +
        ` ${this.courseInfo.section[index].semester == 0 ? "春" : "秋"}`
      );
    },
  },
  props: {
    courseInfo: {
      type: Object,
      default: () => {
        return {
          title: "数据库原理与应用",
          teacher: "袁时金",
          teacherId: "0001",
          courseId: "420244",
          section: "2020 春",
          department: "软件学院",
        };
      },
    },
    commentStatistic: {
      type: Object,
    },
  },
  data() {
    return {
      path: require("../../assets/TJU.png"),
      canMakeComment: false,
    };
  },
  watch: {
    async courseInfo() {
      console.log(this.courseInfo.teacherid);
      var resp = await canMakeComment({
        token: this.token,
        userId: this.userInfo.userid,
        teacherId: this.$route.params.teacherId,
        courseId : this.$route.params.courseId
      });
      if (resp.status) {
        this.canMakeComment = resp.canPostComment;
        console.log(this.canMakeComment)
      }
    },
  },
  async mounted() {},
};
</script>

<style scoped>
.course-detail {
  max-width: 200px;
}
.course-detail .course-detail-img {
  max-width: 80px;
  padding: 10px;
  margin: 0 auto;
}
</style>
