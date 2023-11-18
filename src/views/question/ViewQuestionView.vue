<template>
  <div id="ViewQuestionView">
    <a-spin :loading="loading" tip="判题中...">
      <a-row :gutter="[24, 24]">
        <a-col :md="12" :xs="24">
          <a-tabs
            type="card-gutter"
            :editable="true"
            @add="handleAdd"
            @delete="handleDelete"
            :show-add-button="false"
            default-active-key="question"
            :active-key="activeKey"
            style="max-width: 100vh"
            @tabClick="tabClick"
          >
            <a-tab-pane :closable="false" key="question" title="题目">
              <a-card v-if="question" :title="question.title">
                <a-descriptions
                  title="题目限制"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig.stackLimit ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ''" />
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(tag, index) of question.tags"
                      :key="index"
                      color="green"
                      >{{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-tab-pane>
            <a-tab-pane :closable="false" key="commnet" title="评论">
              <div>
                <a-scrollbar style="height: 56vh; overflow: auto">
                  <a-comment
                    v-for="(item, index) of commentData"
                    :key="item.id"
                    :author="item.userName"
                    :datetime="item.createTime"
                    align="right"
                  >
                    <template #actions>
                      <span
                        class="action"
                        key="heart"
                        @click="onLikeChange(index)"
                      >
                        <span v-if="item.isFavour">
                          <IconHeartFill :style="{ color: '#f53f3f' }" />
                        </span>
                        <span v-else>
                          <IconHeart />
                        </span>
                        <!--                        {{ 83 + (like ? 1 : 0) }}-->
                        {{ item.favourNum }}
                      </span>
                    </template>
                    <template #avatar>
                      <a-avatar>
                        <img alt="avatar" :src="item.userAvatar" />
                      </a-avatar>
                    </template>
                    <template #content>
                      <div>
                        {{ item.content }}
                      </div>
                    </template>
                  </a-comment>
                </a-scrollbar>
                <div id="commentInput">
                  <a-textarea
                    style="height: 100px"
                    placeholder="快来发表一下评论吧 注意要友好哦！"
                    allow-clear
                    v-model="commentText"
                  />
                  <a-divider size="0" />
                  <a-button
                    type="primary"
                    status="success"
                    style="float: right"
                    @click="publishComment"
                    >发表评论
                  </a-button>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane :closable="false" key="answer" title="答案">
              <a-card v-if="question" :title="question.title">
                <MdViewer :value="question.answer || ''" />
              </a-card>
            </a-tab-pane>
            <a-tab-pane :closable="false" key="submitRecord" title="提交记录">
              <SubmitRecordView
                :question-id="props.id"
                :click-row="clickSubmitRecord"
              ></SubmitRecordView>
            </a-tab-pane>
            <a-tab-pane
              v-for="(item, index) of data"
              :key="index"
              :title="item.title"
            >
              <!--              {{ item?.content }}-->
              <component
                :is="item.component"
                :questionSubmitDatail="submitRecordDetail"
              />
            </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form :model="form" layout="inline">
            <a-form-item
              field="title"
              label="编程语言"
              style="min-width: 240px"
            >
              <a-select
                v-model="form.language"
                :style="{ width: '320px' }"
                placeholder="选择语言"
              >
                <a-option>java</a-option>
                <a-option>cpp</a-option>
                <a-option>go</a-option>
              </a-select>
            </a-form-item>
          </a-form>
          <CodeEditor
            :value="form.code as string"
            :language="form.language"
            :handleChange="changeCode"
          />
          <a-divider size="0" />
          <a-button type="primary" style="min-width: 200px" @click="doSubmit"
            >提交代码
          </a-button>
        </a-col>
      </a-row>
    </a-spin>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title> 执行结果</template>
    <div>
      <a-descriptions
        style="margin-top: 20px"
        :data="resultData"
        :size="size"
        :column="1"
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {
  IconHeartFill,
  IconStarFill,
  IconHeart,
  IconStar,
  IconMessage,
} from "@arco-design/web-vue/es/icon";
import {
  onMounted,
  ref,
  watchEffect,
  withDefaults,
  defineProps,
  reactive,
} from "vue";
import {
  JudgeConfig,
  PageVO,
  Question,
  QuestionCommentControllerService,
  QuestionControllerService,
  QuestionSubmitControllerService,
  QuestionSubmitDoRequest,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import moment from "moment/moment";
import SubmitRecordView from "@/components/question/SubmitRecordView.vue";
import SubmitDetailView from "@/components/question/SubmitDetailView.vue";

const question = ref<QuestionVO>();
onMounted(async () => {
  console.log("ViewQuestionView.vue执行了");
  await loadData();
  await loadCommentData();
});

/**
 * 提交记录详情
 */
let submitRecordDetail = reactive({
  createTime: "2020-12-23",
  exceedPercent: 75,
  id: 0,
  times: 1000,
  memory: 1000,
  result: "成功",
  status: "等待中",
  code: "helloword",
  language: "Java",
  title: "数组求和",
});

/**
 * 提交记录相关
 */
const submitRecordData = reactive([
  {
    createTime: "",
    exceedPercent: 75,
    id: 0,
    times: 1000,
    memory: 1000,
    result: "成功",
    status: "等待中",
  },
]);
// 点击提交记录
const clickSubmitRecord = async (record: any) => {
  // 向后端请求提交详细数据
  const res = await QuestionSubmitControllerService.infoUsingGet2(record.id);
  if (res.code != 0) {
    message.error("数据请求失败 请稍后再试！");
    return;
  }
  submitRecordDetail = res.data;
  // 添加新标签页（跳转）
  const newTab = {
    key: record.id,
    title: "提交",
    component: SubmitDetailView,
  };
  if (data[0]?.title === "Tab 2") {
    data.splice(0);
  }
  data.push(newTab);
  activeKey.value = data.length - 1;
  // 展示详细信息（包括代码等）
};

/**
 * 评论区相关
 */
let commentData = ref([
  {
    id: 10,
    userName: "lemon",
    userAvatar:
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
    content: "nice",
    favourNum: 10,
    createTime: "1天前",
    isFavour: true,
  },
]);
const onLikeChange = (index: number) => {
  commentData.value[index].isFavour = !commentData.value[index].isFavour;
  if (commentData.value[index].isFavour) {
    commentData.value[index].favourNum = commentData.value[index].favourNum + 1;
  } else {
    commentData.value[index].favourNum = commentData.value[index].favourNum - 1;
  }
};
// 加载评论数据
const searchCommentParams = ref<PageVO>({
  filter: [
    {
      fieldName: "questionId",
      queryType: "eq",
      value: question.value?.id + "",
    },
  ],
  page: {
    current: 1,
    pageSize: 200,
  },
  // sorts: [
  //   {
  //     isAsc: true,
  //     sortName: "",
  //   },
  // ],
});
const loadCommentData = async () => {
  console.log("加载评论数据");
  console.log(question.value?.id);
  const questionId = question.value?.id;
  const res = await QuestionCommentControllerService.listUsingPost({
    ...searchCommentParams.value,
    filter: [
      {
        fieldName: "questionId",
        queryType: "eq",
        value: question.value?.id?.toString(),
      },
    ],
  });
  if (res.code == 0) {
    const newArray = res.data.list.map((item: any) => {
      item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:SS");
      return item;
    });
    // 先清空
    commentData.value.splice(0);
    commentData.value = commentData.value.concat(newArray);
    console.log("加载成功，", res);
  } else {
    message.error("评论数据加载失败！");
  }
};
// 发表评论
const commentText = ref<string>("");
const publishComment = async () => {
  if (commentText.value === "") {
    message.info("请输入评论内容");
    return;
  }
  const res = await QuestionCommentControllerService.saveUsingPost({
    content: commentText.value,
    questionId: question.value?.id,
  });
  if (res.code == 0) {
    message.info("评论发表成功");
    commentText.value = "";
    loadCommentData();
  } else {
    message.error("评论发表失败 请稍后重试！");
  }
};

/**
 * 标签页相关
 */
let count = 5;
let activeKey = ref<any>("question");
const tabClick = (key: any) => {
  // if (key === "submitRecord") {
  //   // 向后端请求提交记录数据
  //   QuestionSubmitControllerService.listUsingPost2()
  // }
  activeKey.value = key;
};
// 标签页元数据
let data = reactive([]);

// const getComponent = (item: any) => {
//   return item; // 或者返回其他默认组件
// };

// const handleAdd = () => {
//   const number = count++;
//   data.value = data.value.concat({
//     key: `${number}`,
//     title: `New Tab ${number}`,
//     content: `Content of New Tab Panel ${number}`,
//   });
// };
const handleDelete = (key: number) => {
  // data = data.filter((item) => item.key !== key);
  data.splice(key, 1);
};

/**
 * 判题结果对话框相关
 */
const visible = ref(false);
const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  resultData[0].value = "";
  resultData[1].value = "";
  resultData[2].value = "";
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};

const resultData = [
  {
    label: "time",
    value: "",
  },
  {
    label: "memory",
    value: "",
  },
  {
    label: "message",
    value: "",
  },
];

const form = ref<QuestionSubmitDoRequest>({
  language: "java",
  code: "",
});

const changeCode = (value: string) => {
  console.log(value);
  form.value.code = value;
};

var loading = ref<boolean>(false);

/**
 * 提交代码
 */
const doSubmit = async () => {
  loading.value = true;
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败 请稍后重试：" + res.message);
  }
  timer(res.data);
};

let execResult = ref<JudgeConfig>({});

// 定时器 查询代码执行结果
const timer = (sumbitId: number) => {
  let i = 0;
  const intervalId = setInterval(async () => {
    // 在这里执行每秒要执行的任务
    console.log("定时器执行中...");
    const res = await QuestionSubmitControllerService.getExecResultUsingGet(
      sumbitId
    );
    console.log("res.data:", res);
    // 检查满足条件的逻辑
    if (res.data != "{}") {
      // 条件满足，清除定时器
      clearInterval(intervalId);
      console.log("执行结果：", res.data);
      const data = JSON.parse(res.data);
      resultData[0].value = data.time;
      resultData[1].value = data.memory;
      resultData[2].value = data.message;
      loading.value = false;
      visible.value = true;
    }
  }, 1000); // 每秒执行一次，间隔时间为 1000 毫秒
};

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载题目数据失败:" + res.message);
  }
};

/**
 * 只要页号等变量发生改变时 就会触发loadData的调用 获取到当前页对应的数据
 */
watchEffect(() => {
  loadData();
});

const scrollTo = (num: number) => {
  alert(num);
  console.log(num);
};
</script>

<style>
#ViewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  padding-right: 10px;
  padding-left: 10px;
}

#ViewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}

/*评论输入框*/
#commentInput {
  /*position: absolute;*/
  bottom: 0;
  width: 100%;
  margin-top: 20px;
}
</style>
