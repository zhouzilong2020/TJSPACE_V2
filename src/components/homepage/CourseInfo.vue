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
    <!-- 遍历渲染 -->
    <q-list padding v-for="(course, index) in collectedCourse" :key="index">
      <q-item class="col no-padding" style="min-height: 100px">
        <q-item-section class="q-px-sm row col-8">
          <q-btn
            class="full-width"
            align="left"
            flat
            :to="{
              name: 'courseInfo',
              params: { courseId: course.courseId, currentPage: 1 },
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
                collapse(course.title, 16)
              }}</q-item-label>
              <q-item-label caption class="text-center">{{
                course.teacherName
              }}</q-item-label>
            </div>
          </q-btn>
        </q-item-section>
        <q-btn
          flat
          size="11px"
          color="grey-8"
          class="full-width"
          icon="delete"
          @click="confirmDelete(course.courseId)"
        />
      </q-item>
      <q-separator />
    </q-list>
    <div
      v-if="currentPage >= totalPage"
      class="text-center text-caption text-grey-8"
    >
      没有更多了哦
    </div>
    <q-btn
      color="grey-10"
      flat
      class="absolute full-width"
      :disable="currentPage >= totalPage"
      icon="more_horiz"
      @click="getMoreCourse"
    />
  </q-card>
</template>



<script>
//import { mapState } from "vuex";
//import axios from "axios";
import { collapse } from "../../utils/utils";
import { getCourse } from "../../services/infoModifyService";
import { collectCourse } from "../../services/courseService";
export default {
  data() {
    return {
      currentPage: 1,
      totalPage: null,
      limit: 6,
      coursePath: require("../../assets/user-info-icon/chakanyuanwenlianjie.svg"),

      collectedCourse: [],
      isRouterAlive: true,
    };
  },
  computed: {},
  methods: {
    collapse(s, l) {
      return collapse(s, l);
    },
    getMoreCourse() {
      this.currentPage += 1;
      getCourse({
        currentPage: this.currentPage,
        limit: this.limit,
      }).then((resp) => {
        // //console.log(resp);
        if (resp.success) {
          this.collectedCourse = this.collectedCourse.concat(
            resp.data.courseList
          );
          this.totalPage = resp.data.totalPage;
          this.currentPage = resp.data.currentPage;
        }
      });
    },
    confirmDelete(courseId) {
      this.$q
        .dialog({
          title: "确认取消收藏吗？",
          message: "取消收藏就不能直接抵达啦",
          cancel: true,
        })
        .onOk(() => {
          collectCourse({
            courseId,
          })
            .then((resp) => {
              if (resp.success) {
                this.collectedCourse.splice(
                  this.collectedCourse.findIndex((e) => {
                    return e.courseId === courseId;
                  }),
                  1
                );
                this.$q.notify({
                  position: "top",
                  type: "positive",
                  message: `收藏课程删除成功`,
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        });
    },
  },

  reload() {
    this.isRouterAlive = false;
    this.$nextTick(function () {
      this.isRouterAlive = true;
    });
  },

  created() {
    getCourse({
      currentPage: this.currentPage,
      limit: this.limit,
    }).then((resp) => {
      // //console.log(resp);
      if (resp.success) {
        this.collectedCourse = resp.data.courseList;
        this.totalPage = resp.data.totalPage;
        this.currentPage = resp.data.currentPage;
      }
    });
  },
};
</script>

<style>
</style>