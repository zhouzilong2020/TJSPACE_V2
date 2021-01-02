<template>
  <q-card class="q-my-md bg-grey-2 my-card col-xs-12">
    <q-card-section>
       <div class="title">
        <h5>欢迎使用</h5>
        <h5 class="title-name">TJSPACE· 同济大学社群</h5>
      </div>
      <q-form class="q-gutter-md q-px-lg">
        <!-- 手机号 -->
        <q-input
          id="phoneNumber"
          v-model="model.phoneNumber"
          label="手机号："
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入您的手机号']"
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
        <!-- 手机验证码 -->
        <q-input
          v-model="model.authCode"
          label="手机验证码："
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '请输入验证码']"
        />
      </q-form>
      <q-toggle v-model="remember" label="记住手机号" />
      <!-- 注册按钮 -->
      <div class="q-py-sm">
        <q-btn
          class="queren-btn"
          label="登陆"
          :disable="loginIsDisabled"
          color="primary"
          @click="handleLogin()"
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
  sentMsmAuthCode,
  validateMsmAuthCode,
} from "../../services/userService";
export default {
  components: {
    popDialog,
  },
  data() {
    return {
      model: {
        phoneNumber: null,
        authCode: null,
      },
      // 计时器
      timer: null,
      downCnt: 60,

      verified: false,
      authCode: null,
      warningText: null,
      warning: false,
      remember:false,
      validatetoken:""
    };
  },
   created() {
    if (localStorage.getItem("TJSPACE-phone")) {
      this.model.phoneNumber = localStorage.getItem("TJSPACE-phone");
      this.remember = true;
    }
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
      if (this.model.phoneNumber && !this.timer) {
        return false;
      }
      return true;
    },
    loginIsDisabled() {
      if (this.model.phoneNumber && this.model.authCode) {
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
        var resp = await sentMsmAuthCode({
          phone:this.model.phoneNumber
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

    async handleLogin() {
      var resp = await validateMsmAuthCode({
        phone: this.model.phoneNumber,
        code: this.model.authCode,
      });
      console.log("resp", resp);
      if (!resp.success) {
        await this.popWarning(resp.message);
      } else {
        this.validatetoken=resp.data.token
        console.log("in sent login form", this.model);
        this.$store.dispatch("userInfo/MSMloginUser", {
          phone: this.model.phoneNumber,
          remember:this.remember,
          token:this.validatetoken,
        }).then(()=>{
          if (this.token) {
          // 成功获取token 表示成功登录
          // console.log("get user token")
          if (this.userInfo) {
              //如果在登陆之后跳转回index或者没有前驱页面就跳转到首页
              this.$router.push({
                name: "Homepage",
              });
            }
        } 

        })
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