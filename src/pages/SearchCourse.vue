<template>
  <div>
    <div class="body-right row flex-center">
      <div class="q-gutter-md q-pb-sm">
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
            <q-btn flat class="black" icon="search" @click="handleSearch()" />
          </template>
        </q-input>
      </div>
      <div>
        <q-separator style="width: 820px" />
      </div>
      <div class="q-pt-sm q-gutter-sm">
        <template v-if="this.courseList.length > 0">
          <CourseCard
            v-for="course in courseList"
            :apiInterface="course"
            :key="course.courseId"
          />
        </template>
        <template v-else>
          <div class="q-mt-lg text-h5">
            暂未搜索到相关信息，请尝试其他关键词！
          </div>
        </template>
      </div>
    </div>

    <q-pagination
      v-if="this.courseList.length > 0"
      class="flex-center q-my-lg"
      v-model="currentPage"
      :max="totalPage"
      :direction-links="true"
      :max-pages="8"
    >
    </q-pagination>
  </div>
</template>

<script>
import CourseCard from "../components/courseInfo/CourseCard";
import { searchCourse } from "../services/courseService";
export default {
  components: { CourseCard },
  data() {
    return {
      searchKeyword: "",
      topImg: require("../assets/tjLogo.jpeg"),
      courseList: [],
      totalPage: null,
      currentPage: null,
      limit: 12,
    };
  },
  watch: {
    urlKeyword() {
      this.keywords = this.$route.params.keyword;
      this.currentPage = 1;
      this.search();
      console.log(this.totalPage);
    },
    currentPage() {
      searchCourse({
        currentPage: this.currentPage,
        keywords: this.$route.params.keyword,
        limit: this.limit,
      }).then((resp) => {
        console.log(resp);
        if (resp.success) {
          this.courseList = resp.data.courseList;
          this.totalPage = resp.data.totalPage;
          this.currentPage = resp.data.currentPage;
          this.$nextTick(() => {
            this.toTop();
          });
        }
      });
    },
  },

  methods: {
    handleSearch() {
      // 避免冗余跳转
      if (this.searchKeyword != this.$route.params.keyword) {
        console.log(this.keywords, this.$route.params.keyword);
        this.$router.push({
          name: "SearchCourse",
          params: {
            keyword: this.searchKeyword,
          },
        });
      }
    },
    async search() {
      searchCourse({
        currentPage: this.currentPage,
        keywords: this.searchKeyword,
        limit: this.limit,
      }).then((resp) => {
        console.log(resp);
        if (resp.success) {
          this.courseList = resp.data.courseList;
          this.totalPage = resp.data.totalPage;
          this.currentPage = resp.data.currentPage;
        }
      });
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    },
  },
  props: {},
  computed: {
    urlKeyword() {
      return this.$route.params.keyword;
    },
  },
  created() {
    // 从其他地方进入，有关键词
    if (this.$route.params.keyword != null) {
      this.$nextTick(() => {
        this.searchKeyword = this.$route.params.keyword;
        this.currentPage = 1;
      });
    }
  },
};
</script>

<style scoped>
.my-cardinfo {
  width: 100%;
  max-width: 750px;
  margin-top: 50px;
  margin-left: 18px;
  background-color: rgb(245, 245, 245);
  box-shadow: darkgrey 10px 10px 15px 5px;
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