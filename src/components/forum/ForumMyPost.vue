<template>
  <div id="forumMyPostId">
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="forumTopicData"
      :pagination-props="paginationProps"
      @page-change="onPageChange"
    >
      <template #item="{ index, item }">
        <ForumPostItem
          :is-delete="true"
          :is-edit="true"
          :topic="item"
          :key="index"
          @load-data="loadForumTopicData"
        />
      </template>
    </a-list>
    <!--    <ForumPostItem v-for="i in 10" :key="i" />-->
  </div>
</template>

<script setup lang="ts">
import ForumPostItem from "@/components/forum/ForumPostItem.vue";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { TopicAppControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useUserStore } from "@/store/user";

onMounted(() => {
  loadForumTopicData();
});
const userStore = useUserStore();
const paginationProps = reactive({
  defaultPageSize: 5,
  total: 0,
  showTotal: true,
});

const pageParams = ref({
  filter: [
    {
      fieldName: "userId",
      queryType: "eq",
      value: userStore.loginUser.id.toString(),
    },
  ],
  page: {
    current: 1,
    pageSize: 5,
  },
});

const forumTopicData = ref();

// 加载帖子数据
const loadForumTopicData = async () => {
  const res = await TopicAppControllerService.listUsingPost5(pageParams.value);
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
    page: {
      current: current,
      pageSize: 5,
    },
  };
};
</script>

<style scoped lang="scss">
#forumMyPostId {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
