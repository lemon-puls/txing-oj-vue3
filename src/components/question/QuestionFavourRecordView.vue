<template>
  <div id="QuestionFavourRecordViewId">
    <a-table
      id="favourRecordTableId"
      style="max-width: 90%; margin: 0 auto"
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
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
            >{{ tag }}
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
                    %`
        }}
      </template>
      <template #cancelFavour="{ record }">
        <a-popconfirm
          content="确认要取消收藏吗?"
          @ok="clickCancelFavour(record)"
        >
          <a-button status="warning">cancel</a-button>
        </a-popconfirm>
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
  QuestionControllerService,
  QuestionFavourControllerService,
  QuestionSubmitControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
// import router from "@/router";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  loadData();
});

// onActivated(() => {
//   console.log("SubmitRecordView.vue执行了");
//   // loadRecordData();
// });

// interface Props {
//   clickRow: (record: any) => void;
// }

// const props = withDefaults(defineProps<Props>(), {
//   clickRow: (record: any) => {
//     console.log("触发默认实现", record);
//     const router = useRouter();
//     router.push({ path: `/view/question/${record.id}` });
//   },
// });
/**
 * 前往题目详情页
 */
const clickRow = (record: any) => {
  router.push({ path: `/view/question/${record.id}` });
};

let data = ref([]);
const total = ref(0);
const columns = [
  // {
  //   title: "题号",
  //   dataIndex: "id",
  // },
  {
    title: "题目名称",
    dataIndex: "title",
    width: 200,
  },
  {
    title: "标签",
    slotName: "tags",
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
    title: "通过率",
    slotName: "acRate",
  },
  {
    title: "取消",
    slotName: "cancelFavour",
  },
];

const searchParams = ref<PageVO>({
  // pageSize: 10,
  // current: 1,
  // title: "",
  // tags: [],

  // filter: [
  //   {
  //     fieldName: "tags",
  //     queryType: "like",
  //     value: "",
  //   },
  // ],
  page: {
    current: 1,
    pageSize: 1,
  },
  // sorts: [
  //   {
  //     isAsc: true,
  //     sortName: "",
  //   },
  // ],
});

// 加载当前用户收藏记录
const loadData = async () => {
  const res = await QuestionFavourControllerService.listUsingPost2(
    searchParams.value
  );
  if (res.code === 0) {
    data.value = res.data.list;
    total.value = res.data.total;
  } else {
    message.error("加载收藏数据失败:" + res.msg);
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
      pageSize: 1,
    },
  };
};

/**
 * 取消收藏
 */
const clickCancelFavour = (record: any) => {
  console.log(record);
};
</script>

<style>
#QuestionFavourRecordViewId {
  padding-bottom: 30px;
}

#favourRecordTableId .arco-table-th {
  background: #fcf743 !important;
}
</style>
