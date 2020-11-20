<template>
  <q-card class="white q-my-md">
    <div class="row">
      <div class="col-auto">
        <!--头像-->
        <div class="row q-mx-md q-my-md">
          <q-avatar size="100px">
            <img v-bind:src="headURL" />
          </q-avatar>
        </div>
        <!--昵称-->
        <div class="row justify-center text-subtitle1">
          {{ nickName }}
        </div>
      </div>
      <!--楼层内容-->
      <div class="col q-mx-lg q-my-lg">
        <div class="row  text-body1" style="word-break:break-all;word-wrap:break-word">
          {{ content }}
        </div>
      </div>
    </div>
    <div class="row justify-end items-center">
      <!--点赞按钮-->
      <div class="col-auto">
        <q-btn
          v-if="floor === 1"
          :class="{ activedColor: thumbUp }"
          class="q-mx-sm"
          @click="$emit('evaluate', 1)"
          icon="thumb_up"
          flat
          round
        >
        <!--点踩按钮-->
          <div v-if="thumbUpNum !== 0">{{ thumbUpNum }}</div>
        </q-btn>
        <q-btn
          v-if="floor === 1"
          class="q-mx-sm"
          :class="{ activedColor: thumbDown }"
          @click="$emit('evaluate', 0)"
          icon="thumb_down"
          flat
          round
        />
        <!--展开回复/收起回复-->
        <q-btn class="q-mx-md" @click="Expand" :label="buttonText" flat round>
          <div v-if="floor !== 1 && replys.length > 0">
            ({{ replys.length }})
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
          :label="floor + '楼 ' + date"
        >
          <div v-if="floor !== 1">
          <!--回复-->
            <div v-for="(display, i) in displays" :key="i">
              <Reply
                :nickName="display.nickName"
                :content="display.content"
                :date="display.date"
                @changeReplyPrefix="ChangePrefix"
              />
            </div>
            <q-tabs
              v-if="replys.length > 3"
              inline-label
              class="white q-mt-xs shadow-2"
            >
              <!--回复分页-->
              <q-tab
                v-for="i in Math.ceil(replys.length / 3)"
                color="white"
                class="q-mx-xs"
                :key="i"
                :name="i"
                :label="i"
                @click="ShiftPage(i)"
              />
            </q-tabs>
            <!--回复文本框-->
            <q-card class="white q-mt-xs justify-center">
              <div class="row justify-end">
                <div class="col-10">
                  <q-input
                    outlined
                    ref="reply"
                    v-model="replyContent"
                    :prefix="replyPrefix"
                  />
                </div>
                <div class="col-auto q-pr-sm q-pl-lg q-py-sm">
                  <q-btn
                    class="q-mx-xs"
                    color="white"
                    text-color="black"
                    label="发表"
                    @click="
                      $emit('publish', replyPrefix + replyContent, floor - 1, 1);replyPrefix='';replyContent=''
                    "
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
import Reply from "./Reply.vue";
export default {
  name: "Post",
  components: {
    Reply,
  },
  props: {
    headURL: {
      type: String,
      default: require("../../assets/boy-avatar.png"),
    },
    nickName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    floor: {
      type: Number,
      required: true,
    },
    thumbUpNum: {
      type: Number,
      default: 0,
    },
    thumbUp: {
      type: Boolean,
      default: false,
    },
    thumbDown: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
    replys: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
      buttonText: "回复",
      replyPrefix: "",
      replyContent: "",
      displays: [],
    };
  },
  watch: {
    replys() {
      this.ShiftPage(1);
    },
  },
  methods: {
    //修改回复前缀
    ChangePrefix(nickName) {
      this.replyPrefix = "回复@" + nickName + ":";
      this.$refs.reply.focus();
    },
    //展开回复/收起回复
    Expand() {
      this.expanded = !this.expanded;
      if (this.floor === 1) {
        this.$emit("focusBottom");
        return;
      }
      if (this.expanded) {
        this.buttonText = "收起";
        this.$nextTick(() => {
          this.$refs.reply.focus();
        });
      } else {
        this.buttonText = "回复";
        this.replyPrefix = "";
      }
    },
    //切换回复分页
    ShiftPage(index) {
      this.displays = this.replys.slice((index - 1) * 3, index * 3);
    },
  },
  mounted: function () {
    this.ShiftPage(1);
  },
};
</script>
<style lang="sass">
.activedColor
  color: red;
</style>
