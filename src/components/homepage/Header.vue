<template>
  <q-card class="my-card">
    <q-card-section id="bg">
      <div class="text-black items-center">
        <br /><br /><br /><br /><br /><br /><br />
        <div class="text-h6 text-center">{{ content.title }}</div>
        <br />
        <div class="text-subtitle2 text-center">
          {{ content.content }}<br />{{ content.subcontent }}
        </div>
      </div>
      <br /><br />
      <q-card-actions align="center">
        <q-btn
          color="blue"
          label="搜索课程"
          unelevated
          :to="{
            name: 'SearchCourse',
            params: {
              keyword: '软件工程',
            },
          }"
        ></q-btn>
      </q-card-actions>
      <br /><br /><br /><br /><br /><br />
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: {
    content: {
      type: Object,
      default() {
        return {
          title: "请开始您的旅程并留下您的足迹",
          content: "您还没有对任何课程发表您的评价。",
          subcontent:
            "请点击下方的搜索课程按钮进入搜索页面选择您想评价的课程，并撰写下您的评价。",
        };
      },
    },
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style scoped>
#bg {
  background: url("../../assets/user-info-icon/background.jpg");
  background-size: cover;
}
</style>