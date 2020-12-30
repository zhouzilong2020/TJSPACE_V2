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
          >
          </q-input>
          <q-input
            v-model="postContent"
            label="输入你的想法"
            type="textarea"
            maxlength="100"
            counter
            filled
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
                id="orderType3"
                @click="makeOrder(3)"
              />
              <q-btn
                style="background:#225ca6;color:white"
                label="按最新评论时间排序"
                id="orderType0"
                @click="makeOrder(0)"
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
        <!--<div v-for="(o, index) in 3" :key="o" :offset="index> 0 ? 3 : 0" style="padding:5px">-->
        <div v-for="(post, index) in postInfo" :key=index style="padding:5px">
          <q-card class="col-8" style="padding:5px">
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar style="height:2em; width:2em">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <q-item-label style="margin:auto; padding-top:5px">{{post.nickname}}</q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label style="font-size:1.125rem">{{post.title}}</q-item-label>
                <q-item-label caption style="font-size:1rem">
                  {{post.content}}
                </q-item-label>
                <br />
                <q-item-label caption>
                  最新评论于{{post.latestTime}}
                  <br />
                  {{post.replyCount}}评论
                </q-item-label>
              </q-item-section>

              <!-- 交互 -->
              <q-item-section side top>
                  <q-item-label>
                    <q-btn
                      flat
                      icon="thumb_up"
                      color="red"
                    />
                    {{post.positiveCount}}
                    <q-btn
                      flat
                      icon="thumb_down"
                      color="black"
                    />
                    {{post.negativeCount}}
                  </q-item-label>
                </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
    </div>
  
    <!-- 帖子  放在list中显示
    <div class="row justify-center">
      <div class="col-8">
        <q-card class="my-card" style="padding:0">
          <q-card-section style="padding-left:0;padding-right:0">
            <q-list>
              <q-infinite-scroll @load="onLoad" :offset="100">
                <div v-for="(post, index) in postInfo" :key="post.id">
                  <q-item clickable style="margin:0.5rem">

                    <q-item-section
                      v-ripple
                      clickable
                      @click="jumpToPost(index)"
                    >
                      <q-item-label style="font-size:1.125rem">
                        {{ post.postContent }}
                      </q-item-label>
                      <q-item-label caption style="font-size:1rem">
                        <q-icon name="person" />
                        {{ post.posterName }}
                      </q-item-label>
                      <q-item-label caption v-if="post.commentAccount">
                        最新评论于{{ post.latestCommentTime }}
                        <br />
                        {{ post.commentAccount }}评论
                      </q-item-label>
                      <q-item-label caption v-else>
                        发布于{{ post.latestCommentTime }}
                        <br />
                        还没有人评论哦
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label>
                        <q-btn
                          v-if="post.canThumb"
                          flat
                          icon="thumb_up"
                          @click="thumbUp(index)"
                        />
                        <q-btn
                          v-else
                          flat
                          icon="thumb_up"
                          color="red"
                          @click="thumbUp(index)"
                        />
                        {{ post.agreeAccount }}
                        <q-btn
                          v-if="post.canStep"
                          flat
                          icon="thumb_down"
                          @click="thumbDown(index)"
                        />
                        <q-btn
                          v-else
                          flat
                          icon="thumb_down"
                          color="black"
                          @click="thumbDown(index)"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset />
                </div>
                
                <template v-slot:loading v-if="!this.isBottom">
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px" />
                  </div>
                </template>
              </q-infinite-scroll>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>-->
  </q-page>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import {
  getCurPage
} from "../api/bbsApi";


export default {
  components: {},
  data() {
    return {
      bgPath: require("../assets/bbsBackground.png"),
      tjuLogo: require("../assets/TJU.png"),
      isMakingPost: false,
      postHeader:"",
      postContent: "",
      name:"Name",
      header:"Title",
      content:"Content",
      comment_num:"1",
      comment_time:"2020-12-8 9:32",
      postInfo: [],
      //默认以用户Id升序排序
      order: "",
      currentPage: 1,
      sort: "",
      isBottom: false,
      userId: "",
    };
  },
  computed: {
    ...mapState("userInfo", ["token", "userInfo"]),
  },
  methods: {
    init() {
      this.currentPage = 1;
      this.order = "desc";
      this.sort = "userId"
      getCurPage(this.currentPage,this.order,this.sort)
        .then((response) => {
          this.postInfo = response.data.postList;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      window.scrollTo({
        top: 0,
      });
    },
    jumpWhileNotRegister: function() {
      if (this.userId == "") {
        console.log("adaaasda");
        //this.$router.push('index');
      }
    },
    makeNewPost: function() {
      this.isMakingPost = true;
    },
    cancelPost: function() {
      this.isMakingPost = false;
      this.postContent = "";
    },
    submitPost: async function() {
      var resp = await axios.post(
        URL + `Post/post`,
        {},
        {
          headers: {
            Authorization: this.token,
          },
          params: {
            title: this.postHeader.substr(0, 40),
            content: this.postContent,
            userId: this.userId,
          },
        }
      );
      console.log(resp);
      this.isMakingPost = false;
      this.postContent = "";

      this.cleanPage();
      this.getPosts(this.orderType, this.currPage);
      this.currPage++;
    },
    makeOrder: function(type) {
      if (type == 0) {
        document.getElementById("orderType0").style.background = "#004080";
        document.getElementById("orderType3").style.background = "#225ca6";
      } else {
        document.getElementById("orderType3").style.background = "#004080";
        document.getElementById("orderType0").style.background = "#225ca6";
      }
      this.orderType = type;
      this.cleanPage();
      this.getPosts(this.orderType, this.currPage);
      this.currPage++;
    },
    jumpToPost: function(index) {
      this.$router.push({
        name: "Forum",
        params: { postId: this.postInfo[index].postId },
      });
    },
    thumbUp: async function(index) {
      var evaluatable = true;
      await axios
        .get(URL + `Post/CanEvaluate`, {
          headers: {
            Authorization: this.token,
          },
          params: {
            postId: this.postInfo[index].postId,
            userId: this.userId,
          },
        })
        .then((resp) => {
          console.log("return:" + resp.data.canEvaluate);
          if (!resp.data.canEvaluate) {
            evaluatable = false;
            return;
          }
        });
      if (!evaluatable) {
        return;
      }
      axios.post(
        URL + `Post/evaluate`,
        {},
        {
          headers: {
            Authorization: this.token,
          },
          params: {
            postId: this.postInfo[index].postId,
            userId: this.userId,
            type: 1,
          },
        }
      );
      this.postInfo[index].agreeAccount++;
      this.postInfo[index].canThumb = 0;
    },
    thumbDown: async function(index) {
      var evaluatable = true;
      await axios
        .get(URL + `Post/CanEvaluate`, {
          headers: {
            Authorization: this.token,
          },
          params: {
            postId: this.postInfo[index].postId,
            userId: this.userId,
          },
        })
        .then((resp) => {
          if (!resp.data.canEvaluate) {
            evaluatable = false;
            return;
          }
        });
      if (!evaluatable) {
        return;
      }
      var resp = axios.post(
        URL + `Post/evaluate`,
        {},
        {
          headers: {
            Authorization: this.token,
          },
          params: {
            postId: this.postInfo[index].postId,
            userId: this.userId,
            type: 0,
          },
        }
      );
      console.log(resp);
      this.postInfo[index].agreeAccount--;
      this.postInfo[index].canStep = 0;
    },
    cleanPage: function() {
      this.postInfo.length = 0;
      this.currPage = 0;
      this.isBottom = false;
    },
    getPosts: async function(type, page) {
      console.log(page);
      await axios
        .get(URL + `Show/getPosts`, {
          headers: {
            Authorization: this.token,
          },
          params: {
            orderType: type,
            startPosition: page * 12,
            userId: this.userId,
          },
        })
        .then((resp) => {
          console.log(resp.data.posts);
          var posts = resp.data.posts;
          if (posts.length == 0) {
            this.isBottom = true;
          }
          for (var i = 0; i < posts.length; i++) {
            var tempPost = {
              posterName: posts[i].nickname,
              postContent: posts[i].title,
              agreeAccount: posts[i].usefulNum - posts[i].uselessNum,
              latestCommentTime: posts[i].latestReply.replace("T", "/"),
              commentAccount: posts[i].numOfReply,
              postId: posts[i].postId,
              canStep: posts[i].canStep,
              canThumb: posts[i].canThumb,
            };
            this.postInfo.push(tempPost);
            //如果到底了
            if (posts.length < 12) {
              this.isBottom = true;
            }
          }
        });
    }, //end get post
    onLoad(index, done) {
      if (this.isBottom) {
        return;
      }
      setTimeout(() => {
        this.getPosts(this.orderType, this.currPage);
        this.currPage++;
        done();
      }, 1000);
    },
  },
  mounted() {
    this.postId = this.$route.params.postId;
    this.init();
    // this.jumpWhileNotRegister();
  },
};
</script>