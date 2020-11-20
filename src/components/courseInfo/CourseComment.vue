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
            {{ commentInfo.userInfo.grade +'年级'}}
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
          <div class="text-h6">课程内容</div>
          <p class="tetx-body2">{{ commentInfo.commentDetail.content }}</p>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">教学水平</div>
          <p class="tetx-body2">{{ commentInfo.commentDetail.teaching }}</p>
        </q-card-section>
      </div>
      <div class="col-6 q-gutter-sm">
        <q-card-section>
          <div class="text-h6">评分情况</div>
          <p class="tetx-body2">{{ commentInfo.commentDetail.grading }}</p>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">课程作业</div>
          <p class="tetx-body2">{{ commentInfo.commentDetail.workload }}</p>
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
        {{ commentInfo.commentDetail.useful }}/{{
          commentInfo.commentDetail.useless + commentInfo.commentDetail.useful
        }}
        人觉得有用</span
      >
      <span class="course-review-option">
        <q-btn
          :color="userfulColor"
          @click="handleEvaluate(1)"
          size="10px"
          flat
          round
          :loading="btnLoading[1]"
          icon="thumb_up"
        ></q-btn>
        <q-btn
          :color="userlessColor"
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
import {
  evaluateComment,
  getEvaluate,
  cancelEvaluation,
} from "../../services/commentService";
import { mapState } from "vuex";
export default {
  name: "CourseComment",
  components: {},
  data: () => {
    return {
      btnLoading: [false, false],
      zan: require("../../assets/zan.png"),
      cai: require("../../assets/cai.png"),
      isEvaluated: null,
      expanded: false,
      commentInfo: null,
    };
  },
  props: {
    apiData: null,
    taker: null,
    needGetEva: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState("userInfo", ["userInfo", "token"]),
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
    userfulColor() {
      if (this.isEvaluated && this.isEvaluated.canEvaluate) {
        return "grey";
      }
      if (this.isEvaluated && this.isEvaluated.type == 1) {
        return "positive";
      }
      return "grey";
    },
    userlessColor() {
      if (this.isEvaluated && this.isEvaluated.canEvaluate) {
        return "grey";
      }
      if (this.isEvaluated && this.isEvaluated.type == 0) {
        return "negative";
      }
      return "grey";
    },
  },
  methods: {
    async handleEvaluate(type) {
      if (this.needGetEva) {
        console.log(type);
        var resp;
        // 如果没有评价则开始评价
        if (this.isEvaluated.canEvaluate) {
          // 按钮显示加载中
          this.btnLoading[type] = true;

          resp = await evaluateComment({
            userId: this.userInfo.userid,
            token: this.token,
            commentId: this.commentInfo.commentId,
          });
          console.log("in vue page handel rvaluate", resp);
          if (resp.status) {
            this.isEvaluated.canEvaluate = false;
            this.isEvaluated.type = type;
            // 评论总数减1
            if (type == 1) {
              this.commentInfo.commentDetail.useful += 1;
            } else {
              this.commentInfo.commentDetail.useless += 1;
            }
          }
          // 按钮加载完成
          this.btnLoading[type] = false;
        }
        // 如果已经评价则取消评价
        else if (this.isEvaluated.type == type) {
          // 按钮显示加载中
          this.btnLoading[type] = true;
          console.log(this.userInfo);
          resp = await cancelEvaluation({
            userId: this.userInfo.userid,
            token: this.token,
            commentId: this.commentInfo.commentId,
          });
          console.log("in vue page handel cancel valuate", resp);
          if (resp.status) {
            this.isEvaluated.canEvaluate = true;
            this.isEvaluated.type = null;
            // 评论总数减1
            if (type == 1) {
              this.commentInfo.commentDetail.useful -= 1;
            } else {
              this.commentInfo.commentDetail.useless -= 1;
            }
          }
          // 按钮显示加载中
          this.btnLoading[type] = false;
        }
      }
    },
  },

  async created() {
    // console.log(this.apiData)
    // var resp = await getUserInfo({userID:this.apiData.userId})
    // console.log(resp)
    console.log("inasifdgaksdyfgsdfgasd", this.taker)
    this.commentInfo = {
      commentId: this.apiData.commentid,
      courseStatistic: {
        content: this.apiData.overall,
        teaching: this.apiData.instructor,
        grading: this.apiData.grading,
        workload: this.apiData.workload,
      },
      userInfo: {
        nickname: this.taker.nickname,
        grade: this.taker.grade,
        major: this.taker.major,
      },
      courseDetail: {
        // year:"2020-2021",
        // semester:"春",
        midterm: this.apiData.midterm,
        final: this.apiData.final,
        quiz: this.apiData.quiz,
        assignment: this.apiData.assignment,
        essay: this.apiData.essay,
        project: this.apiData.project,
        attendance: this.apiData.attendance,
        reading: this.apiData.reading,
        presentation: this.apiData.presentation,
      },
      commentDetail: {
        content: this.apiData.content,
        teaching: this.apiData.teaching,
        grading: this.apiData.grade,
        workload: this.apiData.homework,
        date: this.apiData.date.slice(0, 10),
        useful: this.apiData.usefulnum,
        useless: this.apiData.uselessnum,
      },
    };
    if (this.needGetEva) {
      this.isEvaluated = await getEvaluate({
        token: this.token,
        userId: this.userInfo.userid,
        commentId: this.commentInfo.commentId,
      });
    }
    // console.log(this.isEvaluated)
  },
};
</script>

<style scoped>
.course-review {
  margin-bottom: 20px;
  max-width: 800px;
}

.course-review-body {
  padding: 0px;
  margin: 0px;
  border: 0px;
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