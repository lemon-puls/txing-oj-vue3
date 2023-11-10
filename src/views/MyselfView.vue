<template>
  <div id="myselfView">
    <!--    <img src="../assets/gy.png" style="width: 100%; height: auto" />-->
    <!--    <a-avatar id="headImg" :size="256">-->
    <!--      <img-->
    <!--        alt="avatar"-->
    <!--        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"-->
    <!--      />-->
    <!--    </a-avatar>-->

    <a-upload action="/">
      <template #upload-button>
        <a-avatar
          id="headImg"
          :size="256"
          :trigger-icon-style="{ color: '#3491FA' }"
          :auto-fix-font-size="false"
          :style="{ backgroundColor: '#168CFF' }"
        >
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </template>
    </a-upload>

    <div id="backgorupDiv">
      <div id="basicInfo">
        <a-space direction="vertical" size="large" fill>
          <a-descriptions size="large" :column="3">
            <a-descriptions-item
              :key="item"
              v-for="item of data"
              :label="item.label"
              :span="item.span ?? 1"
            >
              <a-tag>{{ item.value }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-space>
        <p style="font-size: 20px">个性签名：不为失败找借口 只为成功找方法！</p>
      </div>
      <div style="padding-top: 100px">
        <a-tabs size="large">
          <a-tab-pane key="1">
            <template #title>
              <icon-pen-fill size="28" />
              <span
                style="font-size: 25px; font-weight: bold; margin-left: 10px"
                >提交记录</span
              >
            </template>
            <a-table
              id="submitRecordTable"
              style="width: 90%; margin: 0 auto"
              :bordered="false"
              :show-header="false"
              :columns="recordColumns"
              :data="records"
            />
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #title>
              <icon-star-fill size="28" />
              <span
                style="font-size: 25px; font-weight: bold; margin-left: 10px"
                >我的收藏</span
              >
            </template>
            Content of Tab Panel 2
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #title>
              <icon-heart-fill size="28" />
              <span
                style="font-size: 25px; font-weight: bold; margin-left: 10px"
                >我的粉丝</span
              >
            </template>
            Content of Tab Panel 3
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconHeartFill,
  IconPenFill,
  IconStarFill,
} from "@arco-design/web-vue/es/icon";
import { reactive } from "vue";

const recordColumns = [
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Salary",
    dataIndex: "salary",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const records = reactive([
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com",
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com",
  },
]);

const data = [
  {
    label: "昵称",
    value: "尽人事 听天命",
  },
  {
    label: "大学",
    value: "广东石油化工学院",
  },
  {
    label: "专业",
    value: "网络工程",
  },
  {
    label: "刷题数",
    value: "300",
  },
  {
    label: "通过率",
    value: "75 %",
  },
];

const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
];
const handleChange = (value: string) => {
  console.log(value);
};
</script>

<style>
#myselfView {
  max-width: 1280px;
  margin: 0 auto;
  /*padding-top: 200px;*/
  /*background: rgba(255, 255, 255, 0.8);*/
  /*padding-left: 100px;*/
  /*padding-top: 100px;*/
}

#headImg {
  margin-left: 80px;
  /*position: absolute;*/
}

#backgorupDiv {
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  min-height: 800px;
  margin-top: -128px;
  /*margin-top: 200px;*/
  border-radius: 20px 20px;
}

#basicInfo {
  padding-top: 30px;
  margin-left: 400px;
}

td.arco-descriptions-item-label.arco-descriptions-item-label-block {
  font-size: 18px !important;
  font-weight: bold !important;
  color: #007bff !important;
}

.arco-tag-size-medium {
  font-size: 18px !important;
}

#submitRecordTable .arco-table-td {
  background: rgba(255, 255, 255, 0);
}
</style>
