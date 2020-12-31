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
          <q-card class="col-8" style="padding:5px">
            <q-item clickable>
              <q-item-section avatar>
                <q-avatar style="height:2em; width:2em">
                  <img :src="post.avatar">
                </q-avatar>
                <q-item-label style="margin:auto; padding-top:5px">{{post.nickname}}</q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label style="font-size:1.125rem">{{post.title}}</q-item-label>
                <q-item-label caption style="font-size:1rem">
                  {{post.content}}
                </q-item-label>
                <br />
                <q-item-label caption v-if="post.replyCount">
                  最新评论于{{post.latestTime}}
                  <br />
                  发布于{{post.createTime}}
                  <br />
                  {{post.replyCount}}评论
                </q-item-label>
                <q-item-label caption v-else>
                  发布于{{post.createTime}}
                  <br />
                  还没有人评论哦
                </q-item-label>
              </q-item-section>

              <!-- 交互 -->
              <q-item-section side top>
                  <q-item-label>
                    <q-btn
                      flat
                      icon="thumb_up"
                      color="red"
                      @click="updateAttitude(1,post.postId,post.positive,post.negative)"
                    />
                    {{Number(post.positiveCount) + Number(thumbUpNum)}}
                    <q-btn
                      flat
                      icon="thumb_down"
                      color="black"
                      @click="updateAttitude(0,post.postId,post.positive,post.negative)"
                    />
                    {{Number(post.negativeCount) + Number(thumbDownNum)}}
                  </q-item-label>
                </q-item-section>
            </q-item>
          </q-card>
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

import {
  getCurPage,
  patchAttitude,
  postPost
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
      postInfo: [],
      //默认以用户Id升序排序
      order: "",
      currentPage: 1,
      totalPage: 0,
      sort: "",
      isBottom: false,
      userId: "",
      //isThumbUp: false,
      //isThumbDown: false,
      thumbUpNum: 0, //更新用户的点赞-1/0/1
      thumbDownNum : 0, //更新用户的点踩-1/0/1
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
          console.log(response);
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
        console.log("Error! Wrong order type!")
      }
    },

    updateAttitude(type,postId,posAttitude,negAttitude) {
      this.thumbUpNum = 0;
      this.thumbDownNum = 0;
      if(posAttitude){ //当前态度为positive
        this.thumbUpNum -= 1;
      }
      if(negAttitude){ //当前态度negative
        this.thumbDownNum -= 1;
      }
      var that=this;
      patchAttitude(postId, type).then((response) => {
        if(response.success){
          that.thumbUpNum += response.data.positive;
          that.thumbDownNum += response.data.negative;
        }
      });
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
      postPost(this.postHeader, this.postContent).then((response) => {
        this.currentPage = 1;
        if(response.success){
          this.$q.notify({
            message: "发帖成功",
            position: "center",
            timeout: "1000",
          });
        }
        this.shiftPage();
        //this.editorContent = "";
      });
    },

    /*
    jumpWhileNotRegister: function() {
      if (this.userId == "") {
        console.log("adaaasda");
        //this.$router.push('index');
      }
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
    },*/
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