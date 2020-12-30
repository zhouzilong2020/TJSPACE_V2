<template>
  <q-card elevated class="course-info">
    <q-item>
      <q-item-section avatar>
        <q-icon color="black" name="attachment"></q-icon>
      </q-item-section>
      <q-item-section>
        <q-item-label>收藏课程</q-item-label>
      </q-item-section>
    </q-item>
    <q-chip square size="md" color="amber" text-color="white" icon="bookmark">
      Curriculum
    </q-chip>
    <q-list padding v-for="(i, index) in collectedcourse" :key="index">
      <q-item>
        <q-item-section avatar>
          <q-avatar
            color="secondary"
            icon="assignment"
            text-color="white"
          ></q-avatar>
        </q-item-section>
        <q-item-section>
          <q-btn
            align="left"
            padding="none"
            flat
            :to="{
              name: 'courseInfo',
              params: { courseId: i.courseId, teacherId: i.teacherId },
            }"
          >
            {{ i.courseName }}
          </q-btn>
          <q-item-label caption>老师：{{ i.teacherName }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            size="12px"
            icon="delete"
            @click="cancelCollect(i.courseId, i.teacherId)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
//import { mapState } from "vuex";
export default {
  data() {
    return {
      //Name: "数据库原理与应用",
      //CourseID: 42024403,
      //College: "软件学院",
      //Semester: "大二下",
      //Credit: "4.0",
      //Teacher: "袁时金",
      coursePath: require("../../assets/user-info-icon/chakanyuanwenlianjie.svg"),
      collectedcourse: [
        {courseName:"数据库原理与应用",teacherName:"袁时金"},
        {courseName:"操作系统",teacherName:"张惠娟"}
      ],
    };
  },
  computed: {
    //...mapState("userInfo", ["userInfo", "collectedCourse", "token"]),
    //collectedcourse() {
      //return this.collectedCourse;
    //},
  },
  methods: {
    click() {
      alert("ok!");
    },
    cancelCollect(courseId, teacherId) {
      this.$store.dispatch("userInfo/cancelCollect", {
        token: this.token,
        courseId,
        teacherId,
        userId: this.userInfo.userid,
      });
    },
  },

  created() {},
};
</script>

<style>
</style>