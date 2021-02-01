<template>
  <q-card class="course-card" style="min-width: 540px" flat bordered>
    <div class="justify-between row q-pt-sm">
      <q-item>
        <q-item-section avatar>
          <q-icon color="black"> ID</q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>课程编号</q-item-label>
          <q-item-label caption
            >{{ courseInfo.officialId ? courseInfo.officialId : 420244 }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item style="width: 200px" clickable @click="handleClick">
        <q-item-section avatar>
          <q-icon color="primary" name="menu_book" />
        </q-item-section>

        <q-item-section>
          <q-item-label>课程名称</q-item-label>
          <q-item-label caption>{{ courseInfo.title }} </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="red" name="house" />
        </q-item-section>

        <q-item-section>
          <q-item-label>开设学院</q-item-label>
          <q-item-label caption> {{ courseInfo.deptName }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="amber" name="perm_identity" />
        </q-item-section>

        <q-item-section>
          <q-item-label>授课教师</q-item-label>
          <q-item-label caption>{{ courseInfo.teacherName }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-btn
        class="text-right"
        style="text-align: right; right: 0"
        flat
        size="11px"
        :color="isCollected"
        icon="favorite"
        @click="handleCollect()"
      />
    </div>

    <div class="q-px-md q-pb-sm">
      <div>简介</div>
      <div class="text-caption text-grey">
        {{
          courseInfo.breif
            ? courseInfo.breif.slice(0, 100)
            : "暂未收录该课程的简介哦！"
        }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { collectCourse } from "../../services/courseService";
export default {
  name: "CourseCard",
  data() {
    return {
      courseInfo: null,
      favorite: null,
    };
  },
  props: {
    apiInterface: {
      type: Object,
      default() {
        return {
          breif:
            "软件工程软件工程软件工程软件工程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程程软件工程软件工程软件工程软件工程软件工程软件工程软件工程软件工程软件工程",
          deptName: "软件学院",
          period: 3,
          credit: 3,
          officialId: "42034201",
          courseId: "1333571301500243969",
          teacherName: "杜庆峰",
          title: "软件工程",
          favorite: false,
        };
      },
    },
  },
  computed: {
    isCollected() {
      if (this.courseInfo.favorite) {
        return "red";
      } else {
        return "grey";
      }
    },
  },
  created() {
    this.courseInfo = this.apiInterface;
  },

  methods: {
    handleClick() {
      this.$router.push({
        name: "courseInfo",
        params: {
          courseId: this.courseInfo.courseId,
          currentPage: 1,
        },
      });
    },
    handleCollect() {
      collectCourse({
        courseId: this.courseInfo.courseId,
      })
        .then((resp) => {
          if (resp.success) {
            this.courseInfo.favorite = resp.data.favorite;
            // //console.log(this.courseInfo.favorite);
          }
        })
        // .catch((e) => {
        //   //console.log(e);
        // });
    },
  },
};
</script>

<style scoped lang="scss">
.course-card {
  width: 100%;
  max-width: 700px;
  max-height: 300px;
}
.full-content {
  line-height: 28px;
}
a {
  color: #07519a;
  text-decoration: none;
}
a:hover {
  color: #ff6600;
  text-decoration: underline;
}
</style>