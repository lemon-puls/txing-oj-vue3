<template>
  <div id="app">
    <template
      v-if="
        route.path.startsWith('/txing/user') ||
        route.path.startsWith('/txing/post/add') ||
        route.path.startsWith('/txing/post/update') ||
        route.path.startsWith('/txing/match/week/do') ||
        route.path.startsWith('/txing/match/pk') ||
        route.path.startsWith('/txing/match/submit/success') ||
        route.path.startsWith('/txing/match/week/simulate/') ||
        route.path.startsWith('/txing/match/simulate/result/') ||
        route.path.startsWith('/txing/view/question/')
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
  console.log("给我一个机会，我给你一个惊喜！");
};

onMounted(() => {
  doInit();
});
</script>
