<!--
* @DoWeekMatchView
* @author Li zhiwei
* @date 2024/2/4 9:42
-->

<template>
  <a-spin :loading="isLoading" tip="请稍等，正在排队发放试题..." dot>
    <div id="DoWeekMatchView">
      <!--    头部区域-->
      <div class="header">
        <a-row
          class="grid-demo"
          :style="{
            height: '50px',
          }"
        >
          <a-col
            flex="20%"
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
                justify-content: space-between;
                color: #979797;
              "
            >
              <a-popconfirm
                content="确认要放弃本场比赛吗"
                position="bl"
                @ok="onGiveUpMatch"
              >
                <div
                  style="
                    display: flex;
                    align-items: center;
                    column-gap: 5px;
                    cursor: pointer;
                  "
                >
                  <svg-icon icon="back1" size="25px" />
                  <span>放弃竞赛</span>
                </div>
              </a-popconfirm>
              <div
                style="
                  height: 100%;
                  margin-left: 10px;
                  display: flex;
                  align-items: center;
                  column-gap: 10px;
                "
              >
                <div
                  v-for="i in 5"
                  :style="{
                    border: `${
                      i === questionNo ? 'green' : '#979797'
                    } solid 1px`,
                    borderRadius: '50%',
                    height: '30px',
                    width: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }"
                  :key="i"
                  @click="onSelectQuestion(i)"
                >
                  {{ i }}
                </div>
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
                font-size: 20px;
              "
            >
              <span
                >{{ matchDetailData?.name
                }}{{ isSimulate ? "(模拟)" : "" }}</span
              >
            </div>
          </a-col>
          <a-col flex="20%" style="height: 100%">
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
              <a-popconfirm
                content="确认要交卷吗?"
                type="success"
                @ok="submitAll"
              >
                <a-button type="outline" status="success" shape="round"
                  >交卷
                </a-button>
              </a-popconfirm>
              <a-countdown
                v-if="!isLoading"
                :value="
                  isSimulate
                    ? new Date(matchDetailData?.simulateStartTime).setHours(
                        new Date(
                          matchDetailData?.simulateStartTime
                        ).getHours() + 2
                      )
                    : Date.parse(matchDetailData?.endTime)
                "
                :now="Date.now()"
                @finish="handleTimeOut"
              />
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
                  `${(
                    question?.judgeConfig.memoryLimit /
                    (1024 * 1024)
                  ).toFixed(2)} MB`
                }}
              </a-descriptions-item>
            </a-descriptions>
            <MdViewer :value="question?.content || ''" />
            <!--          <div id="questionFavourId">-->
            <!--            <icon-star-fill v-if="isFavour" :size="30" @click="clickFavour" />-->
            <!--            <icon-star v-else :size="30" @click="clickFavour"></icon-star>-->
            <!--            <span style="margin-left: 5px">收藏</span>-->
            <!--          </div>-->
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
                    :model="{}"
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
                        @change="languageChange"
                      >
                        <a-option>java</a-option>
                        <a-option>c</a-option>
                        <!--                      <a-option>go</a-option>-->
                        <a-option>python</a-option>
                        <a-option>javascript</a-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                  <CodeEditor
                    :key="codeEditorKey"
                    ref="codeEditorRef"
                    :value="code"
                    :language="language"
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
                      <!--                      <a-button type="outline" status="success">运行</a-button>-->
                      <a-button
                        type="outline"
                        status="success"
                        @click="submitSingle"
                        shape="round"
                        >提交并保存
                      </a-button>
                      <a-button
                        :disabled="questionNo === 5"
                        type="outline"
                        status="success"
                        shape="round"
                        @click="onSelectQuestion(questionNo + 1)"
                        >下一题
                      </a-button>
                    </div>
                  </div>
                  <hr />
                  <div class="exec-area-result">
                    <!--                    <div-->
                    <!--                      id="execResultDiv"-->
                    <!--                      v-if="resultData.get(questionNo) !== undefined"-->
                    <!--                    >-->
                    <!--                      &lt;!&ndash;                      resultData.get(questionNo)[0]?.value != ''&ndash;&gt;-->
                    <!--                      <a-descriptions-->
                    <!--                        style="margin-top: 20px"-->
                    <!--                        :data="resultData.get(questionNo)"-->
                    <!--                        :column="1"-->
                    <!--                      />-->
                    <!--                    </div>-->
                    <div
                      id="execResultDiv"
                      v-if="resultData.get(questionNo) !== undefined"
                    >
                      <!--                      resultData.get(questionNo)[0]?.value != ''-->
                      <div>
                        <a-descriptions
                          :data="
                            resultData.get(questionNo)[2].value == '完全通过'
                              ? resultData.get(questionNo)
                              : resultData.get(questionNo).slice(2)
                          "
                          :column="1"
                        />
                        <div
                          v-if="resultDataOther.get(questionNo)?.lastExecCase"
                          style="padding-bottom: 8px"
                        >
                          <div
                            style="
                              font-size: 18px;
                              color: red;
                              font-weight: bold;
                              padding-right: 20px;
                            "
                          >
                            最后执行用例
                          </div>
                          <div
                            style="
                              background-color: rgba(230, 226, 226, 0.5);
                              padding: 5px 10px;
                              border-radius: 10px;
                              width: 100%;
                              margin-top: 10px;
                            "
                          >
                            输入用例：{{
                              resultDataOther.get(questionNo)?.lastExecCase
                                .input
                            }}
                            期望输出：{{
                              resultDataOther.get(questionNo)?.lastExecCase
                                .output
                            }}&nbsp;&nbsp;&nbsp;
                            <span
                              v-if="
                                resultData.get(questionNo)[2].value !=
                                '运行错误'
                              "
                              >实际输出：{{
                                resultDataOther.get(questionNo)?.lastExecCase
                                  .actualOutput
                              }}&nbsp;&nbsp;&nbsp;</span
                            >
                          </div>
                        </div>
                        <div
                          v-if="resultDataOther.get(questionNo)?.errorMsg"
                          style="padding-bottom: 8px"
                        >
                          <div
                            style="
                              font-size: 18px;
                              color: red;
                              font-weight: bold;
                              padding-right: 20px;
                            "
                          >
                            报错信息
                          </div>
                          <div
                            style="
                              background-color: rgba(230, 226, 226, 0.5);
                              padding: 5px 10px;
                              border-radius: 10px;
                              width: 100%;
                              margin-top: 10px;
                            "
                          >
                            <pre>{{
                              resultDataOther.get(questionNo)?.errorMsg
                            }}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </a-split>
          </div>
        </template>
      </a-split>
    </div>
  </a-spin>
</template>

<style lang="scss">
#DoWeekMatchView {
  //height: 100vh;
  width: 100vw;

  .header {
    height: 50px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }

  .arco-space-horizontal .arco-space-item {
    margin-bottom: 0 !important;
  }

  .exec-area-result {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
  }
}

.loading-container {
  position: relative;
}

.is-loading {
  background-color: rgba(109, 101, 101, 0.1) !important;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: rotateAnimation 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg); /* 从 0 度开始旋转 */
  }
  to {
    transform: rotate(360deg); /* 旋转到 360 度 */
  }
}
</style>

<script setup lang="ts">
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import SvgIcon from "@/icons/SvgIcon";
import { computed, onMounted, ref, toRaw, defineProps } from "vue";
import {
  MatchWeekAppControllerService,
  Question,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useWeekMatchStore } from "@/store/weekmatch";
import { useRoute, useRouter } from "vue-router";
import CodeInitConstant from "@/service/constant/CodeInitConstant";

const router = useRouter();
const route = useRoute();
const isSimulate = route.path.includes("simulate");
const props = defineProps(["matchId"]);
const isLoading = ref(true);
const matchDetailData = ref();
const codeEditorRef = ref();
const loadMatchDetailData = async () => {
  let res;
  if (isSimulate) {
    // 模拟
    res = await MatchWeekAppControllerService.startMatchUsingGet(props.matchId);
  } else {
    // 正式
    res = await MatchWeekAppControllerService.startMatchUsingGet();
  }
  if (res.code !== 0) {
    message.error("比赛数据加载失败：", res.msg);
    return;
  }
  if (isSimulate && res.data.id != props.matchId) {
    message.warning("你的上一场模拟赛还未完成 现在继续完成！");
  }
  matchDetailData.value = res.data;
  question.value = matchDetailData.value.questions[0];
  const questionIds = matchDetailData.value.questions.map((item: any) => {
    return item.id;
  });
  matchStore.initSubmits(questionIds);
  questionNo.value = 1;
  isLoading.value = false;
};

onMounted(async () => {
  await loadMatchDetailData();
  codeEditorKey.value = codeEditorKey.value + 1;
});

// 当前选中题号
const questionNo = ref<number>(-1);
const onSelectQuestion = (i: number) => {
  questionNo.value = i;
  question.value = matchDetailData.value.questions[i - 1];
  codeEditorKey.value = codeEditorKey.value + 1;
};

const question = ref<QuestionVO>();

// 作答记录
const matchStore = useWeekMatchStore();
const code = computed({
  get: () => {
    return matchStore.matchSubmits[questionNo.value - 1]?.code ?? "";
  },
  set: (val: any) => {
    matchStore.matchSubmits[questionNo.value - 1].code = val;
  },
});
const language = computed({
  get: () => {
    return matchStore.matchSubmits[questionNo.value - 1]?.language;
  },
  set: (val: any) => {
    matchStore.matchSubmits[questionNo.value - 1].language = val;
  },
});
const questionId = computed({
  get: () => {
    return matchStore.matchSubmits[questionNo.value - 1]?.questionId;
  },
  set: (val: any) => {
    matchStore.matchSubmits[questionNo.value - 1].questionId = val;
  },
});

const changeCode = (value: string) => {
  code.value = value;
};

// 提交单条题目
const submitSingle = async () => {
  if (
    code.value === undefined ||
    language.value === undefined ||
    questionId.value === undefined
  ) {
    message.warning("代码、编程语言、题目ID不得为空");
    return;
  }
  const res = await MatchWeekAppControllerService.submitSingleUsingPost({
    ...matchStore.matchSubmits[questionNo.value - 1],
    matchId: matchDetailData.value.id,
  });
  if (res.code !== 0) {
    message.error("提交失败 请稍后重试：" + res.message);
    return;
  }
  if (res.data == -1) {
    message.warning("代码无改动 无需重复提交");
    return;
  }
  isJudgeLoading.value = true;
  timer(res.data);
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
      if (resultData.value.get(questionNo.value) === undefined) {
        resultData.value.set(questionNo.value, getResultColumn());
      }
      if (resultDataOther.value.get(questionNo.value) === undefined) {
        resultDataOther.value.set(questionNo.value, {});
      }
      resultData.value.get(questionNo.value)[0].value = `${data.time} MS`;
      resultData.value.get(questionNo.value)[1].value = `${(
        data.memory / 1024
      ).toFixed(2)} MB`;
      resultData.value.get(questionNo.value)[2].value = data.message;
      resultData.value.get(questionNo.value)[3].value =
        (data.acceptedRate * 100).toFixed(2) + "%";
      // loading.value = false;
      // visible.value = true;
      isJudgeLoading.value = false;
      resultDataOther.value.get(questionNo.value)["errorMsg"] = data.errorMsg;
      resultDataOther.value.get(questionNo.value)["lastExecCase"] =
        data.lastExecCase;
      message.success("代码已保存成功");
    }
  }, 1000); // 每秒执行一次，间隔时间为 1000 毫秒
};

const getResultColumn = () => {
  return [
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
  ];
};

const resultData = ref<Map<number, any>>(new Map([]));
const resultDataOther = ref<Map<number, any>>(new Map([]));

// 判题加载中标志
const isJudgeLoading = ref(false);
const codeEditorKey = ref(1);
// 报错消息
let errorMsg = "";
let lastExecCase = "";

// 编程语言发生改变
const languageChange = (language: string) => {
  if (
    code.value == CodeInitConstant.JAVA ||
    code.value == CodeInitConstant.JAVASCRIPT ||
    code.value == CodeInitConstant.PYTHON ||
    code.value == CodeInitConstant.C ||
    code.value == ""
  ) {
    const codeInit = CodeInitConstant.getCodeInit(language);
    code.value = codeInit;
    codeEditorKey.value = codeEditorKey.value + 1;
  }
};

/**
 * 交卷
 */
const submitAll = async () => {
  const res = await MatchWeekAppControllerService.submitAllUsingPost({
    matchId: matchDetailData.value.id,
    submits: toRaw(matchStore.matchSubmits),
  });
  // console.log("最终作答：", {
  //   matchId: matchDetailData.value.id,
  //   submits: toRaw(matchStore.matchSubmits),
  // });
  if (res.code !== 0) {
    message.error("提交失败，请稍后重试！");
    return;
  }
  matchStore.resetMatchSubmits();
  let path = "";
  if (isSimulate) {
    path = "/txing/match/simulate/result/" + res.data;
  } else {
    path = "/txing/match/submit/success";
  }
  router.push({
    path: path,
    // query: {
    //   joinId: res.data,
    // },
  });
};
// 时间到自动交卷
const handleTimeOut = () => {
  submitAll();
  matchStore.resetMatchSubmits();
};
// 放弃比赛
const onGiveUpMatch = async () => {
  const res = await MatchWeekAppControllerService.giveUpMatchUsingGet(
    matchDetailData.value.id
  );
  if (res.code != 0) {
    message.error(res.msg + ", 请刷新重试！");
    return;
  }
  message.success("已成功放弃本场比赛");
  matchStore.resetMatchSubmits();
  router.push({
    path: "/txing/match/center",
  });
};
</script>
