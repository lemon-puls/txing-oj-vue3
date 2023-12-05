<template>
  <div id="questionsView">
    <a-carousel
      :autoPlay="true"
      animation-name="card"
      show-arrow="never"
      indicator-position="outer"
      :style="{
        width: '100%',
        height: '300px',
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
    <a-form :model="searchForm" layout="inline">
      <a-form-item field="title" label="关键词" style="min-width: 240px">
        <a-input v-model="searchForm.title" placeholder="请输入检索关键词..." />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag
          v-model="searchForm.tags"
          placeholder="请输入检索标签..."
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">查询</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-space wrap>
      <a-tag
        :checkable="true"
        :checked="item.checked"
        v-for="(item, index) of questionTagData"
        :key="index"
        :color="item.color"
        bordered
        @click="clickQuestionTag(item)"
        class="questionTag"
        >{{ item.name }}
      </a-tag>
    </a-space>
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
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
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
// 查询表单数据
const searchForm = ref({
  title: "",
  tags: [],
});
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
  const res = await QuestionControllerService.listUsingPost2(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.list;
    total.value = res.data.total;
  } else {
    message.error("加载题目数据失败:" + res.msg);
  }
};
/**
 * 加载数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  // {
  //   title: "题号",
  //   dataIndex: "id",
  // },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
    width: 500,
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
    filter: [
      {
        fieldName: "tags",
        queryType: "like",
        value: searchForm.value.tags.join("_"),
      },
      {
        fieldName: "title",
        queryType: "like",
        value: searchForm.value.title,
      },
    ],
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
  "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/user_avatar/1/7FnAF58Q-99a67b42fa31888424aaf3f497067d4.png",
  "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/user_avatar/1/CNNK28KM-97a32813bdf9f7f6328eaf77b1dff8e.png",
  "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/user_avatar/1/oJU2uPiy-cb1cd260f70f3e7f479c07775047905.png",
  "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/user_avatar/1/FvYBfcIL-8026970bd88274f74d3d8bf5da84f2c.png",
];

/**
 * 题目标签展示
 */
const questionTagData = reactive([
  {
    color: "orange",
    checked: true,
    name: "全部题目",
  },
  {
    color: "arcoblue",
    checked: false,
    name: "算法",
  },
  {
    color: "gold",
    checked: false,
    name: "JavaScript",
  },
  {
    color: "green",
    checked: false,
    name: "二叉树",
  },
  {
    color: "blue",
    checked: false,
    name: "数据库",
  },
  {
    color: "magenta",
    checked: false,
    name: "Shell",
  },
  {
    color: "cyan",
    checked: false,
    name: "图论",
  },
  {
    color: "purple",
    checked: false,
    name: "动态规划",
  },
  {
    color: "lime",
    checked: false,
    name: "回溯",
  },
  {
    color: "arcoblue",
    checked: false,
    name: "排序",
  },
  {
    color: "orangered",
    checked: false,
    name: "队列",
  },
  {
    color: "lime",
    checked: false,
    name: "栈",
  },
  {
    color: "magenta",
    checked: false,
    name: "其他",
  },
]);
const clickQuestionTag = (item: any) => {
  item.checked = !item.checked;
  if (item.name !== "全部题目" && item.checked) {
    questionTagData[0].checked = false;
  }
  // 如果“全部题目”标签被选中 则其他标签都设置为不选中状态
  if (questionTagData[0].checked) {
    for (let i = 1; i < questionTagData.length; i++) {
      questionTagData[i].checked = false;
    }
  }
  let tagsStr = "";
  let flag = false;
  if (!questionTagData[0].checked) {
    for (let i = 1; i < questionTagData.length; i++) {
      if (questionTagData[i].checked) {
        flag = true;
        tagsStr = tagsStr + questionTagData[i].name + "_";
      }
    }
  }
  // 如果其他标签都没有被选中 就把“全部题目”标签设置为选中状态
  if (!flag) {
    questionTagData[0].checked = true;
  }

  searchParams.value = {
    ...searchParams.value,
    page: {
      current: 1,
      pageSize: 10,
    },
    filter: [
      {
        fieldName: "fixedTags",
        queryType: "like",
        value: tagsStr,
      },
      {
        fieldName: "title",
        queryType: "like",
        value: searchForm.value.title,
      },
      {
        fieldName: "tags",
        queryType: "like",
        value: searchForm.value.tags.join("_"),
      },
    ],
  };
};
</script>

<style>
#questionsView {
  /*max-width: 1280px;*/
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  /*background: rgba(255, 255, 255, 0.8);*/
  background: rgba(255, 255, 255, 0.8);
  /*height: 100%;*/
  flex: 1;
  padding: 20px 20px;
}

.arco-tag-size-medium {
  min-width: 90px;
  justify-content: center;
  border-radius: 20px !important;
  height: 35px !important;
}
</style>
