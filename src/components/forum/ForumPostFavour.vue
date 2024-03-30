<template>
  <div id="ForumPostFavourId">
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="forumTopicData"
      :pagination-props="paginationProps"
      @page-change="onPageChange"
    >
      <template #item="{ index, item }">
        <ForumPostItem
          @load-data="loadForumTopicData"
          :key="index"
          :topic="item"
          :is-remove="true"
        />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import ForumPostItem from "@/components/forum/ForumPostItem.vue";
import { TopicAppControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const paginationProps = reactive({
  defaultPageSize: 5,
  total: 0,
  showTotal: true,
});

const pageParams = ref({
  current: 1,
  pageSize: 5,
});
const forumTopicData = ref();
// 加载帖子数据
const loadForumTopicData = async () => {
  const res = await TopicAppControllerService.getUserFavourUsingPost1(
    pageParams.value
  );
  if (res.code != 0) {
    message.error(res.msg + ", 请尝试刷新！");
    return;
  }
  forumTopicData.value = res.data.list;
  paginationProps.total = res.data.total;
};
watchEffect(() => {
  loadForumTopicData();
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
#ForumPostFavourId {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
