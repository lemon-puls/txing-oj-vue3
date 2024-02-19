<template>
  <div id="ViewQuestionView">
    <a-spin :loading="loading" tip="判题中..." style="min-width: 100%">
      <a-row :gutter="[24, 24]">
        <a-col :md="12" :xs="24">
          <a-tabs
            type="card-gutter"
            :editable="true"
            @delete="handleDelete"
            :show-add-button="false"
            default-active-key="question"
            :active-key="activeKey"
            style="max-width: 100vh"
            @tabClick="tabClick"
            :lazy-load="true"
            :animation="true"
          >
            <a-tab-pane :closable="false" key="question" title="题目">
              <a-card v-if="question" :title="question.title">
                <a-descriptions
                  title="题目限制"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig.timeLimit ?? 0 }} ms
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{
                      `${(
                        question.judgeConfig.memoryLimit /
                        (1024 * 1024)
                      ).toFixed(2)} MB`
                    }}
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ''" />
                <div id="questionFavourId">
                  <icon-star-fill
                    v-if="isFavour"
                    :size="30"
                    @click="clickFavour"
                  />
                  <icon-star v-else :size="30" @click="clickFavour"></icon-star>
                  <span style="margin-left: 5px">收藏</span>
                </div>
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
                <a-list
                  :max-height="300"
                  @reach-bottom="throttle"
                  :scrollbar="scrollbar"
                  :bordered="false"
                  :split="false"
                  style="width: 100%"
                >
                  <a-list-item
                    v-for="(item, index) of commentData"
                    :key="item.id"
                  >
                    <a-comment
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
                  </a-list-item>
                </a-list>
                <div id="commentInput">
                  <a-textarea
                    style="height: 100px"
                    placeholder="快来发表一下评论吧 注意要友好哦！"
                    allow-clear
                    v-model="commentText"
                    :max-length="{ length: 200, errorOnly: false }"
                    :show-word-limit="true"
                  />
                  <a-divider :size="0" />
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
            <a-tab-pane
              :closable="false"
              key="submitRecord"
              title="提交记录"
              :destroy-on-hide="true"
            >
              <SubmitRecordView
                :question-id="props.id"
                :user-id="Number(useUserStore().loginUser.id)"
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
                @change="onlanguagechange"
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
            :mystyle="{
              height: '70vh',
            }"
          />
          <a-divider :size="0" />
          <a-button type="primary" style="min-width: 200px" @click="doSubmit"
            >提交代码
          </a-button>
        </a-col>
      </a-row>
    </a-spin>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title> 执行结果</template>
    <div id="execResultDiv">
      <a-descriptions style="margin-top: 20px" :data="resultData" :column="1" />
      <h2 v-if="resultData[2].value === 'Accepted'">
        恭喜你 超越了
        <span :style="{ color: 'red' }">{{ exceedPercent * 100 }}%</span>
        的用户!
      </h2>
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
  QuestionFavourControllerService,
  QuestionSubmitControllerService,
  QuestionSubmitDoRequest,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import moment, { now } from "moment/moment";
import SubmitRecordView from "@/components/question/SubmitRecordView.vue";
import SubmitDetailView from "@/components/question/SubmitDetailView.vue";
import _ from "lodash";
import { useUserStore } from "@/store/user";

onMounted(async () => {
  await loadData();
  // await loadCommentData();
});

/**
 * 标签页相关
 */
// let count = 5;
let activeKey = ref<any>("question");
const tabClick = (key: any) => {
  // if (key === "commnet") {
  //   loadCommentData(1);
  // }
  activeKey.value = key;
};
// 标签页元数据
let data = reactive([]);
const handleDelete = (key: number) => {
  data.splice(key, 1);
  if (data.length > 0) {
    activeKey.value = data.length - 1;
  } else {
    activeKey.value = "submitRecord";
  }
};

/**
 * 题目标签页
 */
const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
// 加载题目数据
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
    isFavour.value = res.data.isFavour;
  } else {
    message.error("加载题目数据失败:" + res.message);
  }
};
// 点击收藏题目
let isFavour = ref(false);
const clickFavour = async () => {
  if (question.value?.id) {
    const res = await QuestionFavourControllerService.favourQuestionUsingGet(
      question.value.id
    );
    if (res.code !== 0) {
      message.error(res.msg);
      return;
    }
    isFavour.value = !isFavour.value;
    if (isFavour.value === true) {
      message.success("收藏成功");
    } else {
      message.success("已取消收藏");
    }
  } else {
    message.error("无法获取到当前题目信息 请刷新重试！");
    return;
  }
};

/**
 * 评论标签页相关
 */
interface commentEntity {
  id: number;
  userName: string;
  userAvatar: string;
  content: string;
  favourNum: number;
  createTime: string;
  isFavour: boolean;
}

let commentData = ref<Array<commentEntity>>([
  // {
  //   id: 10,
  //   userName: "lemon",
  //   userAvatar:
  //     "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
  //   content: "nice",
  //   favourNum: 10,
  //   createTime: "1天前",
  //   isFavour: true,
  // },
]);
const onLikeChange = async (index: number) => {
  const res =
    await QuestionCommentControllerService.thumbQuestionCommentUsingGet1(
      commentData.value[index].id,
      question.value?.id
    );
  if (res.code != 0) {
    message.error(res.msg);
  }
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
    pageSize: 10,
  },
  // sorts: [
  //   {
  //     isAsc: true,
  //     sortName: "",
  //   },
  // ],
});
const loadCommentData = async (current: number) => {
  const questionId = question.value?.id;
  const res = await QuestionCommentControllerService.listUsingPost1({
    ...searchCommentParams.value,
    filter: [
      {
        fieldName: "questionId",
        queryType: "eq",
        value: question.value?.id?.toString(),
      },
    ],
    page: {
      current: current,
      pageSize: 10,
    },
  });
  if (res.code == 0) {
    // const newArray = res.data.list.map((item: any) => {
    //   console.log(item.createTime);
    //   item.createTime = moment(item.createTime).format("yyyy-MM-dd HH:mm:ss");
    //   return item;
    // });
    // 先清空
    // commentData.value.splice(0);
    // commentData.value = commentData.value.concat(newArray);
    return res;
  } else {
    message.error("评论数据加载失败！");
    return null;
  }
};
// 发表评论
const commentText = ref<string>("");
const publishComment = async () => {
  if (commentText.value === "") {
    message.info("请输入评论内容");
    return;
  }
  const res = await QuestionCommentControllerService.saveUsingPost1({
    content: commentText.value,
    questionId: question.value?.id,
  });
  if (res.code == 0) {
    message.info("评论发表成功");
    commentText.value = "";
    // loadCommentData();
    // 添加到数组头
    commentData.value.unshift(res.data);
    // 如果原本没有评论数据 此时发表第一条评论 需要改变 bottom，以免显示 空状态
    if (commentData.value.length === 1) {
      bottom.value = 1;
    }
  } else {
    message.error("评论发表失败 请稍后重试！");
  }
};
// 采用列表展示评论
const current = ref(0);
const pageCount = ref(-1);
const bottom = ref(0);
const scrollbar = ref(true);

const fetchData = async () => {
  if (
    (pageCount.value === -1 || current.value < pageCount.value) &&
    bottom.value === 0
  ) {
    current.value++;
    const res = await loadCommentData(current.value);
    if (res == null) {
      return;
    }
    if (res.data.total === 0) {
      bottom.value = 2;
      return;
    }
    // 剔除可能的重复评论
    let targetData;
    if (commentData.value.length !== 0) {
      targetData = res.data.list.filter(
        (item: any) =>
          item.createTime <=
          commentData.value[commentData.value.length - 1].createTime
      );
    } else {
      targetData = res.data.list;
    }
    commentData.value = commentData.value.concat(targetData);
    pageCount.value = res.data.pageCount;
    if (pageCount.value === current.value) {
      bottom.value = 1;
    }
    // console.log(
    //   "总页数：",
    //   pageCount.value,
    //   "当前页：",
    //   current.value,
    //   "res:",
    //   res.data.list,
    //   "targetData:",
    //   targetData,
    //   "commentData:",
    //   commentData.value
    // );
  } else {
    bottom.value = 1;
  }
};
const throttle = _.throttle(fetchData, 3000); //引入lodash功能

/**
 * 提交记录标签页相关
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
// 点击提交记录
const clickSubmitRecord = async (record: any) => {
  // 向后端请求提交详细数据
  const res = await QuestionSubmitControllerService.infoUsingGet2(record.id);
  if (res.code != 0) {
    message.error("数据请求失败 请稍后再试！");
    return;
  }
  submitRecordDetail = res.data;
  if (res.data.exceedPercent == null || res.data.exceedPercent < 0) {
    submitRecordDetail.exceedPercent = -1;
  }
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
// 超越了多少百分比的用户
let exceedPercent = ref(0);

/**
 * 提交代码相关
 */
var loading = ref<boolean>(false);
const form = ref<QuestionSubmitDoRequest>({
  language: "java",
  code:
    "import java.util.*;\n" +
    "/**\n" +
    " * @author " +
    useUserStore().loginUser.userName +
    "\n" +
    " * @date " +
    moment(now()).format("YYYY-MM-DD HH:mm:ss") +
    "\n" +
    " */\n" +
    "public class Main {\n" +
    "\n" +
    "    public static void main(String[] args) {\n" +
    "        // 请开始您的作答\n" +
    "        Scanner scanner = new Scanner(System.in);\n" +
    "    \n" +
    "    }\n" +
    "}",
});
const changeCode = (value: string) => {
  form.value.code = value;
};
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
// 编程语言选项值发生改变
const onlanguagechange = (value: string) => {
  if (value !== "java") {
    message.info("目前判题系统仅支持Java语言 对其他语言的支持正在开发中...");
  }
};
let execResult = ref<JudgeConfig>({});
// 定时器 查询代码执行结果
const timer = (sumbitId: number) => {
  let i = 0;
  const intervalId = setInterval(async () => {
    // 在这里执行每秒要执行的任务
    const res = await QuestionSubmitControllerService.getExecResultUsingGet(
      sumbitId
    );
    // 检查满足条件的逻辑
    if (res.data != "{}") {
      // 条件满足，清除定时器
      clearInterval(intervalId);
      const data = JSON.parse(res.data);
      resultData[0].value = `${data.time} MS`;
      resultData[1].value = `${(data.memory / (1024 * 1024)).toFixed(2)} MB`;
      resultData[2].value = data.message;
      resultData[3].value = (data.acceptedRate * 100).toFixed(2) + "%";
      exceedPercent = data.exceedPercent;
      loading.value = false;
      visible.value = true;
    }
  }, 1000); // 每秒执行一次，间隔时间为 1000 毫秒
};

// const scrollTo = (num: number) => {
//   alert(num);
//   console.log(num);
// };

/**
 * 只要页号等变量发生改变时 就会触发loadData的调用 获取到当前页对应的数据
 */
// watchEffect(() => {
//   loadData();
// });
// const submitRecordData = reactive([
//   {
//     createTime: "",
//     exceedPercent: 75,
//     id: 0,
//     times: 1000,
//     memory: 1000,
//     result: "成功",
//     status: "等待中",
//   },
// ]);
</script>

<style>
#ViewQuestionView {
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;
}

/*#ViewQuestionView .arco-list-wrapper {*/
/*  overflow: hidden;*/
/*  height: 30vw;*/
/*}*/

#ViewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

/*去除标签页边框*/
#ViewQuestionView .arco-tabs-type-card-gutter > .arco-tabs-content {
  border: 0;
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

#execResultDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#questionFavourId {
  display: flex;
  align-items: center;
  justify-content: right;
  font-weight: bold;
}

#questionFavourId > .arco-icon {
  color: #ff7300;
}

/*改变 加载中 图标位置*/
#ViewQuestionView .arco-spin-mask-icon {
  top: 50vh;
}
</style>
