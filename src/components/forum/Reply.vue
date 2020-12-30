<template>
  <q-card class="white q-my-md">
    <div class="row">
      <div class="col-auto">
        <!--头像-->
        <div class="row q-mx-md q-my-md">
          <q-avatar size="100px">
            <img :src="usersInfo[userId].avatar" />
          </q-avatar>
        </div>
        <!--昵称-->
        <div class="row justify-center text-subtitle1">
          {{ usersInfo[userId].nickname }}
        </div>
      </div>
      <!--楼层内容-->
      <div class="col q-mx-lg q-my-lg">
        <div
          v-html="content"
          class="row text-body1 content"
          style="word-break: break-all; word-wrap: break-word"
        ></div>
      </div>
    </div>

    <div class="row justify-end items-center">
      <div class="col-auto">
        <slot> </slot>
        <q-btn class="q-mx-md" @click="expand" :label="expandButtonText" flat round>
          <div v-if="floor !== 1 && subreplyList.length > 0">
            ({{ subreplyList.length }})
          </div>
        </q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <!--展开内容-->
        <q-expansion-item
          v-model="expanded"
          expand-separator
          expand-icon-toggle
          expand-icon-class="hidden"
          :label="floor + '楼 ' + createTime"
        >
          <div v-if="floor !== 1">
            <!--回复-->
            <div v-for="(display, i) in displays" :key="i">
              <Subreply
                :nickname="usersInfo[display.userId].nickname"
                :avatar="usersInfo[display.userId].avatar"
                :content="display.content"
                :createTime="display.createTime"
              >
                <div class="row justify-end">
                  <q-btn
                    class="q-mx-xs"
                    color="white"
                    text-color="black"
                    label="回复"
                    flat
                    @click="changePrefix(usersInfo[display.userId].nickname)"
                  />
                </div>
              </Subreply>
            </div>
            <q-tabs
              v-if="subreplyList.length > 3"
              inline-label
              class="white q-mt-xs shadow-2"
            >
              <!--回复分页-->
              <q-tab
                v-for="i in Math.ceil(subreplyList.length / 3)"
                color="white"
                class="q-mx-xs"
                :key="i"
                :name="i"
                :label="i"
                @click="currentPage = i"
              />
            </q-tabs>
            <!--回复文本框-->
            <q-card class="white q-mt-xs justify-center">
              <div class="row justify-end">
                <div class="col-10">
                  <q-input
                    outlined
                    ref="reply"
                    v-model="subreplyContent"
                    :prefix="subreplyPrefix"
                  />
                </div>
                <div class="col-auto q-pr-sm q-pl-lg q-py-sm">
                  <q-btn
                    class="q-mx-xs"
                    color="white"
                    text-color="black"
                    label="发表"
                    @click="publish()"
                  />
                </div>
              </div>
            </q-card>
          </div>
        </q-expansion-item>
      </div>
    </div>
  </q-card>
</template>
<script>
import Subreply from "./Subreply.vue";
import { postSubreply } from "../../api/bbsApi";
export default {
  name: "Post",
  components: {
    Subreply,
  },
  props: {
    replyId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    createTime: {
      type: String,
      required: true,
    },
    subreplyList: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    usersInfo: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      expanded: false,
      expandButtonText: "回复",
      subreplyPrefix: "",
      subreplyContent: "",
      currentPage: 1,
    };
  },
  computed: {
    //当前展示的子回复页
    displays() {
      return this.subreplyList.slice((this.currentPage - 1) * 3, this.currentPage * 3);
    },
  },
  methods: {
    //修改回复前缀
    changePrefix(nickname) {
      this.subreplyPrefix = "回复@" + nickname + ":";
      this.$refs.reply.focus();
    },
    //展开回复/收起回复
    expand() {
      this.expanded = !this.expanded;
      if (this.floor === 1) {
        this.$emit("toBottom");
        return;
      }
      if (this.expanded) {
        this.expandButtonText = "收起";
        this.$nextTick(() => {
          this.$refs.reply.focus();
        });
      } else {
        this.expandButtonText = "回复";
        this.subreplyPrefix = "";
      }
    },
    //发布子回复
    publish() {
      postSubreply(this.replyId, this.subreplyPrefix + this.subreplyContent).then(() => {
        this.subreplyPrefix = "";
        this.subreplyContent = "";
        this.$q.notify({
          message: "回复成功",
          position: "center",
          timeout: "1000",
        });
      });
    },
  },
};
</script>
<style type="text/css">
.content > div {
  width: 100%;
}
</style>
