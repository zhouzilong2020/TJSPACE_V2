<template>
  <q-card class="white q-mt-xs">
    <div class="row justify-end">
      <div class="col-auto q-mx-md q-my-md">
      <!--头像-->
        <q-avatar size="50px">
          <img :src="headURL" />
        </q-avatar>
      </div>
      <div class="col q-px-sm q-py-sm">
        <div class="row">
        <!--昵称和回复内容-->
          <div class="text-body1" style="word-break:break-all;word-wrap:break-word">
            {{ nickName }}
            <div style="display: inline-block" v-if="!/^回复@/.test(content)">
              :
            </div>
            {{ content }}
          </div>
        </div>
      </div>
      <div class="col-auto q-px-sm q-py-sm">
      <!--回复按钮-->
        <div class="row justify-end">
          <q-btn
            class="q-mx-xs"
            color="white"
            @click="Reply"
            text-color="black"
            label="回复"
          />
        </div>
        <div class="row q-pt-sm">
          {{ date }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "Reply",
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
    date: {
      type: String,
      require: true,
    },
  },
  methods: {
    Reply() {
      this.$emit("changeReplyPrefix", this.nickName);
    },
  },
};
</script>
