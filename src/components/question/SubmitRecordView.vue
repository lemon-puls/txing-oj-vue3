<template>
  <div id="submitRecordViewId">
    <a-table
      id="submitRecordTableId"
      style="max-width: 100%; margin: 0 auto"
      :columns="columns"
      :data="data"
      :row-key="id"
      @rowClick="clickRow"
      :pagination="{
        pageSize: searchParams.page.pageSize,
        current: searchParams.page.current,
        total,
        showTotal: true,
      }"
      @pageChange="onPageChange"
    >
      <template #exceedPercent="{ record }">
        {{ `${record.exceedPercent * 100} %` }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onActivated,
  onMounted,
  reactive,
  ref,
  watchEffect,
  withDefaults,
} from "vue";
import {
  PageVO,
  QuestionFavourControllerService,
  QuestionSubmitControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

onMounted(() => {
  console.log("SubmitRecordView.vue执行了");
  if (props.questionId !== 0) {
    searchParams.value.filter?.push({
      fieldName: "questionId",
      queryType: "eq",
      value: props.questionId + "",
    });
  }
  if (props.userId !== 0) {
    searchParams.value.filter?.push({
      fieldName: "userId",
      queryType: "eq",
      value: props.userId + "",
    });
  }
  loadData();
});

interface Props {
  // data: Array<object>;
  questionId: number;
  userId: number;
  clickRow: (record: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  questionId: () => 0,
  userId: () => 0,
  clickRow: (record: any) => {
    console.log("触发默认实现", record);
  },
});

let data = ref([]);
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
    slotName: "exceedPercent",
  },
  {
    title: "提交时间",
    dataIndex: "createTime",
    width: 170,
  },
];
// 分页查询参数
const total = ref(0);
const searchParams = ref<PageVO>({
  filter: [],
  page: {
    current: 1,
    pageSize: 10,
  },
  sorts: [
    // {
    //   isAsc: true,
    //   sortName: "",
    // },
  ],
});

// 加载提交记录
const loadData = async () => {
  const res = await QuestionSubmitControllerService.listUsingPost3(
    searchParams.value
  );
  if (res.code !== 0) {
    message.error("提交记录请求失败");
    return;
  } else {
    data.value = res.data.list;
    total.value = res.data.total;
  }
};
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
</script>

<style>
#submitRecordViewId {
  padding-bottom: 30px;
}

#submitRecordTableId .arco-table-th {
  background: #fcf743 !important;
}
</style>
