<template>
  <div id="questionsView">
    <a-carousel
      :autoPlay="true"
      animation-name="card"
      show-arrow="never"
      indicator-position="outer"
      :style="{
        width: '100%',
        height: '240px',
      }"
    >
      <a-carousel-item
        :key="image"
        v-for="image in images"
        :style="{ width: '60%' }"
      >
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
        />
      </a-carousel-item>
    </a-carousel>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="关键词" style="min-width: 240px">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入检索关键词..."
        />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入检索标签..."
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">查询</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
        showTotal: true,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)">GO</a-button>
        </a-space>
      </template>

      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acRate="{ record }"
        >{{
          `${record.submitNum ? record.acceptedNum / record.submitNum : "0"}
                    % (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  PageVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);
const dataList = ref([]);
const total = ref(0);
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
    pageSize: 10,
  },
  // sorts: [
  //   {
  //     isAsc: true,
  //     sortName: "",
  //   },
  // ],
});

const loadData = async () => {
  const res = await QuestionControllerService.listUsingPost1(
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

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
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

const router = useRouter();
/**
 * 搜索
 */
const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    page: {
      current: 1,
      pageSize: 10,
    },
  };
  // 这行代码可以省略 因为只要修改searchParams的值后会触发刷新
  // loadData();
};

/**
 * 进入到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 轮播图
 */
const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
];
</script>

<style scoped>
#questionsView {
  max-width: 100%;
  margin: 0 auto;
  /*background: rgba(255, 255, 255, 0.8);*/
  background: rgba(255, 255, 255, 0.8);
  /*height: 100%;*/
  flex: 1;
  width: 100%;
}
</style>
