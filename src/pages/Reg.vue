<template>
    <div class="container row justify-center">
      <img :src="bgPath" alt="">
      <register/>
    </div>
</template>

<script>
import register from '../components/userInfo/register'

export default {
  data(){
    return {
      bgPath : require('../assets/school.jpeg')
    }
  },

  
  components: {
    register
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