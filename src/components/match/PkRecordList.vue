<template>
  <div id="PkRecordListId">
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="pkRecordData"
      @page-change="onPageChange"
      :pagination-props="paginationProps"
    >
      <template #item="{ index, item }">
        <PkRecordItem :key="index" :record="item" />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import PkRecordItem from "@/components/match/PkRecordItem.vue";
import { MatchOnlinepkAppControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const paginationProps = reactive({
  defaultPageSize: 10,
  total: 0,
  showTotal: true,
});

const pageParams = ref({
  current: 1,
  pageSize: 10,
});
const pkRecordData = ref();
// 加载帖子数据
const loadPkRecordData = async () => {
  const res =
    await MatchOnlinepkAppControllerService.getPkRecordByUserUsingPost(
      pageParams.value
    );
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  pkRecordData.value = res.data.list;
  paginationProps.total = res.data.total;
};
watchEffect(() => {
  loadPkRecordData();
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
#PkRecordListId {
  margin-bottom: 20px;
}
</style>
