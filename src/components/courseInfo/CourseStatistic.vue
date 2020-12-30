<template>
  <div class="course-comment-statistics">
    <p class="gt-sm">共{{ commentStatistic.commentCount }}条评论</p>
    <p class="lt-md">共{{ commentStatistic.commentCount }}条</p>

    <ul class="rating-container row">
      <li>
        <div class="column">
          <strong>课程内容</strong>
          <span
            class="rating"
            :class="getRate(commentStatistic.avgContentScore)"
          >
            {{ commentStatistic.avgContentScore }}
          </span>
        </div>
      </li>
      <li>
        <div class="column">
          <strong>教学水平</strong>
          <span
            class="rating"
            :class="getRate(commentStatistic.avgTeachingScore)"
            >{{ commentStatistic.avgTeachingScore }}</span
          >
        </div>
      </li>
      <li>
        <div class="column">
          <strong>评分情况</strong>
          <span
            class="rating"
            :class="getRate(commentStatistic.avgGradingScore)"
            >{{ commentStatistic.avgGradingScore }}</span
          >
        </div>
      </li>
      <li>
        <div class="column">
          <strong>课程作业</strong>
          <span
            class="rating"
            :class="getRate(commentStatistic.avgWorkloadScore)"
            >{{ commentStatistic.avgWorkloadScore }}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>




<script>
export default {
  name: "CourseStatistic",
  props: {
    commentStatistic: {
      type: Object,
      default: function () {
        return {
          avgTotScore: "1",
          commentCount: 2,
          avgContentScore: "0",
          avgTeachingScore: "0",
          avgGradingScore: "0",
          avgWorkloadScore: "0",
        };
      },
    },
  },
  mounted() {
  },
  computed: {
    getRate() {
      return (grade) => {
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
      };
    },
  },
};
</script>






<style scoped>
.course-comment-statistics {
  max-width: 180px;
  height: 400px;
}

.course-comment-statistics .rating-container li {
  margin-bottom: 10px;
}

.course-comment-statistics .rating-container li .rating {
  width: 50px;
  font-size: 22px;
  line-height: 35px;
  border-radius: 6px;
}

.rating-container li .rating {
  display: inline-block;
  width: 20px;
  line-height: 20px;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  margin: 7px auto;
  border-radius: 4px;
}

.course-comment-statistics {
  padding: 14px 10px 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fafafa;
}

.course-comment-statistics > p {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #036;
  margin-bottom: 5px;
  line-height: 34px;
}

.course-comment-statistics .rating-container {
  width: 100%;
  text-align: center;
}

.course-comment-statistics .rating-container li {
  position: relative;
  width: 100%;
  height: 70px;
}

.rating-container {
  padding: 0;
  overflow: hidden;
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
</style>