<template>
  <div>
    <img :src="bgPath" alt="" />
    <div class="q-mt-lg q-pt-lg justify-center row">
      <index-rotate-card  class="index-card col-8" />
      <login class="login-card" />
    </div>
  </div>
</template>

<script>
import login from "../components/userInfo/login";
import indexRotateCard from "../components/indexRotateCard";
import { mapState } from "vuex";

export default {
  components: {
    login,
    indexRotateCard,
  },
  computed:mapState('userInfo', ['userInfo']),
  
  data() {
    return {
      bgPath: require("../assets/school.jpeg"),
    };
  },
  created() {
    // if(this.userInfo){
    //   //console.log('in index created',this.userInfo)
    //   this.$router.push({
    //     name:'Homepage',
    //     params:{
    //       userId:this.userInfo.userId
    //     }
    //   })
    // }
  },
};
</script>

<style scoped>
img {
  position: fixed;
  height: 100%;
  width: 100%;
  margin-top: -40px;
  padding: 0;
  z-index: -1;
}
.index-card {
  opacity: 0.9;
  /* height:; */
  /* margin-left: px; */
}
.login-card {
  opacity: 0.9;
  /* height: 520px; */
}
</style>