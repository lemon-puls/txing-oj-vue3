<template>
  <div id="forumSearchViewId">
    <div class="search">
      <a-input-search
        :style="{ width: '40%' }"
        placeholder="搜搜你想要的帖子吧"
        search-button
        @search="loadForumTopicData"
        v-model="keyWord"
        :allow-clear="true"
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default> Search</template>
      </a-input-search>
    </div>
    <div class="post-list">
      <ForumPostItem
        v-for="topic in forumTopicData"
        :topic="topic"
        :key="topic.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from "@arco-design/web-vue/es/icon";
import ForumPostItem from "@/components/forum/ForumPostItem.vue";
import { onMounted, ref } from "vue";
import {
  CursorPageBaseRequest,
  TopicAppControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

onMounted(() => {
  loadForumTopicData();
});

const forumTopicData = ref();
const cursorPage = ref({
  cursor: "",
  pageSize: 20,
  isLast: false,
});
const keyWord = ref("");
const loadForumTopicData = async () => {
  const res = await TopicAppControllerService.getTopicListByCursorUsingPost({
    ...cursorPage.value,
    keyWord: keyWord.value,
  });
  if (res.code != 0) {
    message.error(res.msg + ", 请尝试刷新！");
    return;
  }
  forumTopicData.value = res.data.list;
};
</script>

<style scoped lang="scss">
#forumSearchViewId {
  max-width: 1080px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px 20px;
  flex: 1;

  .search {
    text-align: center;
    margin: 20px auto;
  }

  .post-list {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
