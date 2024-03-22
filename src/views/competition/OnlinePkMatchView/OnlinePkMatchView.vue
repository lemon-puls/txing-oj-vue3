<!--
* @OnlinePkMatchView
* @author Li zhiwei
* @date 2024/2/19 17:54
-->

<template>
  <div id="OnlinePkMatchView">
    <!--    头部区域-->
    <div class="header">
      <a-row
        class="grid-demo"
        :style="{
          height: '50px',
        }"
      >
        <a-col
          flex="30%"
          :style="{
            height: '50px',
          }"
        >
          <div
            style="
              display: flex;
              align-items: center;
              height: 100%;
              margin-left: 10px;
              color: #979797;
            "
          >
            <div>
              <svg-icon icon="back" size="18px" />
              <span>放弃竞赛</span>
            </div>
          </div>
        </a-col>
        <a-col flex="auto" style="height: 100%">
          <div
            style="
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 18px;
              column-gap: 5px;
            "
          >
            <span>正在与</span>
            <img
              style="border-radius: 50%; height: 25px; width: 25px"
              :src="userShowVO?.userAvatar"
            />
            <span style="color: red">{{ userShowVO?.userName }}</span>
            <span>PK</span>
          </div>
        </a-col>
        <a-col flex="30%" style="height: 100%">
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              height: 100%;
              column-gap: 15px;
              margin-right: 10px;
            "
          >
            <div>
              <span>对手状态：</span
              ><span style="color: #ff7300">正在作答</span>
            </div>
            <a-countdown
              v-if="!isLoading"
              :value="Date.parse(matchVO?.endTime)"
              :now="Date.now()"
              @finish="handleTimeOut"
            />
            <a-popconfirm
              content="确认要交卷吗?"
              type="success"
              @ok="doSubmit(true)"
              position="br"
            >
              <a-button type="outline" status="success" shape="round"
                >完成作答
              </a-button>
            </a-popconfirm>
          </div>
        </a-col>
      </a-row>
    </div>
    <!--    答题区域-->
    <a-split
      :style="{
        width: '100%',
        overflow: 'scroll',
        height: 'calc(100vh - 60px)',
        minWidth: '500px',
      }"
      :default-size="0.4"
    >
      <template #first>
        <a-card :title="question?.title">
          <a-descriptions title="题目限制" :column="{ xs: 1, md: 2, lg: 3 }">
            <a-descriptions-item label="时间限制">
              {{ question?.judgeConfig.timeLimit ?? 0 }} ms
            </a-descriptions-item>
            <a-descriptions-item label="内存限制">
              {{
                `${(question?.judgeConfig.memoryLimit / (1024 * 1024)).toFixed(
                  2
                )} MB`
              }}
            </a-descriptions-item>
          </a-descriptions>
          <MdViewer :value="question?.content || ''" />
          <template #extra>
            <a-space wrap>
              <a-tag
                v-for="(tag, index) of question?.tags"
                :key="index"
                color="green"
                >{{ tag }}
              </a-tag>
            </a-space>
          </template>
        </a-card>
      </template>
      <template #second>
        <div>
          <a-split
            direction="vertical"
            :default-size="0.7"
            :style="{ height: 'calc(100vh - 77px)' }"
          >
            <template #first>
              <!--              display: flex; flex-direction: column-->
              <div style="height: 100%">
                <a-form
                  style="padding-left: 10px; box-sizing: border-box"
                  :model="form"
                  layout="inline"
                >
                  <a-form-item
                    field="title"
                    label="编程语言"
                    style="min-width: 240px"
                  >
                    <a-select
                      v-model="language"
                      :style="{ width: '320px' }"
                      placeholder="选择语言"
                      @change="onlanguagechange"
                    >
                      <a-option>java</a-option>
                      <a-option>cpp</a-option>
                      <a-option>go</a-option>
                    </a-select>
                  </a-form-item>
                </a-form>
                <CodeEditor
                  :key="questionId"
                  :value="code"
                  language="java"
                  :handleChange="changeCode"
                  style="height: 100%"
                />
              </div>
            </template>
            <template #second>
              <div
                style="height: 100%; padding: 10px; box-sizing: border-box"
                :class="{
                  'loading-container': true,
                  'is-loading': isJudgeLoading,
                }"
              >
                <div v-if="isJudgeLoading" class="loading-spinner"></div>
                <div
                  class="exec-area-head"
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                  "
                >
                  <span style="color: green">执行结果</span>
                  <div style="display: flex; column-gap: 10px">
                    <!--                    <a-button type="outline" status="success">运行</a-button>-->
                    <a-button
                      @click="doSubmit(false)"
                      type="outline"
                      status="success"
                      >提交并保存
                    </a-button>
                  </div>
                </div>
                <hr />
                <div class="exec-area-result">
                  <div id="execResultDiv" v-if="resultData[0].value !== ''">
                    <!--                      resultData.get(questionNo)[0]?.value != ''-->
                    <a-descriptions
                      style="margin-top: 20px"
                      :data="resultData"
                      :column="1"
                    />
                  </div>
                </div>
              </div>
            </template>
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<style lang="scss">
#OnlinePkMatchView {
  //height: 100vh;

  .header {
    height: 50px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }

  .arco-space-horizontal .arco-space-item {
    margin-bottom: 0 !important;
  }

  .loading-container {
    position: relative;
  }

  .is-loading {
    background-color: rgba(109, 101, 101, 0.1) !important;
  }

  .exec-area-result {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
  }
}
</style>

<script setup lang="ts">
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import SvgIcon from "@/icons/SvgIcon";
import { useRouter } from "vue-router";
import _ from "lodash";
import {
  onBeforeUnmount,
  onMounted,
  withDefaults,
  defineProps,
  ref,
  computed,
} from "vue";
import {
  MatchOnlinepkAppControllerService,
  MatchWeekAppControllerService,
  QuestionSubmitControllerService,
} from "../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { usePkStore } from "@/store/pk";
import { useMatchStore } from "@/store/match";
import { UserShowVO } from "@/service/types";
import Message from "@arco-design/web-vue/es/message";

const router = useRouter();
const matchStore = useMatchStore();
onMounted(async () => {
  await loadMatchData();
  pkStore.initPkSubmit(question.value.id);
  matchStore.setPkUserShowVO(userShowVO.value as UserShowVO);
});

// 接受matchId
interface Props {
  id: number;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => -1,
});
// 加载比赛数据
const matchData = ref();
const question = ref();
const userShowVO = ref();
const matchVO = ref();
const loadMatchData = async () => {
  const res = await MatchOnlinepkAppControllerService.startPkUsingGet(props.id);
  if (res.code !== 0) {
    message.error("比赛数据加载失败 请刷新重试！");
    return;
  }
  matchData.value = res.data;
  question.value = matchData.value.questionVO;
  userShowVO.value = matchData.value.userShowVO;
  matchVO.value = matchData.value.matchVO;
};
// 作答记录
const pkStore = usePkStore();
const code = computed({
  get: () => {
    return pkStore.pkSubmit?.code ?? "";
  },
  set: (val: any) => {
    pkStore.pkSubmit.code = val;
  },
});
const language = computed({
  get: () => {
    return pkStore.pkSubmit?.language;
  },
  set: (val: any) => {
    pkStore.pkSubmit.language = val;
  },
});
const questionId = computed({
  get: () => {
    return pkStore.pkSubmit?.questionId;
  },
  set: (val: any) => {
    pkStore.pkSubmit.questionId = val;
  },
});
// 编程语言选项值发生改变
const onlanguagechange = (value: string) => {
  if (value !== "java") {
    message.info("目前判题系统仅支持Java语言 对其他语言的支持正在开发中...");
  }
};
const changeCode = (value: string) => {
  code.value = value;
};

// 提交单条题目
const doSubmit = async (finished: boolean) => {
  if (
    code.value === undefined ||
    language.value === undefined ||
    questionId.value === undefined
  ) {
    message.warning("代码、编程语言、题目ID不得为空");
    return;
  }
  const res = await MatchOnlinepkAppControllerService.pkSubmitUsingPost({
    code: code.value,
    language: language.value,
    questionId: questionId.value,
    matchId: matchVO.value.id,
    finished: finished,
  });
  if (res.code !== 0) {
    message.error("提交失败 请稍后重试：" + res.message);
    return;
  }
  if (!finished) {
    if (res.data == -1) {
      message.warning("代码无改动 无需重复提交");
      return;
    } else {
      isJudgeLoading.value = true;
      timer(res.data);
    }
    return;
  }
  message.success("提交成功");
  pkStore.resetPkSubmit();
  // 结束作答
  router.push({
    path: "/txing/match/pk/result/" + matchVO.value.id,
  });
};
// 定时器 查询代码执行结果
const timer = (sumbitId: number) => {
  let i = 0;
  const intervalId = setInterval(async () => {
    // 在这里执行每秒要执行的任务
    const res = await QuestionSubmitControllerService.getExecResultUsingGet(
      sumbitId
    );
    // 检查满足条件的逻辑
    if (res.code === 0 && res.data != "{}") {
      // 条件满足，清除定时器
      clearInterval(intervalId);
      const data = JSON.parse(res.data);
      resultData.value[0].value = `${data.time} MS`;
      resultData.value[1].value = `${(data.memory / (1024 * 1024)).toFixed(
        2
      )} MB`;
      resultData.value[2].value = data.message;
      resultData.value[3].value = (data.acceptedRate * 100).toFixed(2) + "%";
      // loading.value = false;
      // visible.value = true;
      isJudgeLoading.value = false;
      message.success("代码已保存成功");
    }
  }, 1000); // 每秒执行一次，间隔时间为 1000 毫秒
};
const resultData = ref([
  {
    label: "执行用时",
    value: "",
  },
  {
    label: "内存消耗",
    value: "",
  },
  {
    label: "执行结果",
    value: "",
  },
  {
    label: "通过用例",
    value: 0,
  },
]);
// 判题加载中标志
const isJudgeLoading = ref(false);

// 时间到处理 自动提交作答
const handleTimeOut = () => {
  doSubmit(true);
};

onMounted(() => {
  console.log("用户进入了赛场");
});
onBeforeUnmount(() => {
  // localStorage.removeItem("pk");
  console.log("用户离开了赛场");
  // 监听 window 的 blur 事件
  window.removeEventListener("blur", onUserLeaveDebounced);
  window.removeEventListener("focus", onUserBackDebounced);
});

// document.addEventListener("visibilitychange", function () {
//   if (document.hidden) {
//     // 当页面失去焦点时执行的操作
//     console.log("页面失去焦点，执行特定操作");
//   } else {
//     // 当页面重新获得焦点时执行的操作
//     console.log("页面重新获得焦点");
//   }
// });
// 用户离开界面处理
const onUserLeave = () => {
  // 判断焦点移出页面
  if (!document.hasFocus()) {
    // 执行你想要的操作
    message.warning("你已离开了比赛界面，离开3次或时间过长将自动交卷！");
  }
};
// 用户回到界面处理
const onUserBack = () => {
  // 判断焦点移出页面
  if (document.hasFocus()) {
    // 执行你想要的操作
    // message.warning("你已离开了比赛界面，离开3次或时间过长将自动交卷！");
  }
};
// 使用 lodash 的 debounce 函数创建一个防抖函数
const onUserBackDebounced = _.debounce(onUserBack, 500);
const onUserLeaveDebounced = _.debounce(onUserLeave, 500);
// 监听 window 的 blur 事件
window.addEventListener("blur", onUserLeaveDebounced);
window.addEventListener("focus", onUserBackDebounced);
// const router = useRouter();
// router.beforeEach((to, from, next) => {
//   if (to.name !== "/txing/match/online/pk") {
//     // 进入目标页面时执行的操作
//     console.log("用户离开了赛场");
//   } else {
//     console.log("用户进入了赛场");
//   }
//   next();
// });
// onBeforeRouteLeave((to, from, next) => {
//   if (to.name !== "/txing/match/online/pk") {
//     // 进入目标页面时执行的操作
//     console.log("用户离开了赛场");
//   }
//   next();
// });
// onBeforeRouteUpdate((to, from, next) => {
//   if (to.name !== "/txing/match/online/pk") {
//     // 进入目标页面时执行的操作
//     console.log("用户离开了赛场 update");
//   }
//   next();
// });
</script>
