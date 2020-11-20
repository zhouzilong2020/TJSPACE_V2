<template>
    <q-card class="course-review">
        <q-item :class="topColor">
            <div class="user-infro col-auto row inline justify-evenly">
                <q-item-section class="avatar">
                    <q-item-label class="nickname" horizontal>{{reviewInfro.teacherInfro.nickname}}</q-item-label>
                </q-item-section>
                <q-item-section class="user-infro-detail">
                    <q-item-label class="major" caption>
                        {{reviewInfro.teacherInfro.major}}
                    </q-item-label>
                </q-item-section>
            </div>
            <q-separator vertical />
            <!-- 课程开设时间 -->
            <q-item-section class="course-detail col-auto">
                <q-item-label class="course-year">
                    {{reviewInfro.courseDetail.name}}
                </q-item-label>
                <q-item-label class="course-semester">   
                    {{reviewInfro.courseDetail.semester}}
                </q-item-label>
            </q-item-section>
            <q-separator vertical/>
            <!-- 当前使用用户 -->
            <q-item-section class="user-infro-detail">
                    <q-item-label class="nickname" horizontal>当前用户：<b>{{reviewInfro.userInfro.nickname}}</b></q-item-label>
                </q-item-section>
            <q-item-section class="course-review-statistic">    
            </q-item-section>
        </q-item>

        <q-separator />
        

        <q-item class="course-review-body" horizontal>
            <q-item class="course-review-body" horizontal>
                <div class="col-5">
                    <q-label class="text-h6">课程测验</q-label>
                    <div class="q-gutter-sm">   
                        <q-checkbox dense v-model="test1" label="期中考试" color="primary"/>
                        <q-checkbox dense v-model="test2" label="期末考试" color="primary"/>
                        <q-checkbox dense v-model="test3" label="课堂小测" color="primary"/>
                    </div>
                </div>
                <div class="col-5">
                    <q-label class="text-h6">课程任务</q-label>
                    <div class="q-gutter-sm">   
                        <q-checkbox dense v-model="task1" label="课程作业" color="primary"/>
                        <q-checkbox dense v-model="task2" label="课程论文" color="primary"/>
                        <q-checkbox dense v-model="task3" label="课程项目" color="primary"/>
                    </div>
                </div>
                <div class="col-5">
                    <q-label class="text-h6">其他课程内容</q-label>
                    <div class="q-gutter-sm">   
                        <q-checkbox dense v-model="other1" label="课堂考勤" color="primary"/>
                        <q-checkbox dense v-model="other2" label="阅读材料" color="primary"/>
                        <q-checkbox dense v-model="other3" label="个人展示" color="primary"/>
                    </div>
                </div>
            </q-item>
        </q-item>


        <q-item class="course-review-body" horizontal>
            <div class="col-6">
                <q-item class="course-review-body" horizontal>
                    <q-label class="text-h6">对教师评分</q-label>
                </q-item>
                <q-item class="course-review-body" horizontal>
                <div class="col-9">
                    <q-rating
                        v-model="ratingMode1"
                        size="2em"
                        :max="10"
                        color="primary"
                    />                
                </div>
                </q-item>

                <q-item class="course-review-body" horizontal>
                <q-label class="text-h6">课程难度</q-label>
                </q-item>
                <q-item class="course-review-body" horizontal>
                <div class="col-9">
                    <q-rating
                        v-model="ratingMode2"
                        size="2em"
                        :max="10"
                        color="primary"
                    />                
                </div>
                </q-item>
            </div>

            <div class="col-6">
                <q-item class="course-review-body" horizontal>
                    <q-label class="text-h6">课程工作量</q-label>
                </q-item>
                <q-item class="course-review-body" horizontal>
                <div class="col-9">
                     <q-rating
                        v-model="ratingMode3"
                        size="2em"
                        :max="10"
                        color="primary"
                    />                
               </div>
                </q-item>

                <q-item class="course-review-body" horizontal>
                    <q-label class="text-h6">总体评价</q-label>
                </q-item>
                <q-item class="course-review-body" horizontal>
                <div class="col-9">
                    <q-rating
                        v-model="ratingMode4"
                        size="2em"
                        :max="10"
                        color="primary"
                    />                
                </div>
                </q-item>
            </div>
        </q-item>

        <!-- 具体内容 -->
        <q-item class="course-review-body" horizontal>
            <div class="col-4">
                <q-card-section>
                    <q-label class="text-h6">课程总体评价</q-label>
                    <q-input
                    v-model="text1"
                    filled
                    type="textarea"
                    />
                </q-card-section>

                <q-card-section>
                    <q-label class="text-h6">教学水平</q-label>
                    <q-input
                    v-model="text2"
                    filled
                    type="textarea"
                    />
                </q-card-section>
            </div>

            <div class="col-2"></div>

            <div class="col-4">
                <q-card-section>
                    <q-label class="text-h6"> 课程给分情况</q-label>
                    <q-input
                    v-model="text3"
                    filled
                    type="textarea"
                    />
                </q-card-section>
                <q-card-section>
                    <q-label class="text-h6">课程作业</q-label>
                    <q-input
                    v-model="text4"
                    filled
                    type="textarea"
                    />
                </q-card-section>
            </div>
        </q-item>

        <q-item class="course-review-submit">
            <q-btn color="blue" class="full-width" label="提交" @click="submit()" />
        </q-item>
       
    </q-card>
</template>

<script>
import {mapState} from 'vuex'
import {token} from '../../services/config'
export default {
    components:{
    },
    data:()=>{
        return {
            expanded:false,  
            test1:false,
            test2:false,
            test3:false,
            task1:false,
            task2:false,
            task3:false,
            other1:false,
            other2:false,
            other3:false,
            ratingMode1:5,
            ratingMode2:5,
            ratingMode3:5,
            ratingMode4:5,
            text1:'',
            text2:'',
            text3:'',
            text4:'',
            commentInfo:{
                commentId:'',
                content:'',
                teaching:'',
                grade:'',
                homework:'',
                midterm:0,
                final:0,
                quiz:0,
                assignment:0,
                essay:0,
                project:0,
                attendence:0,
                reading:0,
                presentation:0,
                overall:0,
                instructor:0,
                grading:0,
                workload:0,
                date:new Date(),
                usefulNum:0,
                uselessNum:0,
                userId:'',
                anonymous:1,
                courseId:'',
                teacherId:'',
            }
        }
    },
    props:{
        reviewInfro:{
            type: Object,
            default: ()=>{
                return {
                    courseStatistic:{
                    },
                    teacherInfro:{
                        nickname:"袁时金",
                        photoPath:require("../../assets/teacher.jpg"),
                        grade:"2018级",
                        major:"软件工程",
                    },
                    userInfro:{
                        nickname:"lili",
                        photoPath:require("../../assets/touxiang.jpg")
                    },
                    courseDetail:{
                        name: "数据库原理与应用",
                        year:"2020-2021",
                        semester:"春",
                    },
                    commentDetail:{
                        date:"2020.08.06",
                        useful:230,
                        useless:7
                    }
                }
            }
        }
    },
    computed: {
        topColor(){
          return "top-rating-5";  
        },
        getRate(){
            return (grade) =>{
                switch(grade[0]){
                    case "A": return "rating-5";
                    case "B": return "rating-4";
                    case "C": return "rating-3";
                    case "D": return "rating-2";
                    case "F": return "rating-1";
                }
            }
        },
        ...mapState('userInfo',['token'])
    },
    methods: {
        submit(){
            console.log('token: ',token)
            this.getComment()
            this.submitComment()
            console.log('comment',this.commentInfo)
        },
        getComment(){
            this.commentInfo.commentId=this.token
            this.commentInfo.content=this.test1
            this.commentInfo.teaching=this.text2
            this.commentInfo.grade=this.text3
            this.commentInfo.homework=this.text4
            this.commentInfo.midterm=(this.test1==false)?0:1
            this.commentInfo.final=(this.test2==false)?0:1
            this.commentInfo.quiz=(this.test3==false)?0:1
            this.commentInfo.assignment=(this.task1==false)?0:1
            this.commentInfo.essay=(this.task2==false)?0:1
            this.commentInfo.project=(this.task3==false)?0:1
            this.commentInfo.attendence=(this.other1==false)?0:1
            this.commentInfo.reading=(this.other2==false)?0:1
            this.commentInfo.presentation=(this.other3==false)?0:1
            this.commentInfo.overall=this.ratingMode4
            this.commentInfo.instructor=this.ratingMode1
            this.commentInfo.grading=this.ratingMode2
            this.commentInfo.workload=this.ratingMode3
            this.commentInfo.date=new Date()
            this.commentInfo.usefulNum=0
            this.commentInfo.uselessNum=0
            this.commentInfo.userId='string'
            this.commentInfo.anonymous=1//设置非匿名测试
            this.commentInfo.courseId='420244'//测试设置courseid为420244
            this.commentInfo.teacherId='string'
        },
        async submitComment(){
            await this.$store.dispatch("makeComment/makeComment",this.commentInfo)
        }

    }

}
</script>

<style>

.course-review{margin-bottom: 100px;margin-right:0 auto;margin-left:0 auto;width:1500px;margin-top:50px;font-size: 20px; }

.course-review-body{ padding:0px; margin : 20px; border:0px;}
.course-review-submit{ padding:0px; margin-left:50px;margin-right: 300px;margin-bottom: 100px; border:0px;}

.nickname{ margin-top:0px}
.user-infro-detail{ margin-right: 10px; margin-top:10px}
.major{font-size: 20px;}

.course-detail{margin:0 auto; }
.course-detail .course-year{text-align: center; margin: 0 auto; padding:8px}
.course-detail .course-semester{text-align: center; margin-bottom:10px;}

.rating-container {padding: 0; overflow: hidden; list-style: none;}
.rating-container strong {margin-bottom: 5px;}
.rating-container li .rating {
    display: inline-block;
    width: 40px;
    line-height: 30px;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    margin: 0 auto;
    border-radius: 6px;
    overflow: hidden;
    text-align: center;
}
.rating-1 {background: #fb1420;}
.rating-2 {background: #ff7800;}
.rating-3 {background: #ffba00;}
.rating-4 {background: #afc732;}
.rating-5 {background: #5a5;}

/* #f1f8f1 */
.top-rating-5{background: #f1f8f1;}
.top-rating-4{background: #f7faea;}
.top-rating-3{background: #ffe59e;}
.top-rating-2{background: #ffe1c7;}
.top-rating-1{background: #ffe1c7;}


.course-requirement {color:grey}
.course-requirement ul{ list-style: none; margin:0 auto;}
.course-requirement ul li{line-height: 25px; color:grey; font-weight:800;}
.course-requirement ul .active{color:green;}
.course-requirement ul .iconfont{margin-right:5px;}


.footer{margin: 0 auto; padding: 0; line-height: 0px;}
.footer q-label{font-size: 5px; color:grey; font-weight: 800; }
.footer .course-review-detail{position: absolute; right: 140px;}
.footer .course-review-option{ line-height:0px; height:0px; color:grey; position: relative; bottom: 21px; right:-10px;}
.footer .course-review-option .iconfont{font-size: 14px;}


.review-for-comment q-editor{background-color: wight;}
/* 新 */
</style>
