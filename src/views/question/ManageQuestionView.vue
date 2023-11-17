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
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #judgeCase="{ record }">
        <json-viewer
          :value="JSON.parse(record.judgeCase)"
          style="width: 100%; min-width: 3.125rem"
          :expand-depth="0"
          copyable
          boxed
          sort
        ></json-viewer>
      </template>
      <template #judgeConfig="{ record }">
        <a-space direction="vertical">
          <a-tag bordered color="orange"
            >{{ JSON.parse(record.judgeConfig).timeLimit }} ms
          </a-tag>
          <a-tag bordered color="blue"
            >{{ JSON.parse(record.judgeConfig).memoryLimit }} m
          </a-tag>
        </a-space>
      </template>
    </a-table>
  </div>
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
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "测试用例",
    slotName: "judgeCase",
  },
  {
    title: "判题配置",
    slotName: "judgeConfig",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
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
  console.log(question);
};

const router = useRouter();
/**
 * 修改题目
 * @param question
 */
const doUpdate = (question: Question) => {
  console.log(question);
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
