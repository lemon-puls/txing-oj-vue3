<template>
  <div id="WeekSimulateRecordListId">
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="matchRecordData"
      @page-change="onPageChange"
      :pagination-props="paginationProps"
    >
      <template #item="{ index, item }">
        <WeekSimulateRecordItem :key="index" :record="item" />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { MatchWeekAppControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import WeekSimulateRecordItem from "@/components/match/WeekSimulateRecordItem.vue";

const paginationProps = reactive({
  defaultPageSize: 10,
  total: 0,
  showTotal: true,
});

const pageParams = ref({
  current: 1,
  pageSize: 10,
});
const matchRecordData = ref();
// 加载帖子数据
const loadMatchRecordData = async () => {
  const res =
    await MatchWeekAppControllerService.getWeekSimulateRecordByUserIdUsingPost(
      pageParams.value
    );
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  matchRecordData.value = res.data.list;
  paginationProps.total = res.data.total;
};
watchEffect(() => {
  loadMatchRecordData();
});
// 页码发生改变
const onPageChange = (current: number) => {
  pageParams.value = {
    ...pageParams.value,
    current: current,
  };
};
</script>

<style scoped lang="scss">
#WeekSimulateRecordListId {
  margin-bottom: 20px;
}
</style>
