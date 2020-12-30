<template>
  <q-card class="white q-mt-xs">
    <div class="row justify-end">
      <div class="col-auto q-mx-md q-my-md">
        <!--头像-->
        <q-avatar size="50px">
          <img :src="avatar" />
        </q-avatar>
      </div>
      <div class="col q-px-sm q-py-sm">
        <div class="row">
          <!--昵称和回复内容-->
          <div class="text-body1" style="word-break: break-all; word-wrap: break-word">
            {{ nickname }}
            <div style="display: inline-block" v-if="!/^回复@/.test(content)">:</div>
            {{ content }}
          </div>
        </div>
      </div>
      <div class="col-auto q-px-sm q-py-sm">
        <!--回复按钮-->
        <slot></slot>
        <div class="row q-pt-sm">
          {{ createTime }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import config from "../../utils/config";
export default {
  name: "Reply",
  props: {
    content: {
      type: String,
      default: "",
    },
    createTime: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ip: config.ip,
    };
  },
};
</script>
