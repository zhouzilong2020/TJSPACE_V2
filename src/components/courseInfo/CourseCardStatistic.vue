<template>
  <q-card class="my-card">
    <!-- <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> -->

    <q-card-section class="q-pt-sm q-pb-sm">
      <!-- bookmark_border -->
      <q-btn
        dense
        flat
        color="yellow-8"
        :icon="isCollected"
        class="absolute"
        style="top: 0; right: 0px"
      />

      <div class="row no-wrap items-center">
        <a
          :href="'courseInfo/' + this.courseInfo.courseId + '/1'"
          class="title ellipsis"
          >{{ courseInfo.title }}</a
        >
      </div>
      <div class="row">
        <div>
          <strong class="rating-type">推荐程度</strong>
          <q-rating
            readonly
            v-model="stars"
            icon-half="star_half"
            icon="star_border"
            icon-selected="star"
            :max="5"
            color="orange"
            size="24px"
          />
        </div>
        <div>
          <strong class="rating-type">平均绩点</strong>
          <span :class="getRate(avgGPA * 2)" class="rating">
            {{ avgGPA }}
          </span>
        </div>
        <q-badge class="comment-cnt"
          >{{ statistic.commentCount }}条评价</q-badge
        >
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row q-gutter-sm">
        <div>
          <q-icon style="margin-right: 2px" name="people" /><span
            class="text-caption"
            >{{ courseInfo.teacherName }}</span
          >
        </div>
        <div>
          <q-icon style="margin-right: 2px" name="code" /><span
            class="text-caption"
            >{{ courseInfo.officialId }}</span
          >
        </div>
        <div>
          <q-icon style="margin-right: 2px" name="access_time" /><span
            class="text-caption"
            >{{ courseInfo.period }}学时 {{ courseInfo.credit }}学分</span
          >
        </div>
        <div>
          <q-icon style="margin-right: 2px" name="account_balance" /><span
            class="text-caption"
            >{{ courseInfo.deptName }}</span
          >
        </div>
      </div>
      <div class="text-caption text-grey" style="height: 46px">
        {{
          courseInfo.breif
            ? collapse(courseInfo.breif, 140)
            : "暂时还未收录该课程的简介哦!"
        }}
      </div>
    </q-card-section>
    <q-separator />
    <div
      :class="'top-' + getRate(statistic.avgTotScore)"
      class="q-px-md q-pb-sm row justify-between"
    >
      <div>
        <strong class="rating-type">课程内容</strong>
        <span :class="getRate(statistic.avgContentScore)" class="rating"
          >{{ statistic.avgContentScore }}
        </span>
      </div>
      <div>
        <strong class="rating-type">教学水平</strong>
        <span :class="getRate(statistic.avgTeachingScore)" class="rating">
          {{ statistic.avgTeachingScore }}
        </span>
      </div>
      <div>
        <strong class="rating-type">评分情况</strong>
        <span :class="getRate(statistic.avgGradingScore)" class="rating">
          {{ statistic.avgGradingScore }}
        </span>
      </div>
      <div>
        <strong class="rating-type">课程作业</strong>
        <span :class="getRate(statistic.avgWorkloadScore)" class="rating"
          >{{ statistic.avgWorkloadScore }}
        </span>
      </div>
    </div>
  </q-card>
</template>

<script>
import { collectCourse } from "../../services/courseService";
import { collapse } from "../../utils/utils";
export default {
  data() {
    return {
      stars: 3.5,
      avgGPA: 4.3,
      courseInfo: {
        breif:
          "暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦",
        deptName: "软件学院",
        period: 3,
        credit: 3,
        officialId: "42034201",
        courseId: "1333571301500243969",
        teacherName: "杜庆峰",
        title: "软件工程",
        favorite: false,
      },
      statistic: {
        avgTotScore: "5",
        commentCount: 2,
        avgContentScore: "5",
        avgTeachingScore: "5",
        avgGradingScore: "5",
        avgWorkloadScore: "5",
      },
    };
  },
  props: {
    apiInterface: {
      type: Object,
      default() {
        return {
          breif:
            "暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦暂时还没有收录该条课程的信息哦",
          deptName: "软件学院",
          period: 3,
          credit: 3,
          officialId: "42034201",
          courseId: "1333571301500243969",
          teacherName: "杜庆峰",
          title:
            "软件工程软件工程软件工程软件工程软件工程软件工程软件工程软件工程软件工程软件工程",
          favorite: true,
        };
      },
    },
  },
  computed: {
    isCollected() {
      if (this.courseInfo.favorite) {
        return "bookmark";
      } else {
        return "bookmark_border";
      }
    },
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
      }).then((resp) => {
        if (resp.success) {
          this.courseInfo.favorite = resp.data.favorite;
          // //console.log(this.courseInfo.favorite);
        }
      });
      // .catch((e) => {
      //   //console.log(e);
      // });
    },
    collapse(str, num) {
      return collapse(str, num);
    },
    getRate(grade) {
      grade = Number(grade);
      if (8 <= grade && grade <= 10) {
        return "rating-5";
      }
      if (6 <= grade && grade < 8) {
        return "rating-4";
      }
      if (4 <= grade && grade < 6) {
        return "rating-3";
      }
      if (2 <= grade && grade < 4) {
        return "rating-2";
      }
      if (0 <= grade && grade < 2) {
        return "rating-1";
      }
    },
  },
  created() {
    this.courseInfo = this.apiInterface;
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
a {
  font-size: 22px;
  font-weight: 445;
  text-decoration: underline;
  color: #2440b3;
  :hover {
    color: #315efb;
  }
  :visited {
    color: #771caa;
  }
  em {
    color: #f73131;
    font-style: normal;
  }
}

.comment-cnt {
  height: 16px;
  padding: 4px;
  margin-left: 1px;
}

.rating-1 {
  background: #fb1420;
}
.rating-2 {
  background: #ff7800;
}
.rating-3 {
  background: #ffba00;
}
.rating-4 {
  background: #afc732;
}
.rating-5 {
  background: #5a5;
}
.rating {
  height: 24px;
  width: 38px;
  font-size: 16px;
  text-align: center;
  display: block;
  line-height: 24px;
  font-weight: 700;
  margin: 0 auto;
  color: #ffffff;
  border-radius: 4px;
}
.rating-type {
  display: block;
  color: grey;
  font-size: 12px;
}

.top-rating-5 {
  background: #f1f8f1;
}
.top-rating-4 {
  background: #f7faea;
}
.top-rating-3 {
  background: #ffe59e;
}
.top-rating-2 {
  background: #ffe1c7;
}
.top-rating-1 {
  background: #ffe1c7;
}
</style>

