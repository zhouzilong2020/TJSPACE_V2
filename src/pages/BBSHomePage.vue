<template>
  <q-page>
    <!-- title -->
    <div class="row justify-center" id="bbsTitle">
      <div class="col-8">
        <q-img :src="bgPath" style="width: 100%">
          <div class="absolute-bottom-left">
            <p>
              <q-img :src="tjuLogo" style="width: 100%" />
              TJ SPACE-BBS
            </p>
          </div>
        </q-img>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-8">
        <!-- 发布主题贴 -->
        <div v-show="isMakingPost">
          <q-input
            v-model="postHeader"
            label="输入标题"
            maxlength="20"
            counter
            filled
            :rules="[val => !!val || '输入不能为空']"
          >
          </q-input>
          <q-input
            v-model="postContent"
            label="输入你的想法"
            type="textarea"
            maxlength="100"
            counter
            filled
            :rules="[val => !!val || '输入不能为空']"
          >
          </q-input>
        </div>
        <!-- 交互控件 -->
        <div style="height: 3rem">
          <div style="float: right">
            <q-btn-group v-if="isMakingPost">
              <q-btn color="primary" label="取消" @click="cancelPost" />
              <q-btn color="primary" label="确定" @click="submitPost" />
            </q-btn-group>
            <q-btn-group v-else>
              <q-btn
                style="background:#004080;color:white"
                label="按主题发布时间排序"
                id="orderType0"
                @click="makeOrder(0)"
              />
              <q-btn
                style="background:#225ca6;color:white"
                label="按最新评论时间排序"
                id="orderType1"
                @click="makeOrder(1)"
              />
              <q-btn
                color="primary"
                icon="add_comment"
                label="发布"
                @click="makeNewPost"
              />
            </q-btn-group>
          </div>
        </div>
      </div>
    </div>

    <!--帖子 我写的-->
    <div class="row justify-center">
      <div class="col-8">
        <div v-for="(post, index) in postInfo" :key=index style="padding:5px">
          <Post
            :postSrc="post.avatar"
            :postNickname="post.nickname"
            :postTitle="post.title"
            :postContent="post.content"
            :postLatestTime="post.latestTime"
            :postCreateTime="post.createTime"
            :postReplyCount="post.replyCount"
            :postPositiveCount="post.positiveCount"
            :postNegativeCount="post.negativeCount"
            :postPositive="post.positive"
            :postNegative="post.negative"
            :postId="post.postId"
          >
          </Post>
        </div>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="currentPage"
            color="blue"
            :max="totalPage"
            :max-pages="totalPage/2"
            :boundary-numbers="true"
            @click="showPage()"
          >
          </q-pagination>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
//import axios from "axios";
import { mapState } from "vuex";
import Post from "../components/BBSHome/Post.vue";
import {
  getCurPage,
  postPost
} from "../api/bbsApi";


export default {
  components: {
    Post
  },
  data() {
    return {
      bgPath: require("../assets/bbsBackground.png"),
      tjuLogo: require("../assets/TJU.png"),
      isMakingPost: false,
      postHeader:"",
      postContent: "",
      postInfo: [],
      //默认以用户Id升序排序
      order: "",
      currentPage: 1,
      totalPage: 0,
      sort: "",
      isBottom: false,
      userId: "",
    };
  },
  computed: {
    ...mapState("userInfo", ["token", "userInfo"]),
  },
  methods: {
    showPage() {   
      getCurPage(this.currentPage,this.order,this.sort)
        .then((response) => {
          this.postInfo = response.data.postList;
          this.totalPage = response.data.totalPage;
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      window.scrollTo({
        top: 0,
      });
    },

    makeOrder: function(type) {
      if (type == 0) {
        document.getElementById("orderType0").style.background = "#004080";
        document.getElementById("orderType1").style.background = "#225ca6";
        this.sort = "createTime";
        this.currentPage = 1;
        this.showPage();
      } 
      else if(type == 1) {
        document.getElementById("orderType0").style.background = "#004080";
        document.getElementById("orderType1").style.background = "#225ca6";
        this.sort = "latestTime";
        this.currentPage = 1;
        this.showPage();
      }
      else {
        //console.log("Error! Wrong order type!")
      }
    },

    makeNewPost: function() {
      this.isMakingPost = true;
    },
    cancelPost: function() {
      this.isMakingPost = false;
      this.postContent = "";
      this.postHeader = "";
    },
    submitPost: async function() {
      if(this.postHeader == "" || this.postContent == "") {
        this.$q.notify({
            message: "发帖失败",
            position: "center",
            timeout: "1000",
          });
      }
      else {
        postPost(this.postHeader, this.postContent).then((response) => {
          this.currentPage = 1;
          if(response.success){
            this.$q.notify({
              message: "发帖成功",
              position: "center",
              timeout: "1000",
            });
          }
          this.showPage();
          //this.editorContent = "";
        });
      }
      this.isMakingPost = false;
      this.postContent = "";
      this.postHeader = ""; 
    },

  },

  mounted() {
    this.postId = this.$route.params.postId;
    this.currentPage = 1;
    this.order = "desc";
    this.sort = "userId"
    this.showPage();
    // this.jumpWhileNotRegister();
  },
};

</script>