<template>
  <q-card style="min-width: 160px" elevated>
    <q-item>
      <q-item-section>
        <q-item-label class="text-center"> 个人信息</q-item-label>
      </q-item-section>
    </q-item>
    <q-card-section class="text-center">
      <q-avatar size="80px">
        <img :src="userInfo.avatar" />
      </q-avatar>
    </q-card-section>
    <q-card-section horizontal>
      <q-list padding>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="face" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>昵称</q-item-label>
            <q-item-label> {{ userInfo.nickname }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="wc"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label overline>性别</q-item-label>
            <q-item-label>{{ userInfo.gender }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="amber" name="local_offer" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>年级</q-item-label>
            <q-item-label> {{ userInfo.grade }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="green" name="book" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>专业</q-item-label>
            <q-item-label>
              {{
                userInfo.majorName ? userInfo.majorName : "暂无"
              }}</q-item-label
            >
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>学历</q-item-label>
            <q-item-label> {{ userInfo.degree }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator />
    <q-btn
      class="full-width btn gt-sm"
      color="primary"
      icon-right="build"
      type="修改个人信息"
      label="修改信息"
      :to="{ name: 'SelfInfoModify' }"
      unelevated
    />
  </q-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserInfo",
  data() {
    return {};
  },
  created() {
    
  },
  computed: { ...mapState("userInfo", ["userInfo"]) },
};
</script>

<style>
</style>