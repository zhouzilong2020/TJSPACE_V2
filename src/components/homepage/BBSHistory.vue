<template>
  <q-card flat bordered class="BBSHistory">
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
      v-for="(i, index) in bbsHistory"
      :key="index"
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
            <q-item-label caption>{{ i.time }}</q-item-label>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="delete"> </q-btn>
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
export default {
  data() {
    return {
      bbsHistory: [
        {
          title: "数据库课真好",
          time: "2020.12,11",
          content:
            "袁时金老师十分认真负责，上课会监督我们背诵知识点，用学习文科的方式学习理科，非常好。",
        },
        {
          title: "浑元形意太极掌门人马保国",
          time: "2020.12,11",
          content:
            "希望这两位年轻人耗子尾汁，年轻人要讲武德，武林要以和为贵，不要搞窝里斗。",
        },
      ],
    };
  },
};
</script>

<style>
.title{
    font-size:20px;
}
</style>