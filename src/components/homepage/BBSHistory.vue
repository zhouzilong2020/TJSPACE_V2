<template>
  <q-card flat bordered class="BBSHistory" style="min-width:200px">
    <q-item>
      <q-item-section avatar>
        <q-icon color="black" name="library_books"></q-icon>
      </q-item-section>
      <q-item-section>
        <q-item-label>历史发帖</q-item-label>
      </q-item-section>
    </q-item>
    <q-chip size="md" color="green" text-color="white" icon="assignment">
      BBS
    </q-chip>
    <q-card-section
      bordered
      flat
      class="bbs"
      v-for="(i, postId) in bbsHistory"
      :key="postId"
    >
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <div class="text-h6 title" style="color:primary">
              <q-btn
                align="left"
                padding="none"
                flat
                :to="{
                  name: 'bbsInfo',
                  params: { title: i.title,},
                }"
              >
                {{ i.courseName }} </q-btn
              >{{ i.title }}
            </div>
            <q-item-label caption>{{ i.createTime }}</q-item-label>
          </div>

          <div class="col-auto">
            <q-btn 
            color="grey-7" 
            round 
            flat icon="delete"
            @click="cancelBBS(i.postId)"
            > 
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ i.content }}
      </q-card-section>
      <br/>
      <q-item-section>
      <q-separator/>
      </q-item-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { myBBS } from "../../services/forum";
import { showBBS } from "../../services/forum";
export default {
  data() {
    return {
      currentPage: 1,
      limit: 12,
      attributes:[],
      bbsHistory: [
        // {
        //   title: "数据库课真好",
        //   time: "2020.12,11",
        //   content:
        //     "袁时金老师十分认真负责，上课会监督我们背诵知识点，用学习文科的方式学习理科，非常好。",
        // },
        // {
        //   title: "浑元形意太极掌门人马保国",
        //   time: "2020.12,11",
        //   content:
        //     "希望这两位年轻人耗子尾汁，年轻人要讲武德，武林要以和为贵，不要搞窝里斗。",
        // },
      ],
    };
  },
  methods: {
    click() {
      alert("ok!");
    },
    cancelBBS(postId) {
      myBBS({
        postId: postId
      })
        .then((resp) => {
          if (resp.success) {
            console.log(resp);
            console.log("success!!!!!!!!!!!!!!!!!!");
            for (var i = 0; i < this.bbsHistory.length; i++) {
              console.log("in for")
              console.log(this.bbsHistory[i].postId)
              if (this.bbsHistory[i].postId == postId){
                this.bbsHistory.splice(i, 1);
              }
            }
            console.log(this.collectedCourse);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },


  created() {
    showBBS({
        currentPage: this.currentPage,
        limit: this.limit,
      }).then((resp) => {
        console.log(resp);
        console.log("bbbbbbbbbbbbbb");
        if (resp.success) {
          this.bbsHistory=resp.data.postList;
          console.log(resp.data)
          // this.courseList = resp.data.courseList;
          // this.totalPage = resp.data.totalPage;
          // this.currentPage = resp.data.currentPage;
        }
      });

  },

};
</script>

<style>
.title{
    font-size:20px;
}
</style>