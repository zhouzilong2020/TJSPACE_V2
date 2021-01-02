<template>
  <q-card class="q-my-md bg-grey-2 my-card col-xs-12">
    <q-card-section>
      <h5 class="title">注册TJSPACE账号</h5>
      <q-form class="q-gutter-md q-px-lg">
        <!-- 昵称 -->
        <q-input
          id="nickname"
          v-model="model.nickname"
          label="昵称:"
          hint="设置你的昵称，最长10位"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || '请输入你的昵称',
            (val) => val.length <= 10 || '昵称长度不能超过10位',
          ]"
        />
        <!-- 邮箱 -->
        <q-input
          id="email"
          v-model="model.email"
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
          v-model="model.authCode"
          label="邮箱验证码："
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '请输入验证码']"
        />
        <!-- 输入密码 -->
        <q-input
          v-model="model.password"
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
          :rules="[(val) => val === this.model.password || '两次密码不同']"
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
      </div>
    </q-card-section>
    <pop-dialog
      :content="warningText"
      :bgColor="'bg-warning'"
      :show="warning"
    />
  </q-card>
</template>

<script>
import { mapState } from "vuex";
import popDialog from "../popDialog";
import {
  sentAuthCode,
  validateAuthCode,
  validateNickname,
} from "../../services/userService";
export default {
  components: {
    popDialog,
  },
  data() {
    return {
      isPwd: true,
      isRPwd: true,
      password: null,
      model: {
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
    ...mapState("userInfo", ["isLoading", "token", "userInfo"]),
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
      if (this.model.email && !this.timer) {
        return false;
      }
      return true;
    },
    accountEmail() {
      return this.model.email + "@tongji.edu.cn";
    },
    regIsDisabled() {
      if (
        this.model.email &&
        this.model.nickname &&
        this.model.authCode &&
        this.model.password &&
        this.accept
      ) {
        return false;
      }
      return true;
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
        var resp = await sentAuthCode({
          emailAddr: this.accountEmail,
          expireTime: 60,
          operationType: "邮箱验证",
          subject: "TJSPACE·同济大学社群邮箱验证",
        });
        console.log("in receiving authCode", resp);
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
        } else {
          await this.popWarning(resp.message);
        }
      }
    },

    async handleRegister() {
      var resp = await validateAuthCode({
        addr: this.accountEmail,
        code: this.model.authCode,
      });
      console.log("resp", resp);
      if (!resp.success) {
        await this.popWarning(resp.message);
      } else {
        var resp1 = await validateNickname({
          nickname: this.model.nickname,
        });
        console.log(resp1)
        if (resp1.success) {
          console.log("in sent reg form", this.model);
          var resp2 = await this.$store.dispatch("userInfo/registerUser", {
            email: this.model.email,
            password: this.model.password,
            nickname: this.model.nickname,
          });
          console.log("resp2",resp2)
          if (this.token) {
              this.$router.push({
              name: "SelfInfoModify",
            });
          } else {
            await this.popWarning(resp2.message)
          }
        }
        //昵称重复
        else {
          await this.popWarning(resp1.message);
          if (resp1.message == "昵称重复") {
            this.model.nickname = "";
            document.getElementById("nickname").focus();
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.title {
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