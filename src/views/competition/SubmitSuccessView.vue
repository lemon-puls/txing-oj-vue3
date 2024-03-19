<template>
  <div
    id="submitSuccessViewId"
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;
      font-size: 15px;
      height: 100vh;
    "
  >
    <SvgIcon icon="success" :size="60"></SvgIcon>
    <span>提交成功 请稍后查看结果！</span>
    <span style="color: green" @click="onBackMatchView">返回比赛主页</span>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@/icons/SvgIcon";
import { useRouter } from "vue-router";

const router = useRouter();

const onBackMatchView = () => {
  router.push({
    path: "/txing/match/center",
  });
};
</script>

<style lang="scss" scoped></style>
