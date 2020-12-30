<template>
  <div class="commentCard">
    <q-stepper
      header-nav
      class=" "
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <!-- 课程选项 -->
      <q-step :name="0" :title="title[0]" icon="settings" :done="step > 0">
        <q-item-label class="text-overline">{{ content[0] }}</q-item-label>
        <div class="q-gutter-sm">
          <q-item
            v-for="(dimention, i) in dimentions"
            :key="i"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox
                v-model="selection"
                :val="dimention.apiName"
                color="primary"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label text-h6 text-weight-bold>{{
                dimention.title
              }}</q-item-label>
              <q-item-label caption>{{ dimention.content }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <q-stepper-navigation class="q-gutter-sm">
          <q-item-label caption>如果没有上述情况可以直接点击继续</q-item-label>
          <q-btn @click="step = 1" color="primary" label="继续进行下一步评价" />
        </q-stepper-navigation>
      </q-step>

      <!-- 课程内容 -->
      <q-step
        :name="1"
        :title="title[1]"
        icon="assignment"
        :done="comment[0] != ''"
      >
        <q-item-label class="text-overline">{{ content[1][0] }}</q-item-label>
        <div>
          <div class="q-pa-md">
            <div class="q-gutter-y-md column">
              <q-rating
                v-model="score[0]"
                size="2.5em"
                :max="10"
                color="green-10"
                icon="star_border"
                icon-selected="star"
              />
              <q-item-label class="text-body2 text-weight-bold"
                >当前评分{{ score[0] }}
              </q-item-label>
            </div>
          </div>
        </div>

        <q-item-label class="q-py-sm text-overline">{{
          content[1][1]
        }}</q-item-label>
        <div class="q-gutter-sm">
          <q-editor
            v-model="comment[0]"
            placeholder="请进一步解释说明"
            ref="editor"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[
              ['bold', 'italic', 'underline'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
              ],
            ]"
          >
          </q-editor>
        </div>

        <q-stepper-navigation class="q-gutter-sm">
          <q-item-label caption>如果没有上述情况可以直接点击继续</q-item-label>
          <q-btn @click="step = 2" color="primary" label="继续进行下一步评价" />
          <q-btn
            flat
            @click="step = 0"
            color="primary"
            label="返回上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- 教学水平 -->
      <q-step
        :name="2"
        :title="title[2]"
        icon="assignment"
        :done="comment[1] != ''"
      >
        <q-item-label class="text-overline">{{ content[2][0] }}</q-item-label>
        <div>
          <div class="q-pa-md">
            <div class="q-gutter-y-md column">
              <q-rating
                v-model="score[1]"
                size="2.5em"
                :max="10"
                color="green-10"
                icon="star_border"
                icon-selected="star"
              />
              <q-item-label class="text-body2 text-weight-bold"
                >当前评分{{ score[1] }}
              </q-item-label>
            </div>
          </div>
        </div>

        <q-item-label class="q-py-sm text-overline">{{
          content[2][1]
        }}</q-item-label>
        <div class="q-gutter-sm">
          <q-editor
            v-model="comment[1]"
            placeholder="请进一步解释说明"
            ref="editor"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[
              ['bold', 'italic', 'underline'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
              ],
            ]"
          >
          </q-editor>
        </div>

        <q-stepper-navigation class="q-gutter-sm">
          <q-item-label caption>如果没有上述情况可以直接点击继续</q-item-label>
          <q-btn @click="step = 3" color="primary" label="继续进行下一步评价" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="返回上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- 评分情况 -->
      <q-step
        :name="3"
        :title="title[3]"
        icon="assignment"
        :done="comment[2] != ''"
      >
        <q-item-label class="text-overline">{{ content[3][0] }}</q-item-label>
        <div>
          <div class="q-pa-md">
            <div class="q-gutter-y-md column">
              <q-rating
                v-model="score[2]"
                size="2.5em"
                :max="10"
                color="green-10"
                icon="star_border"
                icon-selected="star"
              />
              <q-item-label class="text-body2 text-weight-bold"
                >当前评分{{ score[2] }}
              </q-item-label>
            </div>
          </div>
        </div>

        <q-item-label class="q-py-sm text-overline">{{
          content[3][1]
        }}</q-item-label>
        <div class="q-gutter-sm">
          <q-editor
            v-model="comment[2]"
            placeholder="请进一步解释说明"
            ref="editor"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[
              ['bold', 'italic', 'underline'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
              ],
            ]"
          >
          </q-editor>
        </div>

        <q-stepper-navigation class="q-gutter-sm">
          <q-item-label caption>如果没有上述情况可以直接点击继续</q-item-label>
          <q-btn @click="step = 4" color="primary" label="继续进行下一步评价" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="返回上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- 课程作业 -->
      <q-step
        :name="4"
        :title="title[4]"
        icon="assignment"
        :done="comment[3] != ''"
      >
        <q-item-label class="text-overline">{{ content[4][0] }}</q-item-label>
        <div>
          <div class="q-pa-md">
            <div class="q-gutter-y-md column">
              <q-rating
                v-model="score[3]"
                size="2.5em"
                :max="10"
                color="green-10"
                icon="star_border"
                icon-selected="star"
              />
              <q-item-label class="text-body2 text-weight-bold"
                >当前评分{{ score[3] }}
              </q-item-label>
            </div>
          </div>
        </div>

        <q-item-label class="q-py-sm text-overline">{{
          content[4][1]
        }}</q-item-label>
        <div class="q-gutter-sm">
          <q-editor
            v-model="comment[3]"
            placeholder="请进一步解释说明"
            ref="editor"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[
              ['bold', 'italic', 'underline'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
              ],
            ]"
          >
          </q-editor>
        </div>

        <q-stepper-navigation class="q-gutter-sm">
          <q-item-label caption>如果没有上述情况可以直接点击继续</q-item-label>
          <q-btn @click="step = 5" color="primary" label="继续进行下一步评价" />
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="返回上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- 预览 -->
      <q-step :name="5" :title="title[5]" icon="assignment">
        <q-item-label v-if="isFinish" class="text-overline q-pa-md">{{
          content[5][0]
        }}</q-item-label>
        <q-item-label v-else class="text-overline q-pa-md">{{
          content[5][1]
        }}</q-item-label>

        <!-- <course-comment
          v-if="isFinish"
          :apiData="apiInterface"
          :taker="{
            nickname: userInfo.nickname,
            grade: userInfo.degree,
            major: userInfo.majorid,
          }"
          :needGetEva="false"
        /> -->

        <q-stepper-navigation class="q-gutter-sm">
          <div class="row flex-center">
            <q-btn
              @click="handleSubmit()"
              :disable="!isFinish"
              color="primary"
              label="提交"
            />
            <q-btn
              flat
              @click="step = 4"
              color="primary"
              label="返回上一步"
              class="q-ml-sm"
            />
          </div>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { makeComment } from "../../services/commentService";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    isFinish() {
      if (
        this.comment[0] != "" &&
        this.comment[1] != "" &&
        this.comment[2] != "" &&
        this.comment[3] != ""
      ) {
        return true;
      }
      return false;
    },

    apiInterface() {
      return {
        content: this.comment[0],
        teaching: this.comment[1],
        grade: this.comment[2],
        homework: this.comment[3],

        isMidterm: this.selection.includes("midterm") ? 1 : 0,
        isFinal: this.selection.includes("final") ? 1 : 0,
        isQuiz: this.selection.includes("quiz") ? 1 : 0,
        isAssignment: this.selection.includes("assignment") ? 1 : 0,
        isEssay: this.selection.includes("essay") ? 1 : 0,
        isProject: this.selection.includes("project") ? 1 : 0,
        isAttendance: this.selection.includes("attendance") ? 1 : 0,
        isReading: this.selection.includes("reading") ? 1 : 0,
        isPresentation: this.selection.includes("presentation") ? 1 : 0,

        contentScore: this.score[0],
        teachingScore: this.score[1],
        gradingScore: this.score[2],
        workloadScore: this.score[3],

        courseId: this.$route.params.courseId,
      };
    },
  },
  methods: {
    async handleSubmit() {
      makeComment(this.apiInterface)
        .then((resp) => {
          console.log(resp);
          this.$router.push({
            name: "courseInfo",
            params: {
              courseId: this.$route.params.courseId,
              currentPage: 0,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  data() {
    return {
      isLoading: false,
      step: 0,
      score: [5, 5, 5, 5],
      comment: ["1", "1", "1", "1"],
      selection: [],
      title: [
        "请选择本门课程的相应情况",
        "课程内容评价",
        "教学水平评价",
        "评分情况评价",
        "课程作业评价",
        "评价预览",
      ],
      content: [
        "请根据你在上一个学期的上课情况如实填写相应内容",
        [
          "请根据你的个人体验，对该门课程的实际教学内容进行评价（1教学内容没有什么用--10教学内容没对我很有帮助）",
          "请进行进一步的解释说明",
        ],
        [
          "请根据你的个人体验，对该门课程的任课老师的教学水平进行评价（1教学水平较差--10教学水平较好）",
          "请进行进一步的解释说明",
        ],
        [
          "请根据你的个人体验，对该门课程的期末评分情况进行评价（1评分较差--10评分较好）",
          "请进行进一步的解释说明",
        ],
        [
          "请根据你的个人体验，对该门课程的课程作业量进行评价（1作业量较多--10作业量比较少）",
          "请进行进一步的解释说明",
        ],
        ["这将会是你的的评价发表在TJSPACE后的效果", "你还有未完成的内容！"],
      ],
      dimentions: [
        {
          apiName: "midterm",
          title: "期中考试",
          content:
            "该门课程在期中需要参加相应的考试，包括学校统一组织以及老师自行组织的开卷或者闭卷考试",
        },
        {
          apiName: "final",
          title: "期末考试",
          content:
            "该门课程在期末需要参加相应的考试，包括学校统一组织以及老师自行组织的开卷或者闭卷考试",
        },
        {
          apiName: "quiz",
          title: "课堂小测",
          content: "该门课程在学期过程中学要进行课堂测验",
        },
        {
          apiName: "assignment",
          title: "课程作业",
          content: "该门课程在课后需要完成老师在课堂中布置的相应作业",
        },
        {
          apiName: "essay",
          title: "课程论文",
          content: "该门课程需要完成相应的课程论文",
        },
        {
          apiName: "project",
          title: "课程项目",
          content:
            "该门课程需要完成课程项目，项目相对于作业以及论文而言更加复杂",
        },
        {
          apiName: "attendance",
          title: "课堂考勤",
          content: "该门课程老师会在上课期间进行考勤",
        },
        {
          apiName: "reading",
          title: "阅读材料",
          content: "该门课程除了相应的教材外还需要阅读相应的阅读材料",
        },
        {
          apiName: "presentation",
          title: "个人展示",
          content: "该门课程需要进行个人展示",
        },
      ],
    };
  },
};
</script>

<style scoped>
.commentCard {
  max-width: 800px;
}
</style>