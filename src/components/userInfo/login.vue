<template>
  <q-card class="q-my-sm bg-grey-2 my-card col-md-4 col-xs-12">
    <q-card-section>
      <div class="title">
        <h5>欢迎使用</h5>
        <h5 class="title-name">TJSPACE· 同济大学社群</h5>
      </div>
      <q-form class="q-gutter-md">
        <!-- 邮箱登录 -->
        <template v-if="type" class="email-login">
          <q-input
            class="email"
            clearable
            clear-icon="close"
            v-model="account.email"
            label="邮箱:"
            suffix="@tongji.edu.cn"
            hint="请输入注册时使用的同济邮箱"
            :rules="[(val) => (val && val.length > 0) || '请输入您的同济邮箱']"
          />
          <q-input
            v-model="account.password"
            label="密码:"
            :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-if="type" v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-toggle v-model="remember.email" label="记住邮箱" />
        </template>

        <!-- 手机登录 -->
        <template v-else class="MSM-login">
          <!-- 手机号 -->
          <q-input
            mask="### - #### - ####"
            clearable
            v-model="account.phoneNumber"
            label="手机号:"
            hint="请输入已绑定的手机号"
            lazy-rules
            :rules="[(val) => checkMobile(val) || '请输入正确的手机号']"
          >
            <template v-if="!type" v-slot:after>
              <q-btn
                dense
                flat
                color="primary"
                icon="send"
                :disable="sentIsDisabled"
                :label="sentAuthCodeText"
                @click="sentAuthCode"
              />
            </template>
          </q-input>
          <!-- 手机验证码 -->
          <q-input
            mask="  #  -  #  -  #  -  #  "
            v-model="account.authCode"
            label="手机验证码:"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || '请输入验证码']"
          />
          <q-toggle v-model="remember.phoneNumber" label="记住我的号码" />
        </template>

        <!-- 登录按钮 -->
        <div>
          <q-btn
            :loading="isLoading"
            :disable="isDisabled"
            class="queren-btn"
            label="登录"
            color="primary"
            @click="handleLogin(type)"
          >
          </q-btn>
        </div>

        <!-- 底部选项狂 -->
        <q-btn-group flat spread>
          <q-btn
            flat
            color="primary"
            @click="type = !type"
            :label="!type ? '邮箱登陆' : '手机登陆'"
          />
          <q-btn
            flat
            color="primary"
            :to="{ name: 'register' }"
            label="现在注册"
          />
        </q-btn-group>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { checkMobile } from "../../utils/utils";
import { mapState } from "vuex";
import {
  sentMsmAuthCode,
  validateMsmAuthCode,
} from "../../services/userService";

export default {
  components: {},
  props: {
    isMSM: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      // 登录类型， 0--msm，1--email
      type: null,
      isPwd: true,
      remember: {
        email: false,
        phoneNumber: false,
      },
      downCnt: 120,
      account: {
        email: "",
        password: "",
        phoneNumber: "",
        authCode: "",
      },
      warning: false,
      timer: null,
    };
  },

  computed: {
    ...mapState("userInfo", ["userInfo", "isLoading"]),
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
      if (this.checkMobile(this.account.phoneNumber) && !this.timer) {
        return false;
      }
      return true;
    },
    isDisabled() {
      if (this.type && this.account.email && this.account.password)
        return false;
      else if (!this.type && this.account.phoneNumber && this.account.authCode)
        return false;
      return true;
    },
  },
  watch: {
    userInfo() {
      if (this.userInfo != null) {
        this.$router.push({
          name: "Homepage",
        });
      }
    },
  },
  mounted() {
    this.type = !this.isMSM;
    if (this.type && localStorage.getItem("TJSPACE-email")) {
      this.account.email = localStorage.getItem("TJSPACE-email");
      this.remember.email = true;
    }
    if (!this.type && localStorage.getItem("TJSPACE-phone")) {
      this.account.phoneNumber = localStorage.getItem("TJSPACE-phone");
      this.remember.phoneNumber = true;
    }
  },
  methods: {
    handleLogin(type) {
      if (type) {
        this.$store.dispatch("userInfo/loginUser", {
          account: this.account,
          remember: this.remember,
        });
      } else {
        // //console.log("asd");
        this.handleMSMLogin();
      }
    },
    checkMobile(s) {
      // 处理掩码
      var mobile = s.slice(0, 3) + s.slice(6, 10) + s.slice(13, 17);
      return checkMobile(mobile);
    },
    sentAuthCode() {
      if (this.isSendingAuthCode) {
        this.$q.notify({
          position: "center",
          type: "warning",
          message: `验证码已发送，请耐心等待一会哦`,
        });
      } else {
        // 处理掩码
        var mobile = this.account.phoneNumber;
        mobile =
          mobile.slice(0, 3) + mobile.slice(6, 10) + mobile.slice(13, 17);
        sentMsmAuthCode({
          phone: mobile,
        })
          .then((resp) => {
            if (resp.success) {
              this.$q.notify({
                position: "center",
                type: "positive",
                message: `验证码发送成功`,
              });
              // 设置倒计时
              this.timer = setInterval(() => {
                if (this.downCnt == 0) {
                  this.timer = clearInterval(this.timer);
                  this.downCnt = 120;
                } else {
                  this.downCnt -= 1;
                }
              }, 1000);
            }
          })
          // .catch((e) => {
          //   //console.log(e);
          // });
      }
    },
    handleMSMLogin() {
      // 处理掩码
      var authCode = this.account.authCode;
      var mobile = this.account.phoneNumber;
      mobile = mobile.slice(0, 3) + mobile.slice(6, 10) + mobile.slice(13, 17);
      authCode =
        authCode.slice(2, 3) +
        authCode.slice(8, 9) +
        authCode.slice(14, 15) +
        authCode.slice(20, 21);
      // //console.log(authCode, mobile);
      validateMsmAuthCode({
        phone: mobile,
        code: authCode,
      }).then((resp) => {
        if (resp.success) {
          // //console.log(resp);
          // 此时有token了， 可以直接跳转页面， loginUser等于取回信息
          this.$store.dispatch("userInfo/loginUser", {
            account: this.account,
            remember: this.remember,
          });
          this.$router.push({
            name: "Homepage",
          });
        } else {
          this.$q.notify({
            position: "center",
            type: "negative",
            message: `${resp.message}`,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.my-card {
  max-width: 350px;
}
.title {
  text-align: center;
}

.title-name {
  font-weight: bold;
  font-size: 27px;
  line-height: -2;
}

.queren-btn {
  width: 100%;
}
</style>
