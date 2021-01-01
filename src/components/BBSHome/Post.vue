<template>
  <q-card class="col-8" style="padding:5px">
    <q-item clickable @click="JumptoForum">
      <q-item-section avatar>
        <q-avatar style="height:2em; width:2em">
          <img :src="postSrc">
        </q-avatar>
        <q-item-label style="margin:auto; padding-top:5px">{{postNickname}}</q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label style="font-size:1.125rem">{{postTitle}}</q-item-label>
        <q-item-label caption style="font-size:1rem">
          {{postContent}}
        </q-item-label>
        <br />
        <q-item-label caption v-if="postReplyCount">
          最新评论于{{postLatestTime}}
          <br />
          发布于{{postCreateTime}}
          <br />
          {{postReplyCount}}评论
        </q-item-label>
        <q-item-label caption v-else>
          发布于{{postCreateTime}}
          <br />
          还没有人评论哦
        </q-item-label>
      </q-item-section>

      <!-- 交互 -->
      <q-item-section side top>
        <q-item-label>
          <q-btn
            flat
            round
            :style="{ color: postPositive ? 'red' : 'gray' }"
            icon="thumb_up"            
            @click="updateAttitude(1)"
          />
          {{Number(postPositiveCount) + Number(thumbUpNum)}}
          <q-btn
            flat
            round
            :style="{ color: postNegative ? 'red' : 'gray' }"
            icon="thumb_down"           
            @click="updateAttitude(0)"
          />
          {{Number(postNegativeCount) + Number(thumbDownNum)}}
        </q-item-label>
        </q-item-section>
    </q-item>
  </q-card>
</template>
<script>
import { patchAttitude } from "../../api/bbsApi";

export default {
  props: {
    postSrc: {
      type: String,
      required: true,
    },
    postNickname: {
      type: String,
      required: true,
    },
    postTitle: {
      type: String,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    postLatestTime: {
      type: String,
      required: true,
    },
    postCreateTime: {
      type: String,
      required: true,
    },
    postReplyCount: {
      type: Number,
      required: true,
    },
    postPositiveCount: {
      type: Number,
      required: true,
    },
    postNegativeCount: {
      type: Number,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    postPositive: {
      type: Boolean,
      required: true,
    },
    postNegative: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      thumbUpNum: 0, //更新用户的点赞-1/0/1
      thumbDownNum : 0, //更新用户的点踩-1/0/1
    };
  },
  methods: {
    updateAttitude(type) {
      this.thumbUpNum = 0;
      this.thumbDownNum = 0;
      if(this.postPositive){ //当前态度为positive
        this.thumbUpNum -= 1;
      }
      if(this.postNegative){ //当前态度negative
        this.thumbDownNum -= 1;
      }
      var that=this;
      patchAttitude(this.postId, type).then((response) => {
        if(response.success){
          that.thumbUpNum += response.data.positive;
          that.thumbDownNum += response.data.negative;
        }
      });
      event.stopPropagation(); 
    },
    JumptoForum: function() {
      this.$router.push({
        path:'/Forum/:'+this.postId,
        name:'Forum',
        params:{
        postId : this.postId
        }
      })
    }
  },
};
</script>
<style type="text/css">
.content > div {
  width: 100%;
}
</style>
