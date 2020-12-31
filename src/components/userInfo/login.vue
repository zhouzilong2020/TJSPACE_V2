<template>
  <q-card class="q-my-md bg-grey-2 my-card col-md-4 col-xs-12">
    <q-card-section>
      <div class="title">
        <h5>欢迎使用</h5>
        <h5 class="title-name">TJSPACE· 同济大学社群</h5>
      </div>
      <q-form class="q-gutter-md">
        <q-input
          class="email"
          clearable
          clear-icon="close"
          v-model="account.email"
          label="邮箱:"
          suffix="@tongji.edu.cn"
          hint="请输入注册时使用的同济邮箱"
        />

        <q-input
          v-model="account.password"
          label="密码:"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-toggle v-model="remember" label="记住邮箱" />

        <div>
          <q-btn
            :loading="isLoading"
            :disable="isDisabled"
            class="queren-btn"
            label="登录"
            color="primary"
            @click="handleLogin()"
          >
          </q-btn>
        </div>
        <q-btn-group flat spread>
          <q-btn
            flat
            color="primary"
            :to="{ name: 'msmlogin' }"
            label="手机登陆"
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
// import popDialog from "../popDialog";
import { mapState } from "vuex";
// import { getCookie, setCookie } from "../../utils/utils";

export default {
  components: {},

  data() {
    return {
      isPwd: true,
      remember: false,
      url: "",
      account: {
        email: "",
        password: "",
        phoneNumber: "",
      },
      warning: false,
    };
  },

  computed: {
    ...mapState("userInfo", ["userInfo", "isLoading"]),
    isDisabled() {
      if (this.account.email && this.account.password) return false;
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

  created() {
   
    if (localStorage.getItem("TJSPACE-email")) {
      this.account.email = localStorage.getItem("TJSPACE-email");
      this.remember = true;
    }
  },

  methods: {
    handleLogin() {
      this.$store.dispatch("userInfo/loginUser", {
        account: this.account,
        remember: this.remember,
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
