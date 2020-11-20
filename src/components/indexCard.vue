<template>
  <q-card flat class="my-card">
    <q-card-section>
      <div class="text-h5 row justify-center title">
        在TJSPACE你能收获什么？
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle2">
        <ul class="list_left">
          <li>
            <span class="iconfont icon-kecheng text-primary" />
            多角度、较客观的课程评价
            <p>学长学姐“过来人”的经验，帮助你在选课季避免“踩雷”</p>
          </li>
          <li>
            <span class="iconfont icon-fankui text-primary" />
            来自学生最真实的课程反馈
            <p>教师可以通过本系统获取反馈,及时对课程进行调整优化</p>
          </li>
        </ul>
        <ul class="list_right">
          <li>
            <span class="iconfont icon-baozhiyuan text-primary" />
            更专业、更具体的报考指导
            <p>为应届考生提供报考指导，带你更先一步了解校园</p>
          </li>
          <li>
            <span class="iconfont icon-jiaoshi text-primary" />
            最透明、最全面的教师评价
            <p>教师的“好”与“坏”，学生说了算</p>
          </li>
        </ul>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.header {
  height: 50px;
  opacity: 0.7;
}

.my-card {
  max-width: 800px;
  height: 503.23px;
  /* opacity: 0.7; */
}

.my-card .title {
  margin-top: 30px;
  max-width: 800px;
}

.list_left {
  max-width: 320px;
  height: 250px;
  float: left;
  list-style: none;
}
.list_right {
  max-width: 320px;
  height: 250px;
  float: right;
  /* border: 1px solid black; */
  list-style: none;
}

.my-card li {
  font-size: 20px;
  padding: 5%;
}

.my-card li p {
  padding-top: 20px;
  font-size: 0.8em;
}

.my-card li span {
  font-size: 1.8em;
  margin-left: -32px;
}
</style>