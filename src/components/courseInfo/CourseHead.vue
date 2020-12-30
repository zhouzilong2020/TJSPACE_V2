<template>
  <q-card bordered flat class="course-detail-head row">
    <!-- 课程信息   -->

    <q-card-section class="row course-detail-head-overall">
      <div class="col">
        <div class="text-h6">{{ courseInfo.title }}</div>
        <div class="course-detail-head-credit">
          <q-chip square color="primary" text-color="white" icon="star">
            {{ courseInfo.credit }}学分
          </q-chip>
        </div>
        <div class="course-detail-head-teacher">
          <q-chip square color="secondary" text-color="white" icon="contacts">{{
            courseInfo.teacherName
          }}</q-chip>
        </div>
        <div class="course-detail-head-teacher">
          <q-chip square color="green" text-color="white" icon="group">{{
            courseInfo.teacherTitle
          }}</q-chip>
        </div>
        <div class="course-detail-head-sections">
          <q-chip
            v-for="(item, i) in courseInfo.historyTeachingList"
            :key="i"
            dense
            color="info"
            text-color="white"
            >{{ `${item.year}-${item.semester == 1 ? "春" : "秋"}` }}</q-chip
          >
        </div>
      </div>
      <div class="col">
        <CourseScoreChart />
      </div>
    </q-card-section>

    <q-separator vertical />

    <!-- 按钮组 收藏，喜欢，分享等功能 -->
    <q-card-actions q-card-actions vertical dense class="option justify-evenly">
      <q-btn
        dense
        class="btn full-width"
        flat
        round
        @click="handleClick()"
        :color="isCollected"
        icon="favorite"
      />
      <q-btn
        dense
        class="btn full-width"
        flat
        round
        disable
        color="accent"
        icon="bookmark"
      />
      <q-btn
        dense
        class="btn full-width"
        flat
        round
        disable
        color="primary"
        icon="share"
      />
    </q-card-actions>

    <q-separator />

    <!-- 课程大纲 -->
    <q-card-section class="syllabus column flex-left">
      <div class="text-h6 flex-left">课程大纲</div>
      <div class="text-subtitle2">
        {{
          courseInfo.intro
            ? courseInfo.intro
            : "暂时没有收录该条课程的课程大纲哦！"
        }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import CourseScoreChart from "./CourseScoreChart";
import { mapState } from "vuex";
export default {
  name: "CourseHead",
  components: { CourseScoreChart },
  created() {
    console.log( this.courseInfo);
  },
  computed: {
    ...mapState("userInfo", ["collectedCourse"]),
    isCollected() {
      // let that = this;
      // let res = this.collectedCourse.filter((obj) => {
      //   return (
      //     obj.courseId == that.$route.params.courseId &&
      //     obj.teacherId == that.$route.params.teacherId
      //   );
      // });
      // if (res.length > 0) {
      //   return "red";
      // } else {
      //   return "grey";
      // }
      return 'grey';
    },
  },
  methods: {
    handleClick() {
      if (this.isCollected == "red") {
        //如果收藏了则取消收藏
        this.$store.dispatch("userInfo/cancelCollect", {
          courseId: this.$route.params.courseId,
          teacherId: this.$route.params.teacherId,
          userId: this.userInfo.userid,
          token: this.token,
        });
      } else {
        //没有收藏则收藏
        this.$store.dispatch("userInfo/collectCourse", {
          courseId: this.$route.params.courseId,
          teacherId: this.$route.params.teacherId,
          userId: this.userInfo.userid,
          token: this.token,
        });
      }
    },
  },
  props: {
    courseInfo: {
      type: Object,
      default: () => {
        return {
          title: "数据库原理与应用",
          teacher: "袁时金",
          credit: "4",
          section: [
            { year: 2017, semester: 0 },
            { year: 2017, semester: 1 },
            { year: 2018, semester: 0 },
            { year: 2018, semester: 1 },
          ],
          imgPath: "",
          intro:
            "Chapter 1: Introduction Chapter 2: Introducation to the Relational Model Chapter 3: Intoduction to SQL Chapter 4: Intermediate SQLChapter 5: Advanced SQL Sections 5.4 onwards omitted. Chapter 6: Other Relational Languages Section 6.1 (Relational Algebra) covered in brief，Sections 6.2 and 6.3 omitted Chapter 7: Entity-Relationship Model  Chapter 8: Relational Database Design  Chapter 9: Application Design and Development  Chapter 10: Storage and File Structure  Sections 10.3, 10.4 and 10.8 omitted Chapter 11: Indexing and Hashing  Cover only Sections 11.1 through 11.3，with a brief outline of Section 11.5 and 11.6 Chapter 12: Query Processing  Cover only Section 12.1 (Overview)  Chapter 14: Transactions  Transaction Concept, Transaction State, Concurrent Executions, Conflict Serializability Introduction to major database products: Oracle",
        };
      },
    },
  },
};
</script>

<style scoped>
.course-detail-head {
  max-width: 800px;
  min-width: 400px;
}
.course-detail-head .option {
  padding: 0px;
  margin: auto auto;
  max-width: 42px;
}

.btn {
  font-size: 1em;
}

.course-detail-head .course-detail-head-overall {
  width: 90%;
}
</style>

