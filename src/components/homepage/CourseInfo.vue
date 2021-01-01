<template>
  <q-card elevated style="min-width: 160px" class="course-info">
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
    <q-list padding v-for="(course, index) in collectedCourse" :key="index">
      <q-item class="col no-padding" style="min-height: 100px">
        <q-item-section class="q-pa-sm row col-8">
          <q-btn
            align="left"
            flat
            :to="{
              name: 'courseInfo',
              params: { courseId: course.courseId },
            }"
          >
            <div class="rows" style="margin: 0 auto">
              <q-avatar
                color="secondary"
                icon="assignment"
                text-color="white"
                size="1.8em"
                style="margin-bottom: 6px"
              ></q-avatar>
              <q-item-label class="h6 text-center">{{
                course.title
              }}</q-item-label>
              <q-item-label caption class="text-center">{{
                course.teacherName
              }}</q-item-label>
            </div>
          </q-btn>
        </q-item-section>
        <q-btn
          flat
          size="12px"
          icon="delete"
          @click="cancelCollect(course.courseId)"
        />
      </q-item>
    </q-list>
  </q-card>
</template>



<script>
//import { mapState } from "vuex";
//import axios from "axios";
import { getCourse } from "../../services/infoModifyService";
import { collectCourse } from "../../services/courseService";
export default {
  data() {
    return {
      //Name: "数据库原理与应用",
      //CourseID: 42024403,
      //College: "软件学院",
      //Semester: "大二下",
      //Credit: "4.0",
      //Teacher: "袁时金",
      currentPage: 1,
      limit: 12,
      coursePath: require("../../assets/user-info-icon/chakanyuanwenlianjie.svg"),
      // collectedCourse: [
      //   { courseName: "数据库原理与应用", teacherName: "袁时金" },
      //   { courseName: "操作系统", teacherName: "张惠娟" },
      // ],
      collectedCourse: [],
      isRouterAlive: true
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
    cancelCollect(courseId) {
      collectCourse({
        courseId: courseId
      })
        .then((resp) => {
          if (resp.success) {
            console.log(resp);
            console.log("success!!!!!!!!!!!!!!!!!!");
            for (var i = 0; i < this.collectedCourse.length; i++) {
              console.log("in for")
              console.log(this.collectedCourse[i].courseId)
              if (this.collectedCourse[i].courseId == courseId){
                this.collectedCourse.splice(i, 1);
              }
            }
            console.log(this.collectedCourse);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  reload(){
    this.isRouterAlive=false
    this.$nextTick(function(){
      this.isRouterAlive=true
    })
  },

  // initCourseFav(){
    
  // },

  created() {
    getCourse({
        currentPage: this.currentPage,
        limit: this.limit,
      }).then((resp) => {
        console.log(resp);
        console.log("aaaaaaaaaaaaaaaaaaaaaaa");
        if (resp.success) {
          this.collectedCourse=resp.data.courseList;
          console.log(this.collectedCourse)
          // this.courseList = resp.data.courseList;
          // this.totalPage = resp.data.totalPage;
          // this.currentPage = resp.data.currentPage;
        }
      });

  },
};
</script>

<style>
</style>