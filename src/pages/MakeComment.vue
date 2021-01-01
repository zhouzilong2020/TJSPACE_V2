<template>
  <div class="row q-gutter-md q-pa-md flex-center no-wrap items-stretch">
    <course-detail :courseInfo="courseInfo" class="detail" />
    <make-comment :courseInfo="courseInfo" class="makeComment" />
  </div>
</template>

<script>
import makeComment from "../components/makeComment/makeComment";
import CourseDetail from "../components/courseInfo/CourseDetail";
import { mapState } from "vuex";
export default {
  components: {
    makeComment,
    CourseDetail,
  },
  computed: mapState("courseInfo", ["courseInfo"]),
  data() {
    return {};
  },

  mounted() {
    if (!this.courseInfo) {
      this.$router.push({
        name: "courseInfo",
        params: {
          courseId: this.$route.params.courseId,
          currentPage: 1,
        },
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
};
</script>

<style>
.detail {
  height: 100%;
}
.makeComment {
  width: 100%;
}
</style>

