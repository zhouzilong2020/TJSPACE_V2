<template>
  <div class="row q-gutter-sm q-pa-md flex-center no-wrap items-stretch">
    <!-- <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 detail body-left"> -->
    <div class="detail body-left q-gutter-sm">
      <course-detail
        refs="courseDeatil"
        :courseInfo="courseInfo"
        :commentStatistic="commentStatistic"
      />
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
    ...mapState("userInfo", ["token", "userInfo"]),
    commentStatistic() {
      let statistic = {
        reveiwCnt: 0,
        content: 0,
        teaching: 0,
        grading: 0,
        workload: 0,
      };
      statistic.reveiwCnt = this.comments.length;
      for (let i = 0; i < statistic.reveiwCnt; i++) {
        statistic.content += +this.comments[i].overall;
        statistic.teaching += +this.comments[i].instructor;
        statistic.grading += +this.comments[i].grading;
        statistic.workload += +this.comments[i].workload;
      }
      statistic.content /= statistic.reveiwCnt;
      statistic.teaching /= statistic.reveiwCnt;
      statistic.grading /= statistic.reveiwCnt;
      statistic.workload /= statistic.reveiwCnt;

      statistic.content = statistic.content.toFixed(1);
      statistic.teaching = statistic.teaching.toFixed(1);
      statistic.grading = statistic.grading.toFixed(1);
      statistic.workload = statistic.workload.toFixed(1);

      return statistic;
    },
  },
  data() {
    return {
      text: "",
      logoPath: require("../assets/TJU.png"),
      avatarPath: require("../assets/boy-avatar.png"),
      avatarBGPath: require("../assets/material.png"),

      courseInfo: {
        title: "数据库原理与应用",
        teacher: "袁时金",
        courseId: "420244",
        section: "2020 春",
        department: "软件学院",
        credit: "4",
        sections: ["2020-春"],
        syllabus:
          "Chapter 1: Introduction Chapter 2: Introducation to the Relational Model Chapter 3: Intoduction to SQL Chapter 4: Intermediate SQLChapter 5: Advanced SQL Sections 5.4 onwards omitted. Chapter 6: Other Relational Languages Section 6.1 (Relational Algebra) covered in brief，Sections 6.2 and 6.3 omitted Chapter 7: Entity-Relationship Model  Chapter 8: Relational Database Design  Chapter 9: Application Design and Development  Chapter 10: Storage and File Structure  Sections 10.3, 10.4 and 10.8 omitted Chapter 11: Indexing and Hashing  Cover only Sections 11.1 through 11.3，with a brief outline of Section 11.5 and 11.6 Chapter 12: Query Processing  Cover only Section 12.1 (Overview)  Chapter 14: Transactions  Transaction Concept, Transaction State, Concurrent Executions, Conflict Serializability Introduction to major database products: Oracle",
      },
      comments: [],
    };
  },
  async created() {
    if (this.token) {
      // 加载效果
      this.isLoading = true;
      this.$q.loading.show();
      // 设置定时器
      setTimeout(() => {
        if (this.isLoading) {
          // 如果到了时间还没有加载成功
          this.$q.notify({
            message: "请求超时，请重试",
            position: "center",
            timeout: "2000",
          });
          this.$q.loading.hide();
        }
      }, 5000);

      var courseResp = await getCourseInfo({
        courseId: this.$route.params.courseId,
        teacherId: this.$route.params.teacherId,
        token: this.token,
      });

      console.log("in receiving courseResp ", courseResp);
      if (courseResp.status) {
        this.courseInfo = {
          teacher: courseResp.teacherName,
          teacherId: this.$route.params.teacherId,
          section: courseResp.section,
          department: courseResp.department,
          courseId: this.$route.params.courseId,
          title: courseResp.courseName,
          intro: courseResp.intro,
          credit: courseResp.credit,
          imgPath: courseResp.courseImageUrl,
        };
        this.$store.commit("courseInfo/setCourseInfo", this.courseInfo);
      }

      // 服务器没了！！
      var resp = await getComment({
        courseId: this.$route.params.courseId,
        token: this.token,
      });
      this.comments = resp.data1;
      this.commentor = resp.data2;
      this.$store.commit("courseInfo/setCourseInfo", {
        courseInfo: this.courseInfo,
        statistic: this.commentStatistic,
      });

      // 加载完成
      this.isLoading = false;
      this.$q.loading.hide();

      console.log(this.isLoading);
    }
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