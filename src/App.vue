<template>
  <div id="app">
    <template
      v-if="
        route.path.startsWith('/user') ||
        route.path.startsWith('/post/add') ||
        route.path.startsWith('/post/update')
      "
    >
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const route = useRoute();
/**
 * 全局初始化函数，全局单次调用的代码 都可以在这里写
 */
const doInit = () => {
  console.log("Txing, 与您同行！");
};

onMounted(() => {
  doInit();
});
</script>
