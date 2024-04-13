<template>
  <div id="forumSearchViewId">
    <div class="search">
      <a-input-search
        :style="{ width: '40%' }"
        placeholder="搜搜你想要的帖子吧"
        search-button
        @search="loadForumTopicData(true)"
        v-model="keyWord"
        :allow-clear="true"
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default> 走你</template>
      </a-input-search>
    </div>
    <div class="post-list">
      <ForumPostItem
        v-for="topic in forumTopicData"
        :topic="topic"
        :key="topic.id"
      />
    </div>
    <div v-if="cursorPage.isLast" class="footer">
      <span>———— 到尽头啦 快去发一下帖子吧！————</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from "@arco-design/web-vue/es/icon";
import ForumPostItem from "@/components/forum/ForumPostItem.vue";
import { onMounted, ref } from "vue";
import {
  CursorPageBaseRequest,
  Service,
  TopicAppControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import _ from "lodash";
import { pageSize } from "@/store/chat";

onMounted(() => {
  loadForumTopicData(true);
});

const forumTopicData = ref<any[]>([]);
const cursorPage = ref({
  cursor: "",
  pageSize: 5,
  isLast: false,
  isLoading: false,
});
const keyWord = ref("");
const loadForumTopicData = async (isFresh = false) => {
  if (!isFresh && (cursorPage.value.isLast || cursorPage.value.isLoading)) {
    return;
  }
  // 标记为正在加载中
  cursorPage.value.isLoading = true;
  const res = await TopicAppControllerService.getTopicListByCursorUsingPost({
    ...cursorPage.value,
    keyWord: keyWord.value,
    cursor: isFresh ? undefined : cursorPage.value.cursor,
  });
  if (!res || res.code !== 0) {
    message.error(res.msg);
    return;
  }
  forumTopicData.value.push(...res.data.list);
  isFresh
    ? forumTopicData.value.splice(
        0,
        forumTopicData.value.length,
        ...res.data.list
      )
    : forumTopicData.value.push(...res.data.list);
  // 更新游标参数
  cursorPage.value.cursor = res.data.cursor;
  cursorPage.value.isLast = res.data.isLast;
  cursorPage.value.isLoading = false;
  // forumTopicData.value = res.data.list;
};

/**
 * 通过监听滚动事件 实现分页加载会话记录
 */
const handleScroll = () => {
  const windowHeight = window.innerHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  if (scrollTop + windowHeight + 100 >= scrollHeight) {
    loadForumTopicData();
  }

  // if (scrollElement.value) {
  //   console.log("滚动触发");
  //   const { scrollTop, scrollHeight, clientHeight } = scrollElement.value;
  //   if (scrollTop + clientHeight + 100 >= scrollHeight) {
  //     console.log("触发加载");
  //   }
  // }
};
const scrollThrottle = _.throttle(handleScroll, 100); //引入lodash功能
onMounted(() => {
  // scrollElement.value = document.documentElement;
  // if (scrollElement.value) {
  //   alert("绑定滚动事件");
  //   window.addEventListener("scroll", scrollThrottle);
  // }
  window.addEventListener("scroll", scrollThrottle);
});
</script>

<style lang="scss">
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

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7d7979;
    margin-top: 40px;
  }

  .arco-input-wrapper {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .arco-btn-primary,
  .arco-btn-primary[type="button"],
  .arco-btn-primary[type="submit"] {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>
