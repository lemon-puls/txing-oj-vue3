<template>
  <div id="manageQuestionView">
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.page.pageSize,
        current: searchParams.page.current,
        total,
        showTotal: true,
      }"
      :scroll="scrollPercent"
      :scrollbar="true"
      @page-change="onPageChange"
    >
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:SS") }}
      </template>
      <template #content="{ record }">
        <span v-if="record.content.length < 50">{{ record.content }}</span>
        <span v-else>{{ record.content.substr(0, 50) + " ..." }}</span>
      </template>
      <template #answer="{ record }">
        <span v-if="record.answer.length < 50">{{ record.answer }}</span>
        <span v-else>{{ record.answer.substr(0, 50) + " ..." }}</span>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #judgeCase="{ record }">
        <span
          v-if="record.judgeCase"
          style="color: #007bff"
          @click="handleClick(record)"
          >查看详情</span
        >
      </template>
      <template #judgeConfig="{ record }">
        <a-space size="small">
          <a-tag bordered color="orange"
            >{{ record.judgeConfig.timeLimit }} ms
          </a-tag>
          <a-tag bordered color="blue"
            >{{
              `${(record.judgeConfig.memoryLimit / (1024 * 1024)).toFixed(
                2
              )} MB`
            }}
          </a-tag>
        </a-space>
      </template>
      <template #acRate="{ record }">
        {{
          `${
            record.submitNum
              ? ((record.acceptedNum / record.submitNum) * 100).toFixed(2)
              : "0"
          }
                    % (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <template #tags="{ record }">
        <a-space wrap direction="horizonta">
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
    </a-table>
  </div>

  <a-modal v-model:visible="judgeCaseViewerVisible" draggable :footer="false">
    <template #title> 测试用例</template>
    <div>
      <json-viewer
        v-if="currentJudgeCase"
        :value="currentJudgeCase"
        style="width: 100%; min-width: 3.125rem"
        :expand-depth="3"
        copyable
        boxed
        sort
        theme="my-awesome-json-theme"
        :show-array-index="true"
      ></json-viewer>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  PageVO,
  Question,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<PageVO>({
  page: {
    current: 1,
    pageSize: 10,
  },
});

const loadData = async () => {
  const res = await QuestionControllerService.listForManagerUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.list;
    total.value = res.data.total;
  } else {
    message.error("加载题目数据失败:" + res.message);
  }
};
/**
 * 加载数据
 */
onMounted(() => {
  loadData();
});

// {
//     "id": "1",
//     "title": "两数之和",
//     "content": "求两个数之和",
//     "tags": null,
//     "answer": "10",
//     "submitNum": 0,
//     "acceptedNum": 0,
//     "judgeCase": null,
//     "judgeConfig": null,
//     "thumbNum": 0,
//     "favourNum": 0,
//     "userId": "1",
//     "createTime": "2023-10-18T13:16:44.000+00:00",
//     "updateTime": "2023-10-18T13:16:44.000+00:00",
//     "isDelete": 0
// }
const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id",
  //   fixed: "left",
  // },
  {
    title: "标题",
    dataIndex: "title",
    fixed: "left",
    width: 150,
    align: "center",
  },
  {
    title: "内容",
    slotName: "content",
    align: "center",
  },
  {
    title: "标签",
    slotName: "tags",
    align: "center",
  },
  {
    title: "答案",
    slotName: "answer",
    // width: 300,
    align: "center",
  },
  {
    title: "测试用例",
    slotName: "judgeCase",
    align: "center",
    width: 150,
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
    width: 200,
    align: "center",
  },
  // {
  //   title: "提交数",
  //   dataIndex: "submitNum",
  // },
  {
    title: "通过率",
    slotName: "acRate",
    width: 200,
    align: "center",
  },
  // {
  //   title: "通过数",
  //   dataIndex: "acceptedNum",
  // },
  {
    title: "收藏数",
    dataIndex: "favourNum",
    align: "center",
    width: 100,
  },
  // {
  //   title: "用户ID",
  //   dataIndex: "userId",
  // },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
    width: 200,
  },
  {
    title: "操作",
    slotName: "optional",
    fixed: "right",
    width: 150,
    align: "center",
  },
];

/**
 * 只要页号等变量发生改变时 就会触发loadData的调用 获取到当前页对应的数据
 */
watchEffect(() => {
  loadData();
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    page: {
      current: page,
      pageSize: 10,
    },
  };
};

/**
 * 删除题目
 * @param question
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionByIdsUsingPost([
    question.id as number,
  ]);
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败：" + res.message);
  }
};

const router = useRouter();
/**
 * 修改题目
 * @param question
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/txing/update/question",
    query: {
      id: question.id,
    },
  });
};

/**
 * 表格滚动
 */
const scrollPercent = {
  x: "180%",
  // y: "100%",
  // x: 2000,
  y: "100%",
};

/**
 * 测试用例查看对话框
 */
const judgeCaseViewerVisible = ref(false);
let currentJudgeCase = ref();
const handleClick = (record: any) => {
  currentJudgeCase.value = record.judgeCase;
  judgeCaseViewerVisible.value = true;
};
</script>

<style scoped>
#manageQuestionView {
  /*max-width: 1280px;*/
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  padding: 20px 20px;
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
}
</style>
