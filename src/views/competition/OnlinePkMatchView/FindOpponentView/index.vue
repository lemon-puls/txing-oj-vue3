<template>
  <div id="findOpponentViewId">
    <div class="content">
      <SvgIcon class="icon" color="red" icon="matching" :size="150"></SvgIcon>
      <div style="display: flex; justify-content: center; color: #007bff">
        <span>正在匹配中</span
        ><span
          style="text-align: left; width: 20px"
          class="loading-dots"
        ></span>
      </div>
      <div>
        <a-button @click="onCancelMatch" shape="round" type="primary"
          >放弃PK
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/icons/SvgIcon";
import { MatchOnlinepkAppControllerService } from "../../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { usePkStore } from "@/store/pk";

const router = useRouter();
const pkStore = usePkStore();

onMounted(() => {
  sendMatchRequest();
});

const sendMatchRequest = async () => {
  const res = await MatchOnlinepkAppControllerService.findOpponentUsingGet();
  if (res.code == 10001) {
    message.warning(res.msg);
    router.push({
      path: "/txing/match/pk/" + res.data,
    });
    return;
  }
  if (res.code != 0) {
    message.error("匹配失败：" + res.msg);
    router.push({
      path: "/txing",
    });
    return;
  }
  if (res.data != -1) {
    message.success("匹配成功 开始PK");
    router.push({
      path: "/txing/match/pk/" + res.data,
    });
  }
};
// 匹配成功
const isMatchSuccess = computed(() => {
  return pkStore.isMatchSuccess;
});
watch(isMatchSuccess, async (val, oldVal) => {
  if (val === true && val !== oldVal) {
    message.success("匹配成功 开始PK");
    router.push({
      path: "/txing/match/pk/" + pkStore.currentMatchId,
    });
  }
});
onBeforeUnmount(() => {
  // console.log("用户离开匹配页");
  cancelMatch();
  pkStore.resetPkSubmit();
});
// 取消匹配
const cancelMatch = async () => {
  const res = await MatchOnlinepkAppControllerService.cancelMatchUsingGet();
  if (res.code !== 0) {
    return false;
  } else {
    return true;
  }
};
const onCancelMatch = async () => {
  if (!(await cancelMatch())) {
    message.error("取消失败，请尝试重试！");
    return;
  }
  router.push({
    path: "/txing",
  });
};
</script>

<style lang="scss">
#findOpponentViewId {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 20000;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    text-align: center;
  }

  @keyframes zoom-in-out {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }

  .icon {
    //width: 50px; /* 设置图标的宽度 */
    //height: 50px; /* 设置图标的高度 */
    animation: zoom-in-out 2s infinite; /* 设置动画效果：2秒一次，无限循环 */
  }

  @keyframes loading {
    0% {
      content: ".";
    }
    25% {
      content: "..";
    }
    50% {
      content: "...";
    }
    75% {
      content: "....";
    }
  }

  .loading-dots::after {
    content: "...";
    animation: loading 1s infinite;
  }
}
</style>
