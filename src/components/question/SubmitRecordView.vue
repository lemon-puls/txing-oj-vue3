<template>
  <a-table
    style="max-width: 90vh"
    :pagination="false"
    :columns="columns"
    :data="data"
    :row-key="id"
    @rowClick="clickRow"
  />
</template>

<script setup lang="ts">
import { defineProps, reactive, withDefaults } from "vue";

interface Props {
  data: Array<object>;
  clickRow: (record: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return reactive([
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
  },
  clickRow: (record: any) => {
    console.log("触发默认实现", record);
  },
});
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
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
  },
];
</script>

<style scoped></style>
