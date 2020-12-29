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
              <img :src="information.avatar" />
            </q-avatar>
            <div style="width: 300px">
              <q-file
                filled
                v-model="avatar"
                accept=".jpg, image/*"
                label="上传头像"
                counter
              >
                <template v-slot:before>
                  <q-icon name="folder_open" />
                </template>
                <template v-slot:append>
                  <q-btn round dense flat icon="add" />
                </template>
              </q-file>
            </div>
          </q-card-section>

          <q-card-section class="col-7 q-gutter-y-md">
            <q-form class="q-gutter-md q-px-lg">
              <q-input
                label-color="primary"
                id="nickname"
                v-model="information.nickname"
                outlined
                label="昵称"
                hint="对昵称进行修改，最长不能超过10位"
              />
              <q-select
                label-color="primary"
                color="primary"
                filled
                v-model="information.gender"
                :options="OptionGender"
                label="性别"
              >
              </q-select>
              <q-input>
                label-color="primary"
                id="phone"
                v-model="information.phoneNumber"
                outlined
                label="手机号"
              </q-input>
              <q-select>
                label-color="primary"
                color="primary"
                filled
                v-model="information.grade"
                :options="OptionGrade"
                label="年级"
              </q-select>>
              <q-select
                label-color="primary"
                outlined
                v-model="information.majorId"
                :options="OptionDept"
                label="院系"
              >
              </q-select>
              <q-select
                label-color="primary"
                outlined
                v-model="information.majorId"
                :options="OptionMajor"
                label="专业"
              >
              </q-select>
              <q-select
                label-color="primary"
                color="primary"
                filled
                v-model="information.degree"
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
import { getUserInfo } from "../services/userService";
import { getDepts } from "../services/infoModifyService";
export default {
  components: {},
  name: "SelfInfoModify",
  data() {
    return {
      LogoImg: require("../assets/TJU.png"),
      //     avatarPath: require("../assets/boy-avatar.png"),
      OptionGender: ["男", "女"],
      OptionGrade: ["大一", "大二", "大三", "大四", "研一", "研二", "博士"],
      OptionMajor: [],
      OptionDegree: ["本科生", "研究生", "博士生"],
      avatar: null,
      information: {
        nickname: "",
        gender: "",
        phoneNumber: "",
        majorId: null,
        year: null,
        degree: null,
        grade: null,
        avatar: "",
      },
    };
  },
  watch: {
    avatar: function (newval) {
      //当上传文件后转换为blob预览头像
      if (this.avatar != null) {
        if (window.createObjectURL != undefined) {
          // basic
          this.information.avatar = window.createObjectURL(newval);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          this.information.avatar = window.URL.createObjectURL(newval);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          this.information.avatar = window.webkitURL.createObjectURL(newval);
        }
      }
      console.log(this.information.avatar);
    },
  },
  methods: {
    submit() {
      this.getInfo();
      this.$store.dispatch("userInfo/modifyUserInfo", {
        ...this.information,
        token: this.token,
      });
      console.log("in selfinfo", this.information);
      this.$q.notify({
        message: "信息已修改",
        position: "center",
        timeout: "500",
      });
    },
    reset() {
      this.InitInfo();
    },
    InitInfo() {
      getUserInfo().then((resp) => {
        if (resp.success)
          this.information.nickname = resp.data.userInfo.nickname;
        if (resp.data.userInfo.gender) this.information.gender = "女";
        else this.information.gender = "男";
        this.information.phoneNumber = resp.data.userInfo.phoneNumber;
        this.information.majorId = resp.data.userInfo.majorId;
        this.information.year = resp.data.userInfo.year;
        this.information.grade = resp.data.userInfo.grade;
        this.information.degree = resp.data.userInfo.degree;
        this.information.avatar = resp.data.userInfo.avatar;
        this.avatar = null;
      });
      getDepts().then((resp) => {
        console.log("deptName", resp.data.deptNameList.name);
        this.OptionMajor = resp.data.deptNameList.name;
      });
    },
  },

  created() {
    this.InitInfo();
  },
};
</script>
<style >
</style>