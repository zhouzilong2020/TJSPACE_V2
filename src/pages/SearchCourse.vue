<template>
  <div class="body-right row flex-center">
    <div class="q-gutter-md">
      <img :src="topImg" style="height: 140px; width: 500px" />
      <q-input
        rounded
        bordered
        standout="bg-grey-3"
        v-model="searchKeyword"
        @keydown.13="handleSearch()"
        input-class="q-pl-lg text-black icon-black"
        placeholder="请输入需要搜索的关键字"
      >
        <template v-slot:append>
          <q-btn flat class="black" icon="search" />
        </template>
      </q-input>
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
            itemHover: itemIndex == item.courseId && itemName == item.teacherId,
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
                <q-item-label caption style="margin-left: 50px; margin-top: 0px"
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

      <div class="row" >
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
              <q-img :src="path11" basic style="width: 150px; height: 150px">
                <div class="absolute-bottom text-subtitle2 text-center">
                  {{ item.name }}
                </div>
              </q-img>
            </div>
            <div v-if="index % 3 == 1">
              <q-img :src="path12" basic style="width: 150px; height: 150px">
                <div class="absolute-bottom text-subtitle2 text-center">
                  {{ item.name }}
                </div>
              </q-img>
            </div>
            <div v-if="index % 3 == 2">
              <q-img :src="path13" basic style="width: 150px; height: 150px">
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
</template>

<script>
import { mapState } from "vuex";
import { search } from "../services/search";
export default {
  components: {},
  data() {
    return {
      searchKeyword: "",
      itemIndex: null,
      itemName: null,
      input: "",
      isShow: 0,
      path11: require("../assets/sjk.jpg"),
      path12: require("../assets/xtjg.jpg"),
      path13: require("../assets/java.jpg"),
      topImg: require("../assets/tjLogo.jpeg"),
      path: require("../assets/zhuzi.jpeg"),
      inputSearch: "",
      courseInfo: [
        {
          name: "软件工程",
          teacher: "杜庆峰",
          intro: "这是一门很好的课",
          courseId: "1333571301500243969",
          imagePath: "../assets/sjk.jpg",
        },
        {
          name: "Jave EE",
          teacher: "范鸿飞",
          intro:
            "这是仍然是一门辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡课程",
          courseId: "1333571322517901314",
          teacherId: "0001",
          imagePath: "../assets/java.jpg",
        },
        {
          name: "操作系统",
          teacher: "方钰",
          intro:
            "这是还是一门辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡辣鸡课程",
          courseId: "1339926761182552067",
          teacherId: "0004",
          imagePath: "../assets/czxt.jpg",
        },
      ],
      newcourseInfo: [],
      text: "",
      str: "",
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
          currentPage: 0,
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
          console.log("asdasdasdasdas", resp1);
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

.drawer-btn-penal {
  position: absolute;
  left: -40px;
}
.header .header-search {
  color: aliceblue;
}

.content {
  max-width: 800px;
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

.search-bar button {
  height: 60px;
  width: 80px;
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