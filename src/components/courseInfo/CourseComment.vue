<template>
  <!-- 添加v-if 当没有获取完数据前 不渲染该组件 -->
  <q-card class="course-review" flat bordered v-if="commentInfo">
    <q-item :class="topColor">
      <div class="user-infro col-auto row inline justify-evenly">
        <!-- <q-item-section class="avatar" avatar>
                    <q-avatar>
                        <img :src="commentInfo.userInfro.photoPath">
                    </q-avatar>
                </q-item-section> -->
        <q-item-section class="user-infro-detail">
          <q-item-label class="nickname text-center text-h6">
            {{ commentInfo.userInfo.nickname }}
          </q-item-label>

          <q-item-label class="grade text-center" caption>
            {{ commentInfo.userInfo.grade + "年级" }}
          </q-item-label>
          <q-item-label class="major text-center" caption>
            {{ commentInfo.userInfo.major }}
          </q-item-label>
        </q-item-section>
      </div>
      <q-separator vertical />
      <!-- 课程开设时间 -->
      <!-- <q-item-section class="course-detail col-auto">
                <q-item-label class="course-year">
                    {{commentInfo.courseDetail.year}}
                </q-item-label>
                <q-item-label class="course-semester">
                    {{commentInfo.courseDetail.semester}}
                </q-item-label>
            </q-item-section>
            <q-separator vertical/> -->
      <!-- 课程评分情况 -->
      <q-item-section class="course-review-statistic">
        <ul class="rating-container row justify-evenly">
          <li>
            <div class="column">
              <strong>课程内容</strong>
              <span
                class="rating"
                :class="getRate(commentInfo.courseStatistic.content)"
                >{{ commentInfo.courseStatistic.content }}</span
              >
            </div>
          </li>
          <li>
            <div class="column">
              <strong>教学水平</strong>
              <span
                class="rating"
                :class="getRate(commentInfo.courseStatistic.teaching)"
                >{{ commentInfo.courseStatistic.teaching }}</span
              >
            </div>
          </li>
          <li>
            <div class="column">
              <strong>评分情况</strong>
              <span
                class="rating"
                :class="getRate(commentInfo.courseStatistic.grading)"
                >{{ commentInfo.courseStatistic.grading }}</span
              >
            </div>
          </li>
          <li>
            <div class="column">
              <strong>课程作业</strong>
              <span
                class="rating"
                :class="getRate(commentInfo.courseStatistic.workload)"
                >{{ commentInfo.courseStatistic.workload }}</span
              >
            </div>
          </li>
        </ul>
      </q-item-section>
    </q-item>

    <q-separator />
    <!-- 课程的一些作业情况 -->
    <q-item class="course-requirement q-gutter-sm q-px-sm q-my-sm">
      <ul class="">
        <li :class="[commentInfo.courseDetail.midterm == true ? 'active' : '']">
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.midterm == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >期中考试
        </li>
        <li :class="[commentInfo.courseDetail.final == true ? 'active' : '']">
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.final == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >期末考试
        </li>
        <li :class="[commentInfo.courseDetail.quiz == true ? 'active' : '']">
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.quiz == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >课堂小测
        </li>
      </ul>
      <ul class="">
        <li
          :class="[commentInfo.courseDetail.assignment == true ? 'active' : '']"
        >
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.assignment == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >课程作业
        </li>
        <li :class="[commentInfo.courseDetail.essay == true ? 'active' : '']">
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.essay == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >课程论文
        </li>
        <li :class="[commentInfo.courseDetail.project == true ? 'active' : '']">
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.project == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >课程项目
        </li>
      </ul>
      <ul class="">
        <li
          :class="[commentInfo.courseDetail.attendance == true ? 'active' : '']"
        >
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.attendance == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >课堂考勤
        </li>
        <li :class="[commentInfo.courseDetail.reading == true ? 'active' : '']">
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.reading == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >阅读材料
        </li>
        <li
          :class="[
            commentInfo.courseDetail.presentation == true ? 'active' : '',
          ]"
        >
          <span
            class="iconfont"
            :class="[
              commentInfo.courseDetail.presentation == true
                ? 'icon-duigou'
                : 'icon-icon_wrong',
            ]"
          ></span
          >个人展示
        </li>
      </ul>
    </q-item>

    <q-separator />

    <!-- 具体内容 -->
    <q-item class="course-review-body" horizontal>
      <div class="col-6 q-gutter-sm">
        <q-card-section>
          <div class="text-h6 text-center">课程内容</div>
          <p class="tetx-body2 text-justify">
            {{ commentInfo.commentDetail.content }}
          </p>
        </q-card-section>

        <q-card-section>
          <div class="text-h6 text-center">教学水平</div>
          <p class="tetx-body2 text-justify">
            {{ commentInfo.commentDetail.teaching }}
          </p>
        </q-card-section>
      </div>
      <div class="col-6 q-gutter-sm">
        <q-card-section>
          <div class="text-h6 text-center">评分情况</div>
          <p class="tetx-body2 text-justify">
            {{ commentInfo.commentDetail.grading ? 1 : 2 }}
          </p>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 text-center">课程作业</div>
          <p class="tetx-body2 text-justify">
            {{ commentInfo.commentDetail.workload ? 1 : 2 }}
          </p>
        </q-card-section>
      </div>
    </q-item>

    <q-separator />
    <!-- footer -->
    <q-card-section class="footer row justify-between">
      <span class="course-review-date"
        >评论于 {{ commentInfo.commentDetail.date }}</span
      >
      <span class="course-review-detail">
        {{ commentInfo.commentDetail.positiveCount }}/{{
          commentInfo.commentDetail.positiveCount +
          commentInfo.commentDetail.negativeCount
        }}
        人觉得有用</span
      >
      <span class="course-review-option">
        <q-btn
          :color="this.commentInfo.attitude.positive ? 'positive' : 'grey'"
          @click="handleEvaluate(1)"
          size="10px"
          flat
          round
          :loading="btnLoading[1]"
          icon="thumb_up"
        ></q-btn>
        <q-btn
          :color="this.commentInfo.attitude.negative ? 'negative' : 'grey'"
          @click="handleEvaluate(0)"
          size="10px"
          flat
          round
          :loading="btnLoading[0]"
          icon="thumb_down"
        ></q-btn>
      </span>
    </q-card-section>
  </q-card>
</template>

<script>
import { evaluateComment } from "../../services/commentService";
import { mapState } from "vuex";
export default {
  name: "CourseComment",
  components: {},
  data: () => {
    return {
      btnLoading: [false, false],
      zan: require("../../assets/zan.png"),
      cai: require("../../assets/cai.png"),
      expanded: false,
      commentInfo: null,
    };
  },
  props: {
    apiData: null,
  },
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    topColor() {
      if (this.commentInfo) {
        let total = 0;
        total += Number(this.commentInfo.courseStatistic.content);
        total += Number(this.commentInfo.courseStatistic.teaching);
        total += Number(this.commentInfo.courseStatistic.grading);
        total += Number(this.commentInfo.courseStatistic.workload);
        total /= 4;
        if (8 <= total && total <= 10) {
          return "top-rating-5";
        }
        if (6 <= total && total < 8) {
          return "top-rating-4";
        }
        if (4 <= total && total < 6) {
          return "top-rating-3";
        }
        if (2 <= total && total < 4) {
          return "top-rating-2";
        } else {
          return "top-rating-1";
        }
      }
      return 0;
    },
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
    isEvaluated() {
      return this.commentInfo.negative && this.commentInfo.positive;
    },
  },
  methods: {
    /**
     * 更新对评论的态度， 0negative 1positive ，其他（-1）清除
     */
    async updateAttitude(payload) {
      this.commentInfo.attitude.positive = payload.positive;
      this.commentInfo.attitude.negative = payload.negative;
    },

    async handleEvaluate(type) {
      console.log(this.commentInfo);
      this.btnLoading[type] = true;

      if (
        !(this.commentInfo.attitude.positive == true && type == 1) ||
        !(this.commentInfo.attitude.negative == true && type == 0)
      ) {
        evaluateComment({
          type,
          commentId: this.commentInfo.commentId,
        })
          .then((resp) => {
            // console.log(resp);
            if (resp.success) {
              // 先减去原来的评价人数上统一恢复到没有评价的状态
              if (this.commentInfo.attitude.positive) {
                this.commentInfo.commentDetail.positiveCount -= 1;
              }
              if (this.commentInfo.attitude.negative) {
                this.commentInfo.commentDetail.negativeCount -= 1;
              }
              // 更新评价后的态度
              this.commentInfo.attitude.positive = resp.data.positive;
              this.commentInfo.attitude.negative = resp.data.negative;
              // 更新评价后人数
              if (this.commentInfo.attitude.positive) {
                this.commentInfo.commentDetail.positiveCount += 1;
              }
              if (this.commentInfo.attitude.negative) {
                this.commentInfo.commentDetail.negativeCount += 1;
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
        this.btnLoading[type] = false;
      }
    },
  },

  async created() {
    this.commentInfo = {
      commentId: this.apiData.commentId,
      attitude: {
        positive: this.apiData.positive,
        negative: this.apiData.negative,
      },
      courseStatistic: {
        content: this.apiData.contentScore,
        teaching: this.apiData.teachingScore,
        grading: this.apiData.gradingScore,
        workload: this.apiData.workloadScore,
      },
      userInfo: {
        nickname: "this.taker.nickname",
        grade: "this.taker.grade",
        major: "this.taker.major",
      },
      courseDetail: {
        // year:"2020-2021",
        // semester:"春",
        midterm: this.apiData.isMidterm,
        final: this.apiData.idFinal,
        quiz: this.apiData.isQuiz,
        assignment: this.apiData.isAssignment,
        essay: this.apiData.isEssay,
        project: this.apiData.isProject,
        attendance: this.apiData.isAttendance,
        reading: this.apiData.isReading,
        presentation: this.apiData.isPresentation,
      },
      commentDetail: {
        content: this.apiData.content,
        teaching: this.apiData.teaching,
        grading: this.apiData.grade,
        workload: this.apiData.workload,
        date: this.apiData.createTime.slice(0, 10),
        positiveCount: this.apiData.positiveCount,
        negativeCount: this.apiData.negativeCount,
      },
    };
    // console.log(this.isEvaluated)
  },
};
</script>

<style scoped>
.course-review {
  margin-bottom: 20px;
  max-width: 800px;
}
.nickname {
  margin-top: 10px;
}
.user-infro-detail {
  margin-right: 10px;
  display: inline;
}

.course-detail {
  margin: 0 auto;
}
.course-detail .course-year {
  text-align: center;
  margin: 0 auto;
  padding: 8px;
}
.course-detail .course-semester {
  text-align: center;
  margin-bottom: 10px;
}

.rating-container {
  padding: 0;
  overflow: hidden;
  list-style: none;
}
.rating-container strong {
  margin-bottom: 5px;
}
.rating-container li div .rating {
  display: inline-block;
  width: 40px;
  line-height: 30px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  margin: 0 auto;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
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

.course-requirement {
  color: grey;
}
.course-requirement ul {
  list-style: none;
  margin: 0 auto;
}
.course-requirement ul li {
  line-height: 25px;
  color: grey;
  font-weight: 800;
}
.course-requirement ul .active {
  color: green;
}
.course-requirement ul .iconfont {
  margin-right: 5px;
}

.footer {
  margin: 0 auto;
  padding: 0;
  line-height: 25px;
  position: relative;
  width: 90%;
}
.footer span {
  font-size: 3px;
  color: grey;
  font-weight: 800;
}

.footer .course-review-detail {
  position: relative;
}

.footer .course-review-option {
  position: relative;
  font-size: 2px;
  line-height: 0px;
  height: 0px;
  color: grey;
  position: relative;
  bottom: 2px;
}

.review-for-comment q-editor {
  background-color: white;
}
</style>