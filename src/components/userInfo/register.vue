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
          :rules="[(val) => (val && val.length > 0) || '请输入您的同济邮箱']"
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
import popDialog from "../popDialog";
import { sentAuthCode } from "../../services/userService";
import { mapState } from "vuex";
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

    accountEmail() {
      return this.model.email + "@tongji.edu.cn";
    },
    ...mapState("userInfo", ["token", "userInfo"]),
    sentIsDisabled() {
      if (this.model.email && !this.timer) {
        return false;
      }
      return true;
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
        await this.popWarning("验证吗已发送，请稍后再试！");
      } else {
        var resp = await sentAuthCode({
          email: this.accountEmail,
        });

        console.log("in receiving authCode", resp);
        if (resp.data.status) {
          //设置倒计时
          this.timer = setInterval(() => {
            if (this.downCnt == 0) {
              this.timer = clearInterval(this.timer);
              this.downCnt = 5;
            } else {
              this.downCnt -= 1;
            }
          }, 1000);

          this.authCode = resp.data.authCode;
          console.log("set authCode", resp.data.authCode);
        } else {
          await this.popWarning("服务器错误，请稍后再试！");
        }
      }
    },

    async handleRegister() {
      if (this.model.authCode != this.authCode) {
        await this.popWarning("验证码错误！");
      } else {
        console.log("in sent reg form", this.model);
        var resp = await this.$store.dispatch("userInfo/registerUser", {
          email: this.model.email,
          nickname: this.model.nickname,
          password: this.model.password,
        });
        if (resp.status) {
          // 成功获取token 表示成功登录
          // console.log("get user token")
          console.log(this.userInfo);
          this.$router.push({
            name: "SelfInfoModify",
            params: {
              userId: this.userInfo.userid,
            },
          });
        } else {
          // 目前只有昵称重复的问题
          this.popWarning(resp.msg);
          if (resp.msg == "昵称重复") {
            this.model.nickname = ''
            document.getElementById('nickname').focus()

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