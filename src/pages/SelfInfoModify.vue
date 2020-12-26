<template>
  <div class="row q-gutter-md q-pa-md flex-center no-wrap items-stretch">
    <div class="col-8">
      <q-card class="my-card" bordered>
        <q-item>
          <div class="text-h6">个人信息</div>
        </q-item>
        <q-separator />
        <q-card-section horizontal class="items-center">
          <q-card-section class="q-gutter-xl">
            <q-avatar size="200px" class="q-gutter-x-xl q-gutter-y-md">
              <img :src="avatarPath" />
            </q-avatar>
            <div style="width: 300px">
              <q-file filled v-model="model" label="上传头像" counter>
                <template v-slot:before>
                  <q-icon name="folder_open" />
                </template>
                <template v-slot:append>
                  <q-btn round dense flat icon="add" @click.stop />
                </template>
              </q-file>
            </div>
          </q-card-section>

          <q-card-section class="col-7 q-gutter-y-md">
            <q-form class="q-gutter-md q-px-lg">
              <q-input
              label-color="primary"
                id="nickname"
                v-model="Nickname"
                outlined
                label="昵称"
                hint="对昵称进行修改，最长不能超过10位"
              />
              <q-select
              label-color="primary"
                color="primary"
                filled
                v-model="Gender"
                :options="OptionGender"
                label="性别"
              >
              </q-select>
              <q-input
              label-color="primary"
                id="phone"
                v-model="phoneNumber"
                outlined
                label="手机号"
              />
              <q-select
              label-color="primary"
                color="primary"
                filled
                v-model="Grade"
                :options="OptionGrade"
                label="年级"
              >
              </q-select>
              <q-select
              label-color="primary"
                outlined
                v-model="Major"
                :options="OptionMajor"
                label="专业"
              />
              <q-select
              label-color="primary"
                color="primary"
                filled
                v-model="Degree"
                :options="OptionDegree"
                label="学历"
              >
              </q-select>
            </q-form>
          </q-card-section>
        </q-card-section>
        <br />
        <br />
        <q-separator />

        <!-- 这里跳转回主页之后主页的信息不会刷新 -->
        <div class="row">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            class="col-6"
            @click="submit()"
            :to="{ name: 'Homepage' }"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm col-5"
            @click="reset()"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>




<script>
import { mapState } from "vuex";
// import { token } from "../services/config";
import axios from "axios";
// import axios from 'axios'
export default {
  components: {},
  name: "SelfInfoModify",
  props: {
    SelfInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      LogoImg: require("../assets/TJU.png"),
      avatarPath: require("../assets/boy-avatar.png"),
      OptionGender: ["男", "女"],
      OptionGrade: ["大一", "大二", "大三", "大四", "研一", "研二", "博士"],
      OptionMajor: ["软件工程", "土木工程", "经济与管理"],
      OptionDegree: ["本科生", "研究生", "博士生"],
      Nickname: "",
      Gender: "",
      phoneNumber: "",
      Grade: "",
      Major: "",
      Degree: "",
      information: {
        userId: "",
        nickname: "",
        gender: -1,
        phoneNumber: "",
        majorId: "",
        year: -1,
        degree: -1,
      },
    };
  },
  methods: {
    submit() {
      // console.log('token：',token)
      this.getInfo();
      this.$store.dispatch("userInfo/modifyUserInfo", {
        ...this.information,
        token: this.token,
      });
      console.log("in selfinfo", this.information);
      alert("Information Modified!");
    },
    reset() {
      this.InitInfo();
    },
    getInfo() {
      this.information.userId = this.userInfo.userid;
      this.information.nickname = this.Nickname;
      switch (this.Gender) {
        case "男":
          this.information.gender = 0;
          break;
        case "女":
          this.information.gender = 1;
          break;
      }
      this.information.phoneNumber = this.phoneNumber;
      switch (this.Major) {
        case "软件工程":
          this.information.majorId = "1";
          break;
        case "土木工程":
          this.information.majorId = "2";
          break;
        case "经济与管理":
          this.information.majorId = "3";
          break;
      }
      switch (this.Grade) {
        case "大一":
          this.information.year = 1;
          break;
        case "大二":
          this.information.year = 2;
          break;
        case "大三":
          this.information.year = 3;
          break;
        case "大四":
          this.information.year = 4;
          break;
      }
      switch (this.Degree) {
        case "本科生":
          this.information.degree = 1;
          break;
        case "研究生":
          this.information.degree = 2;
          break;
        case "博士生":
          this.information.degree = 3;
          break;
      }
    },
    InitInfo() {
      this.Nickname = this.userInfo.nickname;
      switch (this.userInfo.gender) {
        case 0:
          this.Gender = "男";
          break;
        case 1:
          this.Gender = "女";
          break;
      }
      this.phoneNumber = this.userInfo.phonenumber;
      switch (this.userInfo.majorid) {
        case "1":
          this.Major = "软件工程";
          break;
        case "2":
          this.Major = "土木工程";
          break;
        case "3":
          this.Major = "经济与管理";
          break;
      }
      switch (this.userInfo.year) {
        case 1:
          this.Grade = "大一";
          break;
        case 2:
          this.Grade = "大二";
          break;
        case 3:
          this.Grade = "大三";
          break;
        case 4:
          this.Grade = "大四";
          break;
      }
      switch (this.userInfo.degree) {
        case 1:
          this.Degree = "本科生";
          break;
        case 2:
          this.Degree = "研究生";
          break;
        case 3:
          this.Degreer = "博士生";
          break;
      }
    },
    async changeInfo() {
      let res = await axios({
        method: "post",
        url: "http://175.24.115.240:8080/api/Modify/Info",
        headers: {
          Authorization: this.token,
        },
        data: {
          userid: this.information.userId,
          nickname: this.information.nickname,
          gender: this.information.gender,
          phonenumber: this.information.phoneNumber,
          majorid: this.information.majorId,
          year: this.information.year,
          degree: this.information.degree,
        },
      });
      console.log("new phone:", this.information.phoneNumber);
      console.log("put action", res);
    },
  },
  computed: mapState("userInfo", ["userInfo", "token"]),
  created() {
    this.InitInfo();
  },
};
</script>
<style >
</style>