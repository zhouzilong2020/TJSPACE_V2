<template>
  <div class="indexRotateCard q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="activeSlide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        infinite
        :autoplay="4000"
        animated
        arrows
        control-color="primary"
        navigation
        paddin
        height="33rem"
        class="bg-grey-2 text-primary shadow-1 rounded-borders q-sm-col-4"
      >
        <q-carousel-slide
          v-for="slide in slides"
          :key="slide.icon"
          :name="slide.icon"
          class="column no-wrap flex-center q-pa-lg"
        >
          <q-icon :name="slide.icon" size="56px" />
          <div class="q-mt-md text-h6 text-center">
            {{ slide.title }}
          </div>
          <div class="q-mt-md text-body text-center">
            {{ slide.content }}
          </div>
          <q-img
            class="rounded-borders index-img q-my-md"
            height="100%"
            :src="slide.img"
            :ratio="16 / 9"
          />
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSlide: "",
      slides: [
        {
          title: "多角度、较客观的课程评价",
          content: "学长学姐“过来人”的经验，帮助你在选课季避免“踩雷“",
          icon: "iconfont icon-kecheng",
          // TODO
          img: require("../assets/index_img/comment_index.png"),
        },
        {
          title: "来自学生最真实的课程反馈",
          content: "教师可以通过本系统获取反馈,及时对课程进行调整优化",
          icon: "iconfont icon-fankui",
          img: require("../assets/index_img/makeComment_index.png"),
        },
        {
          title: "更专业、更具体的报考指导",
          content: "为应届考生提供报考指导，带你更先一步了解校园海量课程",
          icon: "iconfont icon-baozhiyuan",
          img: require("../assets/index_img/searchCourse_index.png"),
        },
        {
          title: "最透明、最全面的教师评价",
          content: "教师的“好”与“坏”，学生说了算；从多达到18个纬度全面评价",
          icon: "iconfont icon-jiaoshi",
          // TODO
          img: require("../assets/index_img/courseInfo_index.png"),
        },
        {
          title: "大数据收录，你想要的全都有",
          content: "从4m3上每学期收录5000余条课程记录，并不断更新中...",
          icon: "get_app",
          // TODO
          img: require("../assets/index_img/courses_index.png"),
        },
        {
          title: "需要帮助？论坛解决你的所有问题",
          content: "通过TJSPACE论坛系统，和全校学生一起交流探讨任何问题",
          icon: "forum",
          img: require("../assets/index_img/BBS_index.png"),
        },
      ],
    };
  },
  created() {
    this.activeSlide = this.slides[0].icon;
  },
};
</script>

<style scoped>
.indexRotateCard{
  min-width:400px;
}
</style>