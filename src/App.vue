<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

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
