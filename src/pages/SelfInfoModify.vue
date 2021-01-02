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
              <img :src="oriavatar" />
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
                v-model="nickname"
                outlined
                label="昵称"
                readonly
              />
              <q-select
                label-color="primary"
                color="primary"
                filled
                v-model="gender"
                :options="OptionGender"
                label="性别"
              >
              </q-select>
              <q-input
                label-color="primary"
                id="phone"
                v-model="phoneNumber"
                outlined
                :readonly="status ? false : 'readonly'"
                label="手机号"
              >
                <template v-slot:after>
                  <q-btn
                    dense
                    flat
                    color="primary"
                    :label="phoneText"
                    @click="handlePhone()"
                  />
                </template>
              </q-input>
              <q-input
                v-show="validateshow"
                v-model="authCode"
                label="手机验证码："
                lazy-rules
                outlined
                :rules="[
                  (val) => (val !== null && val !== '') || '请输入验证码',
                ]"
              >
                <template v-slot:after>
                  <q-btn
                    color="primary"
                    icon="send"
                    :label="sentAuthCodeText"
                    :disable="sentIsDisabled"
                    @click="handleAuthCode()"
                  />
                  <q-btn
                    color="primary"
                    label="验证"
                    @click="handleValidate()"
                  />
                </template>
              </q-input>
              <q-select
                label-color="primary"
                color="primary"
                filled
                v-model="grade"
                :options="OptionGrade"
                label="年级"
              >
              </q-select>
              <q-select
                label-color="primary"
                outlined
                v-model="deptId"
                :options="OptionDept"
                option-value="id"
                option-label="name"
                option-disable="inactive"
                emit-value
                map-options
                label="院系"
              >
              </q-select>
              <q-select
                label-color="primary"
                filled
                v-model="majorId"
                :options="OptionMajor"
                option-value="id"
                option-label="name"
                option-disable="inactive"
                emit-value
                map-options
                label="专业"
              >
              </q-select>
              <q-select
                label-color="primary"
                color="primary"
                outlined
                v-model="degree"
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

        <q-btn
          label="提交"
          type="submit"
          color="primary"
          class="full-width"
          stretch
          @click="submit()"
          :to="{ name: 'Homepage' }"
        />
        <!-- <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm col-5"
            @click="reset()"
          /> -->

        <pop-dialog
          :content="warningText"
          :bgColor="'bg-warning'"
          :show="warning"
        />
      </q-card>
    </div>
  </div>
</template>




<script>
import popDialog from "../components/popDialog";
import { getUserInfo } from "../services/userService";
import {
  getDepts,
  getMajors,
  Update,
  UpdateOSS,
} from "../services/infoModifyService";
import { sentMsmAuthCode, validateMsmAuthCode } from "../services/userService";
export default {
  components: {
    popDialog,
  },
  name: "SelfInfoModify",
  data() {
    return {
      LogoImg: require("../assets/TJU.png"),
      //     avatarPath: require("../assets/boy-avatar.png"),
      OptionGender: ["男", "女"],
      OptionGrade: ["一年级", "二年级", "三年级", "四年级", "五年级"],
      OptionMajor: [],
      OptionDegree: ["本科生", "研究生", "博士生"],
      OptionDept: [],
      avatar: null,
      nickname: "",
      gender: "",
      phoneNumber: "",
      majorId: "",
      year: "",
      degree: "",
      grade: "",
      oriavatar: null,
      deptId: "",
      deptName: "",
      majorName: "",
      validateshow: false,
      authCode: "",
      warningText: null,
      warning: false,
      status: false,
      // 计时器
      timer: null,
      downCnt: 60,
      //是否发送了验证码
      canReg: true,
    };
  },
  watch: {
    avatar(newval) {
      //当上传文件后转换为blob预览头像
      if (this.avatar != null) {
        if (window.createObjectURL != undefined) {
          // basic
          this.oriavatar = window.createObjectURL(newval);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          this.oriavatar = window.URL.createObjectURL(newval);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          this.oriavatar = window.webkitURL.createObjectURL(newval);
        }
      }
      console.log(this.oriavatar);
    },
    deptId(newVal) {
      if (newVal != "") {
        getMajors(newVal).then((resp) => {
          //console.log("resp", resp);
          if (resp.success) {
            this.OptionMajor = resp.data.majorList;
          }
        });
      }
    },
  },
  methods: {
    async popWarning(text) {
      this.warningText = text;
      this.warning = true;
      setTimeout(() => {
        this.warning = false;
      }, 2000);
    },
    async handleAuthCode() {
      if (this.isSendingAuthCode) {
        await this.popWarning("验证码已发送，请稍后再试！");
      } else {
        var resp = await sentMsmAuthCode({
          phone: this.phoneNumber,
        });
        //console.log("in receiving authCode", resp);
        if (resp.success) {
          this.canReg = false;
          //设置倒计时
          this.timer = setInterval(() => {
            if (this.downCnt == 0) {
              this.timer = clearInterval(this.timer);
              this.downCnt = 5;
            } else {
              this.downCnt -= 1;
            }
          }, 1000);
        } else {
          await this.popWarning(resp.message);
        }
      }
    },
    async handleValidate() {
      if (this.authCode != "") {
        var resp = await validateMsmAuthCode({
          phone: this.phoneNumber,
          code: this.authCode,
        });
        console.log("resp", resp);
        if (!resp.success) {
          await this.popWarning(resp.message);
        } else {
          this.canReg = true;
          this.validateshow = false;
          this.status = false;
          this.$q.notify({
            message: "手机已绑定成功",
            position: "center",
            timeout: "500",
          });
        }
      } else {
        this.popWarning("还未填写验证码");
      }
    },
    handlePhone() {
      this.validateshow = !this.validateshow;
      this.status = !this.status;
    },
    async submit() {
      if (this.canReg == true) {
        if (this.gender == "男") this.gender = true;
        else this.gender = false;
        switch (this.degree) {
          case "本科生":
            this.degree = 0;
            break;
          case "研究生":
            this.degree = 1;
            break;
          case "博士生":
            this.degree = 2;
            break;
        }
        switch (this.grade) {
          case "一年级":
            this.grade = 0;
            break;
          case "二年级":
            this.grade = 1;
            break;
          case "三年级":
            this.grade = 2;
            break;
          case "四年级":
            this.grade = 3;
            break;
          case "五年级":
            this.grade = 4;
            break;
        }
        var resp = await Update({
          degree: this.degree,
          gender: this.gender,
          grade: this.grade,
          majorId: this.majorId,
          nickname: this.nickname,
          phoneNumber: this.phoneNumber,
        });
        if (this.avatar != null) {
          var formData = new FormData();
          formData.append("file", this.avatar);
          var resp1 = await UpdateOSS({
            avatar: formData,
          });
          //console.log("更改个人头像", resp1);
          if (!resp1.success) {
            this.$q.notify({
              message: resp1.message,
              position: "center",
              timeout: "500",
            });
          }
        }
        // console.log("更改个人信息", resp);

        if (!resp.success) {
          this.$q.notify({
            message: resp.message,
            position: "center",
            timeout: "500",
          });
        }
      } else {
        this.popWarning(
          "正在绑定手机,无法提交，请先等待绑定完成或者取消绑定！"
        );
      }
    },
    reset() {
      this.InitInfo();
    },
    InitInfo() {
      getUserInfo().then((resp) => {
        //console.log("getUserInfo", resp);
        if (resp.success) {
          this.nickname = resp.data.nickname;
          this.gender = resp.data.gender;
          this.phoneNumber = resp.data.phoneNumber;
          this.majorId = resp.data.majorId;
          this.majorName = resp.data.majorName;
          this.deptId = resp.data.deptId;
          if (this.deptId != "") {
            getMajors(resp.data.deptId).then((resp1) => {
              if (resp1.success) {
                this.OptionMajor = resp1.data.majorList;
              }
            });
          }
          getDepts().then((resp2) => {
            this.OptionDept = resp2.data.deptNameList;
          });
          this.deptName = resp.data.deptName;
          switch (resp.data.grade) {
            case 0:
              this.grade = "一年级";
              break;
            case 1:
              this.grade = "二年级";
              break;
            case 2:
              this.grade = "三年级";
              break;
            case 3:
              this.grade = "四年级";
              break;
            case 4:
              this.grade = "五年级";
              break;
          }
          this.degree = resp.data.degree;
          this.oriavatar = resp.data.avatar;
          //console.log("avatar",this.oriavatar)
          this.avatar = null;
        }
      });
    },
  },

  created() {
    this.InitInfo();
  },
  computed: {
    sentAuthCodeText() {
      if (!this.timer) {
        return "发送验证码";
      } else {
        return this.downCnt + "s后再试";
      }
    },
    isSendingAuthCode() {
      if (this.timer) {
        return true;
      } else {
        return false;
      }
    },
    sentIsDisabled() {
      if (this.phoneNumber && !this.timer) {
        return false;
      }
      return true;
    },
    phoneText() {
      if (this.phoneNumber == "") {
        return "绑定手机";
      } else if (this.validateshow == true) {
        return "取消绑定";
      } else {
        return "更换绑定";
      }
    },
  },
};
</script>
<style >
</style>
