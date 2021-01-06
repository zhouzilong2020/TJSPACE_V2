<template>
  <div class="row justify-center">
    <div class="col-auto">
      <q-card class="q-ml-xs" style="width: 230px" />
    </div>
    <div class="col-auto">
      <q-card class="row q-mb-xs z-top" style="width: 750px" id="title" v-scroll="follow">
        <!--帖子标题-->
        <q-banner class="col white">
          <div class="text-h6">{{ title | ellipsis(60) }}</div>
          <q-tooltip content-class="text-h6">{{ title }}</q-tooltip>
        </q-banner>
        <!--只看楼主按钮-->
        <div class="col-auto">
          <q-btn
            class="column-auto q-ma-md shadow-2"
            flat
            dense
            size="md"
            color="white"
            text-color="black"
            :label="onlyPosterText"
            @click="onlyPoster()"
          />
        </div>
      </q-card>
      <div style="width: 750px">
        <!--帖子楼层-->
        <div v-for="(reply, i) in displays" :key="i">
          <Reply
            :replyId="reply.replyId"
            :userId="reply.userId"
            :content="reply.content"
            :createTime="reply.createTime"
            :floor="(currentPage - 1) * 10 + i + 1"
            :subreplyList="reply.subreplyList"
            :usersInfo="usersInfo"
            @toBottom="toBottom"
            @publish="publishSubreply"
          >
            <!--1楼点赞/踩按钮-->
            <template v-if="currentPage == 1 && i == 0">
              <q-btn
                class="q-mx-sm"
                :color="isThumbUp ? 'red' : 'gray'"
                :icon="thumbUp"
                flat
                round
                @click="updateAttitude(1)"
              >
                <div v-if="thumbUpNum !== 0">{{ thumbUpNum }}</div>
              </q-btn>
              <q-btn
                class="q-mx-sm"
                :color="isThumbDown ? 'red' : 'gray'"
                :icon="thumbDown"
                flat
                round
                @click="updateAttitude(0)"
              />
            </template>
          </Reply>
        </div>
        <!--回复文本框-->
        <q-card class="q-my-lg">
          <q-editor v-model="editorContent" min-height="5rem" />
          <div class="row justify-end">
            <q-btn class="q-ma-sm" text-color="black" label="发表" @click="publish()" />
          </div>
        </q-card>
        <!--分页-->
        <div class="row justify-start q-pb-lg">
          <q-pagination
            v-model="currentPage"
            @click="
              shiftPage(() => {
                toTop('auto');
              })
            "
            :max="totalPage"
            :direction-links="true"
          ></q-pagination>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <!--推荐栏-->
      <q-card class="q-ml-xs" id="toTop" style="width: 230px">
        <q-card class="text-weight-bold q-pt-sm q-ml-md"> 最新推荐 </q-card>
        <div v-for="(recommend, i) in recommend" :key="i">
          <template>
            <div class="row items-center">
              <q-card
                class="col-auto q-ma-xs q-px-sm q-py-xs"
                flat
                :style="recommend.color"
              >
                {{ i + 1 }}
              </q-card>
              <router-link
                class="col-auto"
                style="text-decoration: none"
                :to="{
                  name: 'Forum',
                  params: { postId: recommend.postId },
                }"
              >
                {{ recommend.title | ellipsis(24) }}
                <q-tooltip>{{ recommend.title }}</q-tooltip>
              </router-link>
            </div>
          </template>
        </div>
        <!--返回顶部按钮-->
        <q-btn
          @click="toTop('smooth')"
          class="q-py-sm"
          style="width: 230px; position: fixed; bottom: 0"
          color="black"
          icon="keyboard_arrow_up"
          flat
        >
          <q-tooltip>返回顶部</q-tooltip>
        </q-btn>
      </q-card>
    </div>
  </div>
</template>

<script>
import Reply from "../components/forum/Reply";
import { RequestCancel } from "../services/forum";
import { mapState } from "vuex";

import {
  outlinedThumbUp,
  outlinedThumbDown,
} from "@quasar/extras/material-icons-outlined";

import {
  getPostBrief,
  getReplies,
  postReply,
  patchAttitude,
  getPosts,
} from "../api/bbsApi";
export default {
  name: "Forum",
  components: {
    Reply,
  },
  data() {
    return {
      postId: "",
      title: "",
      recommend: [],
      displays: [],
      totalPage: 1,
      editorContent: "",
      currentPage: 1,
      isThumbUp: false,
      isThumbDown: false,
      thumbUpNum: 0,
      isOnlyPoster: false,
      onlyPosterText: "只看楼主",
      jump: false,
      usersInfo: {},
    };
  },
  computed: {
    thumbUp() {
      return this.isThumbUp ? "thumb_up" : outlinedThumbUp;
    },
    thumbDown() {
      return this.isThumbDown ? "thumb_down" : outlinedThumbDown;
    },
    ...mapState("userInfo", ["userInfo"]),
  },
  watch: {
    $route() {
      this.postId = this.$route.params.postId;
      this.init();
      this.shiftPage(() => {
        this.toTop("auto");
      });
    },
  },
  methods: {
    //初始化
    init() {
      this.currentPage = 1;
      getPostBrief(this.postId)
        .then((response) => {
          this.title = response.data.title;
          this.thumbUpNum = response.data.positiveCount;

          this.isThumbUp = response.data.positive;
          this.isThumbDown = response.data.negative;
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //切换分页
    shiftPage(callback) {
      getReplies(this.postId, this.currentPage, {
        limit: 10,
        isOnlyPoster: this.isOnlyPoster,
      }).then((response) => {
        //console.log(response);

        this.displays = response.data.replyList;
        this.usersInfo = response.data.usersInfo;

        this.currentPage = response.data.currentPage;
        this.totalPage = response.data.totalPage;

        callback();
      });
    },
    //发表回复
    publish() {
      postReply(this.postId, this.editorContent).then(() => {
        this.$q.notify({
          message: "回复成功",
          position: "center",
          timeout: "1000",
        });
        this.currentPage =
          this.displays.length == 10 ? this.totalPage + 1 : this.totalPage;
        this.shiftPage(() => {
          this.toTop("auto", () => {
            this.toBottom("smooth");
          });
        });
        this.editorContent = "";
      });
    },
    publishSubreply(floor, subreply) {
      this.displays[floor - 1 - (this.currentPage - 1) * 10].subreplyList.push({
        userId: this.userInfo.userId,
        content: subreply.content,
        createTime: subreply.createTime,
        subreplyId: subreply.subreplyId,
      });
      if (!this.usersInfo[this.userInfo.userid]) {
        this.usersInfo[this.userInfo.userid] = {
          nickname: this.userInfo.nickname,
          avatar: this.userInfo.avatar,
        };
      }
    },
    updateAttitude(type) {
      let pre = this.isThumbUp;
      patchAttitude(this.postId, type).then((response) => {
        this.isThumbUp = response.data.positive;
        this.isThumbDown = response.data.negative;
        this.thumbUpNum += this.isThumbUp - pre;
      });
    },
    //切换只看楼主或取消只看楼主
    onlyPoster() {
      this.isOnlyPoster = !this.isOnlyPoster;
      if (this.isOnlyPoster) {
        this.onlyPosterText = "取消只看楼主";
      } else {
        this.onlyPosterText = "只看楼主";
      }
      this.currentPage = 1;
      this.shiftPage(() => {
        this.toTop("auto");
      });
    },
    //页面滚动至底部
    toBottom(behavior) {
      this.jump = true;
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: behavior,
      });
    },
    //页面滚动至顶部
    toTop(behavior, callback) {
      this.jump = true;
      window.scrollTo({
        top: 0,
        behavior: behavior,
      });

      if (!callback) return;

      if (window.scrollY === 0) {
        return callback();
      }

      let running = () => {
        let top = this.scrollY;
        if (top === 0) {
          this.removeEventListener("scroll", running);
          return callback();
        }
      };

      window.addEventListener("scroll", running, false);
    },
    //帖子标题和推荐栏随页面滚动
    follow(position) {
      var title = document.getElementById("title");
      //var toTop = document.getElementById("toTop");
      if (
        !this.jump &&
        document
          .getElementsByTagName("header")[0]
          .getAttribute("class")
          .indexOf("q-header--hidden") != -1
      ) {
        title.style.top = position - 50 + "px";
        //toTop.style.top = position - 50 + "px";
      } else {
        title.style.top = position + "px";
        //toTop.style.top = position + "px";
      }

      /*toTop.style.top =
        position + document.documentElement.clientHeight - toTop.offsetHeight - 50 + "px";*/

      this.jump = false;
    },
  },
  created() {
    this.postId = this.$route.params.postId;
    if (!this.postId) {
      this.$router.push({
        name: "BBSHomepage",
      });
    }
    this.init();
    this.shiftPage(() => {
      this.toTop("auto");
    });

    //加载推荐栏数据
    getPosts(1, {
      limit: 10,
      sort: ["replyCount"],
    }).then((response) => {
      //console.log(response);
      this.recommend = response.data.postList;
      try {
        this.recommend[0]["color"] = "background:#FFD700";
        this.recommend[1]["color"] = "background:#F5F5F5";
        this.recommend[2]["color"] = "background:#D2691E";
      } catch (error) {
        //recommend.length<3时数组越界
      }
    });
  },
  filters: {
    //截断帖子标题
    ellipsis(string, length) {
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
  },
  destroyed() {
    //切换页面时取消请求
    RequestCancel();
  },
};
</script>
<style lang="sass">
.activedColor
  color: red
</style>
