<template>
    <q-dialog v-model="show" :position="'top'">
      <q-card style="width: 350px" :class="bgColor">
        <q-card-section class="items-center no-wrap">
            <div class="text-body1" style="text-align:center">
              {{content}}
            </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name: "popDialog",
  props:{
    content:{
      type:String,
      default:"一个提示"
    },
    bgColor:{
      type:String,
      default:"bg-warning"
    },
    show:{
      type:Boolean,
      default:true
    }
  },

}
</script>

<style>

</style>