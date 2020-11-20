<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <!-- 如何写路由！！！ -->
      <router-link :to="{ name: to.name }">{{
        label
      }}</router-link>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "name",
    },
    to: {
      type: Object,
      default() {
        return {
          name: "destination"
        };
      },
    },
    icon: {
      type: String,
      default: "star",
    },
  },
};
</script>

<style>
</style>