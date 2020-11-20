<template>   
  <div class="q-pa-md" style="max-width: 100%">
    <q-list bordered separator>

      <q-item >
        <q-item-section>
            <q-item-label >收藏教师</q-item-label>
        </q-item-section>
      </q-item>


      <q-item clickable v-ripple class="row">
        <q-item-section class="justify-evenly" style="margin-left:30px">教师名称</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">教师序号</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">所属学院</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">开设课程数量</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">评分</q-item-section>
      </q-item>

      <q-item clickable v-ripple class="row" @click="click">
        <q-item-section class="justify-evenly" style="margin-left:30px">{{Name}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{TeacherID}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{College}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{CourseNum}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{Score}}</q-item-section>
      </q-item>

      <q-item clickable v-ripple class="row">
        <q-item-section class="justify-evenly" style="margin-left:30px">{{Name}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{TeacherID}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{College}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{CourseNum}}</q-item-section>
        <q-item-section class="justify-evenly" style="text-align: center">{{Score}}</q-item-section>
      </q-item>     
    </q-list>
  </div>  
</template>

<script>
export default {
    data () {
    return {
      Name: '袁时金',
      TeacherID:10000001,
      College:'软件学院',
      CourseNum:2,
      Score:'0.1',
    }
    },
    methods:{
      click(){
        alert("ok!")  
      }
    }

}
</script>

<style>

</style>