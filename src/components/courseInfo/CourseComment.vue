<template>
  <!-- 添加v-if 当没有获取完数据前 不渲染该组件 -->
  <q-card class="course-review" flat bordered v-if="commentInfo">
    <q-item :class="topColor" class="no-padding">
      <div class="user-infro q-px-md q-my-sm">
        <!-- <q-item-section class="avatar" avatar>
          <q-avatar>
            <img :src="commentInfo.userInfro.photoPath" />
          </q-avatar>
        </q-item-section> -->
        <q-item-section class="user-infro-detail">
          <q-item-label class="nickname text-center text-h6">
            {{
              isAuthor
                ? commentInfo.userInfo.nickname
                : collapse(commentInfo.courseInfo.courseTitle, 14)
            }}
          </q-item-label>
          <q-item-label class="grade text-center" caption>
            {{
              isAuthor
                ? commentInfo.userInfo.grade
                  ? commentInfo.userInfo.grade + "年级"
                  : "某一个年级"
                : commentInfo.courseInfo.teacherName
            }}
          </q-item-label>
          <q-item-label class="major text-center" caption>
            {{
              isAuthor
                ? commentInfo.userInfo.major
                  ? commentInfo.userInfo.major
                  : "某专业"
                : commentInfo.courseInfo.officialId
            }}
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
    <q-item v-if="isDetail" class="course-requirement">
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

    <!-- 具体内容, 默认展示缩略图 -->
    <q-item
      :class="isExpanded ? '' : 'content-hidden'"
      style="overflow: hidden"
      v-if="isDetail"
      class="course-review-body no-margin q-px-md"
      horizontal
    >
      <div class="col-6">
        <q-card-section class="q-py-sm">
          <div class="text-h6 text-grey-8">课程内容</div>
          <p
            class="tetx-body2 text-justify content"
            v-html="commentInfo.commentDetail.content"
          ></p>
        </q-card-section>

        <q-card-section class="q-py-sm">
          <div class="text-h6 text-grey-8">教学水平</div>
          <p
            class="tetx-body2 text-justify content"
            v-html="commentInfo.commentDetail.teaching"
          ></p>
        </q-card-section>
      </div>

      <q-separator vertical />

      <div class="col-6">
        <q-card-section class="q-py-sm">
          <div class="text-h6 text-grey-8">评分情况</div>
          <p class="tetx-body2 content">
            {{ commentInfo.commentDetail.grading }}
          </p>
        </q-card-section>
        <q-card-section class="q-py-sm">
          <div class="text-h6 text-grey-8">课程作业</div>
          <p
            class="tetx-body2 content"
            v-html="commentInfo.commentDetail.workload"
          ></p>
        </q-card-section>
      </div>
    </q-item>

    <q-btn
      color="grey"
      round
      flat
      dense
      :icon="isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
      @click="isExpanded = !isExpanded"
    />
    <q-separator v-if="isDetail" />

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
        <template v-if="!deleteBtn">
          <q-btn
            :color="this.commentInfo.attitude.positive ? 'positive' : 'grey'"
            @click="handleEvaluate(1)"
            size="10px"
            flat
            round
            :loading="btnLoading[1]"
            icon="thumb_up"
            :disable="disableBtn"
          ></q-btn>
          <q-btn
            :color="this.commentInfo.attitude.negative ? 'negative' : 'grey'"
            @click="handleEvaluate(0)"
            size="10px"
            flat
            round
            :loading="btnLoading[0]"
            icon="thumb_down"
            :disable="disableBtn"
          ></q-btn>
        </template>
        <template v-else>
          <q-btn
            @click="confirm()"
            size="10px"
            color="grey-9"
            style="position: absolute; right: -25px"
            flat
            round
            :loading="btnLoading[3]"
            icon="delete"
          />
        </template>
      </span>
    </q-card-section>
    <!-- 仅在个人主页显示 -->
    <q-btn
      v-if="deleteBtn"
      size="12px"
      style="position: absolute; top: 0px; right: 0px"
      color="grey-10"
      flat
      round
      :to="{
        name: 'courseInfo',
        params: {
          courseId: commentInfo.courseInfo.courseId,
          currentPage: 1,
        },
      }"
      icon="more_horiz"
    />
  </q-card>
</template>

<script>
import { evaluateComment, deleteComment } from "../../services/commentService";
import { mapState } from "vuex";
export default {
  name: "CourseComment",
  components: {},
  data: () => {
    return {
      btnLoading: [false, false, false],
      zan: require("../../assets/zan.png"),
      cai: require("../../assets/cai.png"),
      isExpanded: false,
      commentInfo: null,
    };
  },
  props: {
    apiData: null,
    // 个人信息页面不展示评分详情和作业情况, 头部不展示评价人， 只展示头部评分细则和课程名称
    isAuthor: {
      type: Boolean,
      default() {
        return true;
      },
    },
    isDetail: {
      type: Boolean,
      default() {
        return true;
      },
    },
    disableBtn: {
      type: Boolean,
      default() {
        return false;
      },
    },
    deleteBtn: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    isCourseInfo() {
      return !this.isAuthor;
    },
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
    collapse(string, length) {
      for (var i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) > 127 || string.charCodeAt(i) < 0) {
          length -= 2;
        } else {
          length -= 1;
        }
        if (length < 0) {
          return string.slice(0, i - 1) + "...";
        }
      }
      return string;
    },
    /**
     * 确认是否删除对话框
     */
    confirm() {
      this.$q
        .dialog({
          title: "确认删吗？",
          message: "评论删除后就无法找回了哦！",
          cancel: true,
        })
        .onOk(() => {
          //console.log(">>>> second OK catcher");
          this.btnLoading[2] = true;

          deleteComment({ commentId: this.commentInfo.commentId }).then(
            (resp) => {
              //console.log(resp);
              if (resp.success) {
                this.$emit("delete");
              }
            }
          );
          this.btnLoading[2] = false;
        });
    },
    /**
     * 更新对评论的态度， 0negative 1positive ，其他（-1）清除
     */
    async updateAttitude(payload) {
      this.commentInfo.attitude.positive = payload.positive;
      this.commentInfo.attitude.negative = payload.negative;
    },

    async handleEvaluate(type) {
      // //console.log(this.commentInfo);
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
            // //console.log(resp);
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

  mounted() {
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
        nickname: this.apiData.userInfo ? this.apiData.userInfo.nickname : "",
        grade: this.apiData.userInfo ? this.apiData.userInfo.grade + 1 : "",
        major: this.apiData.userInfo ? this.apiData.userInfo.majorName : "",
        degree: this.apiData.userInfo ? this.apiData.userInfo.degree : "",
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
        grading: this.apiData.grading,
        workload: this.apiData.workload,
        date: this.apiData.createTime.slice(0, 10),
        positiveCount: this.apiData.positiveCount,
        negativeCount: this.apiData.negativeCount,
      },
      courseInfo: {
        teacherName: this.apiData.teacherName,
        courseTitle: this.apiData.courseTitle,
        officialId: this.apiData.officialId,
        courseId: this.apiData.courseId,
      },
    };
    // //console.log(this.isEvaluated)
  },
};
</script>

<style scoped>
.course-review {
  border-radius: 10px;
  margin-bottom: 20px;
  max-width: 800px;
}
.nickname {
  margin-top: 10px;
}

.user-infro {
  width: 140px;
}
.user-infro-detail {
  margin-right: 10px;
  display: inline;
}

.content-hidden {
  background-color: rgba(0, 0, 0, 0.08);
  height: 66px;
  filter: blur(20px);
  overflow: hidden;
}

.course-review-body {
  padding-top: 12px;
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
  margin: 0 0;
}
.course-requirement ul {
  list-style: none;
  padding-left: 0;
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
.content {
  padding-left: 24px;
}

.footer {
  margin: 0 auto;
  padding: 0;
  line-height: 25px;
  position: relative;
  width: 90%;
}
.footer span {
  font-size: 0.7em;
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