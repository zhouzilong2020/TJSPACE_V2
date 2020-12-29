<template>
    <div class="container row justify-center">
      <img :src="bgPath" alt="">
      <msmlogin/>
    </div>
</template>

<script>
import msmlogin from '../components/userInfo/msmlogin'

export default {
  data(){
    return {
      bgPath : require('../assets/school.jpeg')
    }
  },

  
  components: {
    msmlogin
  },

}
</script>

<style scoped>
img {
  position: fixed;
  height: 100%;
  width: 100%;
  margin-top: -120px;
  padding: 0;
  z-index: -1;
}
.container{
    margin-top: 90px;
}


</style>