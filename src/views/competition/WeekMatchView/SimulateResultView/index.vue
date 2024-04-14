<template>
  <div
    id="simulateResultViewId"
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
    <SvgIcon v-if="!hasResult" icon="success" :size="60"></SvgIcon>
    <div v-if="!hasResult">
      <span>提交成功，正在判题中</span><span class="my-loading"></span>
    </div>

    <div class="judge-result" v-if="hasResult">
      <img class="img" src="@/assets/simulateResult.jpg" />
      <a-descriptions
        :align="{ label: 'center', value: 'center' }"
        :data="resultData"
        :column="1"
      >
        <template #value="{ value }">
          <span
            style="color: #099525"
            v-if="value == JudgeRsultEnum.ACCEPTED"
            >{{ value }}</span
          >
          <span
            v-else-if="
              value == JudgeRsultEnum.COMPILE_ERROR ||
              value == JudgeRsultEnum.OUT_OF_MEMORY ||
              value == JudgeRsultEnum.TIMEOUT
            "
            style="color: #d92416"
            >{{ value }}</span
          >
          <span v-else style="color: #ff7300">{{ value }}</span>
        </template>
      </a-descriptions>
      <div class="footer">
        <span
          >你一共通过了
          <span style="color: red; font-weight: bold; font-size: 22px">{{
            acCount
          }}</span>
          道题目，再接再厉！</span
        >
      </div>
      <div class="time">
        <svg-icon icon="clock" :size="25"></svg-icon>
        <span>{{ formatSecondsToTime(seconds) }}</span>
      </div>
    </div>

    <span style="color: green; cursor: pointer" @click="onBackMatchView"
      >返回比赛主页</span
    >
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/icons/SvgIcon";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, defineProps } from "vue";
import { JudgeRsultEnum } from "@/enume";
import {
  MatchWeekAppControllerService,
  QuestionSubmitControllerService,
} from "../../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { formatSecondsToTime } from "../../../../utils/computeTime";

const router = useRouter();
const route = useRoute();
// const joinId = route.query.joinId;
const props = defineProps(["joinId"]);

onMounted(() => {
  timer(props.joinId as any);
});

const onBackMatchView = () => {
  router.push({
    path: "/txing/match/center",
  });
};

// 定时器 查询代码执行结果
const timer = (joinId: number) => {
  const intervalId = setInterval(async () => {
    // 在这里执行每秒要执行的任务
    const res = await MatchWeekAppControllerService.getSimulateResultUsingGet(
      joinId as any
    );
    if (res.code != 0) {
      message.error(res.msg);
      return;
    }
    if (res.data != null) {
      clearInterval(intervalId);
      resultData.value = res.data.resultItems;
      acCount.value = res.data.acCount;
      seconds.value = res.data.seconds;
      hasResult.value = true;
    }
  }, 1000); // 每秒执行一次，间隔时间为 1000 毫秒
};

const hasResult = ref(false);
const acCount = ref();
const seconds = ref();
const resultData = ref([
  {
    label: "两数之和",
    value: "75%",
  },
  {
    label: "三数之和",
    value: "编译错误",
  },
  {
    label: "四数之和",
    value: "完全通过",
  },
  {
    label: "一道小偷偷东西的题",
    value: "20%",
  },
  {
    label: "666",
    value: "内存溢出",
  },
]);
</script>

<style lang="scss">
#simulateResultViewId {
  .img {
    margin-bottom: 30px;
  }

  .judge-result {
    width: 400px;
    height: 320px;
    background-color: whitesmoke;
    padding: 15px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .footer {
      margin-top: 10px;
    }

    .time {
      margin-top: 10px;
      display: flex;
      align-items: center;
      column-gap: 5px;
    }
  }

  td.arco-descriptions-item-label {
    color: initial !important;
  }
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

.my-loading::after {
  content: "...";
  animation: loading 1s infinite;
}

.my-loading {
  display: inline-block;
  text-align: left;
  width: 20px;
}
</style>
