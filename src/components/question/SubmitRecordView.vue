<template>
  <a-table
    style="max-width: 90vh"
    :pagination="false"
    :columns="columns"
    :data="data"
    :row-key="id"
    @rowClick="clickRow"
    :scroll="scrollPercent"
    :scrollbar="true"
  />
</template>

<script setup lang="ts">
import {
  defineProps,
  onActivated,
  onMounted,
  reactive,
  ref,
  withDefaults,
} from "vue";
import { PageVO, QuestionSubmitControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

onMounted(() => {
  console.log("SubmitRecordView.vue执行了");
  loadRecordData();
});

// onActivated(() => {
//   console.log("SubmitRecordView.vue执行了");
//   // loadRecordData();
// });

interface Props {
  // data: Array<object>;
  questionId: number;
  clickRow: (record: any) => void;
  scrollX: any;
  scrollY: any;
}

const props = withDefaults(defineProps<Props>(), {
  questionId: () => 0,
  clickRow: (record: any) => {
    console.log("触发默认实现", record);
  },
  scrollX: () => "120%",
  scrollY: () => 370,
});

/**
 * 滚动
 */
const scrollPercent = {
  x: props.scrollX,
  // y: "100%",
  // x: 2000,
  y: props.scrollY,
};

let data = ref([
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
const columns = [
  // {
  //   title: "id",
  //   dataIndex: "id",
  // },
  {
    title: "题目",
    dataIndex: "title",
    // ellipsis: true,
    // width: 150,
  },
  {
    title: "判题状态",
    dataIndex: "status",
    // tooltip: { position: "left" },
    // width: 200,
  },
  {
    title: "判题结果",
    dataIndex: "result",
  },
  {
    title: "排行",
    dataIndex: "exceedPercent",
  },
  {
    title: "提交时间",
    dataIndex: "createTime",
    width: 180,
  },
];

const listRecordsParams = ref<PageVO>({
  filter: [
    {
      fieldName: "questionId",
      queryType: "eq",
      value: props.questionId + "",
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

// 加载提交记录
const loadRecordData = async () => {
  let params;
  if (props.questionId == 0) {
    params = {
      page: {
        current: 1,
        pageSize: 200,
      },
    };
  } else {
    params = {
      filter: [
        {
          fieldName: "questionId",
          queryType: "eq",
          value: props.questionId + "",
        },
      ],
      page: {
        current: 1,
        pageSize: 200,
      },
    };
  }
  const res = await QuestionSubmitControllerService.listUsingPost2(params);
  if (res.code != 0) {
    message.error("提交记录请求失败");
    return;
  } else {
    data.value.splice(0);
    data.value = data.value.concat(res.data.list);
    console.log("---", data.value);
  }
};
</script>

<style scoped></style>
