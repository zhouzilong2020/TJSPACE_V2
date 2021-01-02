<template>
  <div class="q-pa-md" style="max-width: 100%">
    <q-list bordered separator>
      <q-item style="background: #315ca1">
        <q-item-section>
          <q-item-label class="text-white">历史评价</q-item-label>
        </q-item-section>
      </q-item>

      <div>
        <q-item class="row">
          <q-item-section
            class="justify-evenly col-4"
            style="text-align: center"
            >评价课程</q-item-section
          >
          <q-item-section class="justify-evenly" style="text-align: left"
            >打分</q-item-section
          >
          <q-item-section class="justify-evenly" style="text-align: left"
            >点赞数</q-item-section
          >
          <q-item-section class="justify-evenly" style="text-align: left"
            >点踩数</q-item-section
          >
          <q-item-section class="justify-evenly" style="text-align: left"
            >评价时间</q-item-section
          >
        </q-item>
        <q-scroll-area style="height: 200px">
          <q-item class="row" v-for="(i, index) in commentInfo" :key="index">
            <q-item-section
              class="justify-evenly col-4"
              style="text-align: left"
            >
              <q-btn
                flat
                style="text-align: left"
              >
                {{ i.courseName }}
              </q-btn>
            </q-item-section>
            <q-item-section class="justify-evenly" style="text-align: left">{{
              i.overall
            }}</q-item-section>
            <q-item-section class="justify-evenly" style="text-align: left">{{
              i.usefulNum
            }}</q-item-section>
            <q-item-section class="justify-evenly" style="text-align: left">{{
              i.uselessNum
            }}</q-item-section>
            <q-item-section class="justify-evenly" style="text-align: left">{{
              i.date
            }}</q-item-section>
          </q-item>
        </q-scroll-area>
      </div>
    </q-list>
  </div>
</template>

<script>
//import { mapState } from "vuex";
export default {
  data() {
    return {
      Name: "数据库原理与应用",
      CommentID: 1000000,
      Like: 100,
      Reply: 5,
      Time: "2020.8.31",
      commentInfo:[
        {courseName:"数据库原理与应用",overall:"10",usefulNum:"3",uselessNum:"10",data:"100"},
        {courseName:"数据库原理与应用",overall:"10",usefulNum:"3",uselessNum:"10",data:"100"},
      ]
    };
  },
  //computed: {
    //...mapState("userInfo", ["userInfo", "historyComment"]),
    //commentInfo() {
     // return this.historyComment;
    //},
  //},
  methods: {
   
  },

  created() {
   
  },
};
</script>

<style>
</style>