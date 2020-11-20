<template>
  <!-- 你的内容将会被插入在这里 -->

  <div class="main" style="margin-left: 350px">
    <div class="body-right row">
      <div class="left col-8">
        <div class="q-pa-md">
          <div class="q-gutter-md">
            <div style="text-align: center">
              <span class="word">同心同德</span>
              <img
                :src="path1"
                style="
                  height: 130px;
                  width: 130px;
                  margin-left: 25px;
                  margin-right: 25px;
                "
              />
              <span class="word">济人济世</span>
            </div>
            <div class="search-bar">
              <div style="text-align: center">
                <q-input
                  class="inputbar"
                  rounded
                  outlined
                  id="textId"
                  v-model="input"
                  value
                  placeholder="请输入需要搜索的课程名"
                  style="width: 780px"
                >
                  <button @click="btnclick()" style="border: none">
                    <q-icon name="search"></q-icon>
                  </button>
                </q-input>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isShow">
          <div
            class="content"
            v-for="item in newcourseInfo"
            :key="item.label"
            :value="item.value"
          >
            <q-card
              clickable
              v-ripple
              class="my-cardinfo"
              bordered
              @click="click(item)"
              @mouseenter="mouseEnter(item.courseId, item.teacherId)"
              @mouseleave="mouseLeave()"
              :class="{
                itemHover:
                  itemIndex == item.courseId && itemName == item.teacherId,
              }"
            >
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="item.courseImageUrl" />
                  </q-avatar>
                </q-item-section>

                <q-item-section style="margin-top: 5px">
                  <div class="row">
                    <q-item-label>{{ item.courseName }}</q-item-label>
                    <q-item-label
                      style="position: absolute; left: 600px; margin-top: 0px"
                      >课程号： {{ item.courseId }}</q-item-label
                    >
                  </div>
                  <div class="row" style="margin-top: 5px">
                    <q-item-label caption
                      >授课老师： {{ item.teacherName }}</q-item-label
                    >
                    <q-item-label
                      caption
                      style="margin-left: 50px; margin-top: 0px"
                      >课程学分： {{ item.courseCredit }}</q-item-label
                    >
                  </div>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-card-section horizontal>
                <q-card-section style="width: 500px">
                  {{ item.courseIntro }}
                </q-card-section>

                <q-separator vertical />

                <q-card-section
                  class="col-4"
                  style="text-align: center; color: #e10602"
                  >分数: {{ item.courseGrade }}</q-card-section
                >
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div v-else>
          <div class="wordrec" style="text-align: center">recommendations</div>

          <q-separator style="width: 820px" />

          <div class="row" style="margin-left: 0px">
            <template
              class="content"
              style="margin-top: 5px"
              v-for="(item, index) in courseInfo"
              :value="item.value"
            >
              <q-card
                class="my-cardrec"
                :key="index"
                @click="click(item)"
                style="margin-left: 45px; margin-top: 15px"
                @mouseenter="mouseEnter(index)"
                @mouseleave="mouseLeave()"
                :class="{ itemHover: itemIndex == index }"
              >
                <div v-if="index % 3 == 0">
                  <q-img
                    :src="path11"
                    basic
                    style="width: 200px; height: 200px"
                  >
                    <div class="absolute-bottom text-subtitle2 text-center">
                      {{ item.name }}
                    </div>
                  </q-img>
                </div>
                <div v-if="index % 3 == 1">
                  <q-img
                    :src="path12"
                    basic
                    style="width: 200px; height: 200px"
                  >
                    <div class="absolute-bottom text-subtitle2 text-center">
                      {{ item.name }}
                    </div>
                  </q-img>
                </div>
                <div v-if="index % 3 == 2">
                  <q-img
                    :src="path13"
                    basic
                    style="width: 200px; height: 200px"
                  >
                    <div class="absolute-bottom text-subtitle2 text-center">
                      {{ item.name }}
                    </div>
                  </q-img>
                </div>
              </q-card>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { search } from "../services/search";
export default {
  components: {},
  data() {
    return {
      itemIndex: null,
      itemName: null,
      input: "",
      isShow: 0,
      path11: require("../assets/sjk.jpg"),
      path12: require("../assets/xtjg.jpg"),
      path13: require("../assets/java.jpg"),
      path1: require("../assets/TJU.png"),
      path: require("../assets/zhuzi.jpeg"),
      inputSearch: "",
      courseInfo: [
        {
          name: "数据库原理与应用",
          teacher: "袁时金",
          intro:
            "这是一门辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡课程",
          courseId: "420023",
          teacherId: "0002",
          imagePath: "../assets/sjk.jpg",
        },
        {
          name: "Jave EE",
          teacher: "范鸿飞",
          intro:
            "这是仍然是一门辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡课程",
          courseId: "420300",
          teacherId: "0001",
          imagePath: "../assets/java.jpg",
        },
        {
          name: "操作系统",
          teacher: "张慧娟",
          intro:
            "这是还是一门辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡课程",
          courseId: "420024",
          teacherId: "0004",
          imagePath: "../assets/czxt.jpg",
        },
      ],
      newcourseInfo: [],
      text: "",
      active: -1,
      drawer: false,
      logoPath: require("../assets/TJU.png"),
      avatarPath: require("../assets/boy-avatar.png"),
      avatarBGPath: require("../assets/material.png"),
      str: "",
      userInfo: {
        email: "1",
        nickname: "1",
      },
    };
  },

  methods: {
    mouseEnter(index, name) {
      this.itemIndex = index;
      this.itemName = name;
      //            console.log("mouseon",this.itemIndex)
    },
    mouseLeave() {
      this.itemIndex = null;
      this.itemName = null;
      //            console.log("mouseleave",this.itemIndex)
    },
    click(data) {
      this.$router.push({
        name: "courseInfo",
        params: {
          courseId: data.courseId,
          teacherId: data.teacherId,
        },
      });
    },
    btnclick() {
      this.$nextTick(async function () {
        //       this.value = document.getElementById("textId").value;
        console.log("search", this.input);
        if (this.input != " ") {
          var resp1 = await search({
            token: this.token,
            searchKey: this.input,
          });
          this.newcourseInfo = resp1;
          console.log('asdasdasdasdas',resp1)
          if (!this.newcourseInfo) {
            alert("未搜索到相关课程");
          } else {
            for (var i = 0; i < this.newcourseInfo.length; i++) {
              if (this.newcourseInfo[i].courseIntro.length > 30) {
                this.str = this.newcourseInfo[i].courseIntro.slice(0, 29);
                this.newcourseInfo[i].courseIntro = this.str + "......";
              }
            }
            this.isShow = 1;
            console.log("result", this.newcourseInfo);
          }
        }
      });
    },
  },
  props: {},
  computed: {
    ...mapState("userInfo", ["isLoading", "token"]),
    keyword() {
      return this.$route.params.keyword;
    },
  },
  watch: {
    keyword() {
      console.log("changed", this.$route.params.keyword);
      if (this.$route.params.keyword != "") {
        console.log("收到信息", "收到信息");
        this.input = this.$route.params.keyword;
        this.$nextTick(async function () {
          //       this.value = document.getElementById("textId").value;
          console.log("search", this.$route.params.keyword);
          var resp1 = await search({
            searchKey: this.$route.params.keyword,
            token: this.token,
          });
          this.newcourseInfo = resp1;

          if (!this.newcourseInfo) {
            alert("未搜索到相关课程");
          } else {
            for (var i = 0; i < this.newcourseInfo.length; i++) {
              if (this.newcourseInfo[i].courseIntro.length > 30) {
                this.str = this.newcourseInfo[i].courseIntro.slice(0, 29);
                this.newcourseInfo[i].courseIntro = this.str + "......";
              }
            }
            this.isShow = 1;
            console.log("result", this.newcourseInfo);
          }
        });
      }
    },
  },
  created: function () {
    console.log("created", this.$route.params.keyword);
    if (this.$route.params.keyword != null) {
      console.log("收到信息", "收到信息");
      this.$nextTick(async function () {
        //       this.value = document.getElementById("textId").value;
        console.log("search", this.$route.params.keyword);
        var resp1 = await search({
          searchKey: this.$route.params.keyword,
          token: this.token,
        });
        this.newcourseInfo = resp1;

        if (!this.newcourseInfo) {
          alert("未搜索到相关课程");
        } else {
          for (var i = 0; i < this.newcourseInfo.length; i++) {
            if (this.newcourseInfo[i].courseIntro.length > 30) {
              this.str = this.newcourseInfo[i].courseIntro.slice(0, 29);
              this.newcourseInfo[i].courseIntro = this.str + "......";
            }
          }

          this.isShow = 1;
          console.log("result", this.newcourseInfo);
        }
      });
    }
  },
};
</script>

<style scoped>
.header {
  background-color: #0025abcc;
}
.body {
  width: 100%;
  margin: 0 auto;
}

.drawer-btn-penal {
  position: absolute;
  left: -40px;
}
.header .header-search {
  color: aliceblue;
}
.page-footer .footer-name {
  margin-left: 10px;
  font-size: 16px;
}
.page-footer .footer-id {
  position: absolute;
  right: 10px;
  font-size: 16px;
}

.content {
  width: 800px;
}

.my-cardinfo {
  width: 100%;
  max-width: 750px;
  margin-top: 50px;
  margin-left: 18px;
  background-color: rgb(245, 245, 245);
  box-shadow: darkgrey 10px 10px 15px 5px;
  /* margin-left: 70px; */
}

.search-bar {
  display: flex;
  width: 1000px;
}

.search-bar button {
  outline: none;
  height: 60px;
  width: 80px;
  border: 3px solid #2932e1;
  background: #f5f6f7;
  color: black;
  border-left: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

@font-face {
  font-family: maoyeye;
  src: url("../assets/xingshu.ttf");
}
@font-face {
  font-family: reccom;
  src: url("../assets/Amazing sound.ttf");
}
.word {
  font-family: maoyeye;
  font-style: oblique;
  font-size: 50px;
  font-weight: 900;
  color: #e10602;
}
.wordrec {
  font-family: reccom;
  text-align: center;
  font-style: oblique;
  font-size: 50px;
  font-weight: 900;
  color: rgb(100, 149, 237);
}
.itemHover {
  background-color: #b0c4de;
}
</style>