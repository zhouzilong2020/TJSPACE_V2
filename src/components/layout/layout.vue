<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-primary text-white" height-hint="98">
      <!-- 功能按钮 -->
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title class="title"> TJSPACE · 同济大学社群 </q-toolbar-title>

        <!-- 登录|注册 -->
        <!-- 三种情况！ -->
        <!-- 1.正在登录中 加载 -->

        <!-- 登录成功 -->
        <template v-if="userInfo">
          <template class="flex-left">
            <div class="text-caption">欢迎您！{{ userInfo.nickname }}</div>

            <q-input
              dark
              v-if="
                this.$route.name != 'SearchCourse' &&
                this.$route.name != 'SearchCourseNoKeyword'
              "
              dense
              standout
              v-model="text"
              @keydown.13="handleTopSearch()"
              input-class="text-left"
              class="q-ml-md"
              placeholder="发现更多课程"
            >
              <template v-slot:append>
                <q-icon v-if="text === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
              </template>
            </q-input>

            <!-- 空格间隙 -->
            <q-space />
          </template>
          <q-btn-group class="top-option" flat>
            <q-btn
              class="search-course-btn"
              flat
              :to="{
                name: 'Homepage',
                params: {
                  userId: userInfo.userid,
                },
              }"
              label="个人主页"
            />
            <q-btn
              class="search-course-btn"
              flat
              :to="{
                name: 'SearchCourseNoKeyword',
              }"
              label="搜索课程"
            />
            <q-btn class="BBS-btn" flat :to="{ name: 'BBSHomepage' }" label="同济BBS" />
            <q-btn class="logout-btn" flat @click="handleLogout()" label="退出登录" />
          </q-btn-group>
        </template>

        <!-- 没有登录状态 -->
        <template v-else>
          <q-btn-group class="top-option" flat>
            <q-btn stretch label="现在登录" :to="{ name: 'login' }" />
            <q-btn label="马上注册" :to="{ name: 'register' }" />
          </q-btn-group>
        </template>
      </q-toolbar>

      <!-- 路径导航 -->
      <!-- <q-bar  v-show="routes" dense shrink class="bg-primary nav-route q-pl-md q-pb-md">
        <q-breadcrumbs active-color="white" style="font-size: 10pt">
          <q-breadcrumbs-el v-for="(route, i) in routes" :key="i" dense label="个人主页" icon="bookmarks" />
        </q-breadcrumbs>
      </q-bar> -->
    </q-header>

    <!-- 侧边栏 -->
    <q-drawer
      class="drawer"
      flat
      overlay
      content-class="bg-grey-3"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      dense
      :mini-width="61"
      :width="181"
      :breakpoint="500"
      v-model="drawer"
    >
      <!-- 完全展开模式的展示 -->
      <template>
        <!-- 头部的背景图片和用户信息、头像 -->
        <q-img class="absolute-top" :src="avatarBGPath" style="height: 130px">
          <div class="absolute-bottom bg-transparent drawer-top">
            <q-avatar size="36pt" class="q-mb-sm avatar">
              <img :src="userInfo.avatar" />
            </q-avatar>

            <template v-if="userInfo">
              <div class="text-weight-bold" v-show="!miniState">
                {{ "欢迎你！" + userInfo.nickname }}
              </div>
              <!-- 这个没存user的Email啊 -->
              <!-- <div>{{ userInfo.eMail }}</div> -->
            </template>

            <template v-else>
              <div class="text-weight-bold">请先登录</div>
            </template>
          </div>
        </q-img>

        <q-scroll-area
          style="
            height: calc(100% - 130px);
            margin-top: 130px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list>
            <!-- 用户登录后显示 -->
            <template v-if="userInfo">
              <drawer-btn
                :label="'个人主页'"
                @click="debug()"
                :to="{
                  name: 'Homepage',
                  params: {
                    userId: userInfo.userid,
                  },
                }"
                :icon="'home'"
              />
            </template>

            <!-- 用户不登录显示 -->
            <template>
              <drawer-btn
                :label="'同济BBS'"
                :to="{ name: 'BBSHomepage' }"
                :icon="'forum'"
              />
              <drawer-btn
                :label="'搜索课程'"
                :to="{ name: 'SearchCourseNoKeyword' }"
                :icon="'search'"
              />
            </template>

            <template class="drawer-btn-penal flex-left">
              <drawer-btn-penal />
            </template>
          </q-list>
        </q-scroll-area>
      </template>
    </q-drawer>

    <q-page-container class="body">
      <!-- 你的内容将会被插入在这里 -->
      <slot v-if="!isLoading" name="main"></slot>
    </q-page-container>

    <!-- footer -->
    <q-footer reveal bordered class="bg-grey-8 text-white page-footer">
      <q-toolbar>
        <span class="footer-name">TJSPACE·同济大学社群</span>
        <span class="footer-id">津ICP备20006438号</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import DrawerBtnPenal from "./DrawerBtnPenal";
import DrawerBtn from "./DrawerBtn";
import { mapState } from "vuex";
export default {
  components: {
    DrawerBtnPenal,
    DrawerBtn,
  },
  data() {
    return {
      text: "",
      active: -1,
      miniState: true,
      //TODE DEBUG
      drawer: false,
      logoPath: require("../../assets/TJU.png"),
      avatarBGPath: require("../../assets/material.png"),
    };
  },
  props: {},
  computed: {
    ...mapState("userInfo", ["isLoading", "userInfo"]),
  },
  methods: {
    debug() {
      console.log("this", this.userInfo.userId);
    },
    handleTopSearch() {
      // 如果当前页面不是课程搜索页面
      this.$router.push({
        name: "SearchCourse",
        params: {
          keyword: this.text,
        },
      });
    },
    handleRoute(payload) {
      console.log("handle route change", payload);
      this.$router.push({
        name: payload,
        params: {
          userId: payload.userid,
        },
      });
    },
    async handleLogout() {
      console.log("clicking logout btn");
      await this.$store.dispatch("userInfo/logoutUser");
      // 成功退出
      this.$router.push({
        name: "index",
      });
    },
  },
};
</script>

<style scoped>
.logout-btn {
  margin-left: 10px;
}
.drawer {
  background-color: rgb(245, 246, 247);
}
.drawer-top {
  font-size: 0.8em;
  padding-left: 0.4em;
  padding-right: 0;
}
.header .header-search {
  color: aliceblue;
}
.page-footer .footer-name {
  margin-left: 10px;
  font-size: 16px;
}
.page-footer .footer-id {
  position: absolute;
  right: 15px;
  font-size: 16px;
}
</style>
