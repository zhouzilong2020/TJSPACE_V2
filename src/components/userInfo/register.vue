<template>
  <q-card class="q-my-md bg-grey-2 my-card col-xs-12">
    <q-card-section>
      <h5 class="title">注册TJSPACE账号</h5>
      <q-form class="q-gutter-md q-px-lg">
        <!-- 昵称 -->
        <q-input
          id="nickname"
          :loading="isCheckingNickname"
          @blur="checkNickname"
          v-model="account.nickname"
          label="昵称:"
          hint="设置你的昵称，最长10位"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || '请输入你的昵称',
            (val) => val.length <= 10 || '昵称长度不能超过10位',
          ]"
        >
          <template v-if="haveBlured" v-slot:label>
            <q-icon
              :name="isNicknameGood ? 'check_circle_outline' : 'error_outline'"
              :color="isNicknameGood ? 'green-8' : 'red-8'"
            /><span :class="isNicknameGood ? 'text-green-8' : 'text-red-8'">{{
              isNicknameGood ? "该昵称可以使用" : "该昵称已经被使用"
            }}</span>
          </template>
        </q-input>
        <!-- 邮箱 -->
        <q-input
          id="email"
          v-model="account.email"
          suffix="@tongji.edu.cn"
          label="邮箱："
          hint="邮箱将作为您的唯一登录凭证"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入您的邮箱']"
        >
          <template v-slot:after>
            <q-btn
              dense
              flat
              color="primary"
              icon="send"
              :label="sentAuthCodeText"
              :disable="sentIsDisabled"
              @click="handleAuthCode()"
            />
          </template>
        </q-input>
        <!-- 邮箱验证码 -->
        <q-input
          v-model="account.authCode"
          label="邮箱验证码："
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '请输入验证码']"
        />
        <!-- 输入密码 -->
        <q-input
          v-model="account.password"
          :type="isPwd ? 'password' : 'text'"
          label="密码："
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || '密码不能为空',
            (val) => val.length >= 6 || '密码的长度不能少于6位',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <!-- 再次输入密码 -->
        <q-input
          v-model="password"
          :type="isRPwd ? 'password' : 'text'"
          label="再次输入密码："
          lazy-rules
          :rules="[(val) => val === this.account.password || '两次密码不同']"
        >
          <template v-slot:append>
            <q-icon
              :name="isRPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isRPwd = !isRPwd"
            />
          </template>
        </q-input>
      </q-form>
      <q-toggle
        class="q-px-md"
        v-model="accept"
        label="我同意TJSPACE合理的使用我的个人信息"
      />
      <!-- 注册按钮 -->
      <div class="q-py-sm">
        <q-btn
          class="queren-btn"
          label="注册"
          :disable="regIsDisabled"
          color="primary"
          @click="handleRegister()"
        />
        <q-btn
          class="queren-btn"
          label="已有账号？马上登录"
          flat
          :to="{
            name: 'login',
          }"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
import {
  sentAuthCode,
  validateAuthCode,
  validateNickname,
} from "../../services/userService";
export default {
  components: {},
  data() {
    return {
      isPwd: true,
      isRPwd: true,
      haveBlured: false,
      password: null,
      isNicknameGood: false,
      isCheckingNickname: false,
      nicknameErrorMessage: null,
      account: {
        email: null,
        nickname: null,
        authCode: null,
        password: null,
      },
      // 计时器
      timer: null,
      downCnt: 60,

      verified: false,
      accept: false,
      authCode: null,
      warningText: null,
      warning: false,
    };
  },

  computed: {
    ...mapState("userInfo", ["userInfo"]),
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
      if (this.account.email && !this.timer) {
        return false;
      }
      return true;
    },
    accountEmail() {
      return this.account.email + "@tongji.edu.cn";
    },
    regIsDisabled() {
      if (
        this.account.email &&
        this.account.nickname &&
        this.account.authCode &&
        this.account.password &&
        this.accept &&
        this.isNicknameGood
      ) {
        return false;
      }
      return true;
    },
  },

  methods: {
    async handleAuthCode() {
      if (this.isSendingAuthCode) {
        this.$q.notify({
          type: "warning",
          message: "验证码已经发送，请稍后再试",
        });
      } else {
        var resp = await sentAuthCode({
          emailAddr: this.accountEmail,
          expireTime: 300,
          operationType: "邮箱验证",
          subject: "TJSPACE·同济大学社群邮箱验证",
        });
        ////console.log("in receiving authCode", resp);
        if (resp.success) {
          //设置倒计时
          this.timer = setInterval(() => {
            if (this.downCnt == 0) {
              this.timer = clearInterval(this.timer);
              this.downCnt = 5;
            } else {
              this.downCnt -= 1;
            }
          }, 1000);
        }
      }
    },
    checkNickname() {
      if (!this.account.nickname) {
        return;
      }
      this.isCheckingNickname = true;
      validateNickname({
        nickname: this.account.nickname,
      }).then((resp) => {
        if (resp.success) {
          this.isNicknameGood = true;
          this.nicknameErrorMessage = "该昵称可以使用";
        } else {
          this.isNicknameGood = false;
          this.nicknameMessage = "该昵称已经被使用使用";
        }
        this.haveBlured = true;
        this.isCheckingNickname = false;
      });
    },

    handleRegister() {
      validateAuthCode({
        addr: this.accountEmail,
        code: this.account.authCode,
      }).then((resp) => {
        if (!resp.success) {
          this.$q.notify({
            type: "negative",
            message: resp.message,
          });
        } else {
          this.$store.dispatch("userInfo/registerUser", {
            email: this.account.email,
            password: this.account.password,
            nickname: this.account.nickname,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 27px;
  line-height: -2;
  text-align: center;
}

.queren-btn {
  width: 100%;
}

.my-card {
  max-width: 420px;
  opacity: 0.9;
}
</style>
