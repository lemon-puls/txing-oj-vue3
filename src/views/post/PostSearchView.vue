<template>
  <div id="postSearchViewId">
    <div id="searchInputDivId">
      <a-input
        id="searchInputId"
        :style="{ width: '320px' }"
        placeholder="快来搜索一下啦..."
        allow-clear
        v-model="searchText"
        @pressEnter="searchPost"
      />
      <a-button id="searchButtonId" type="primary" @click="searchPost"
        >走你
      </a-button>
    </div>
    <div id="searchOptionsId">
      <span
        >相关结果约<span style="color: red">{{ totalCount }}</span
        >个</span
      >
    </div>

    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="data"
      :pagination-props="paginationProps"
    >
      <template #scroll-loading>
        <div v-if="bottom === 1">
          <span style="color: #7d7979"
            >已经到尽头啦 可以尝试发表一下文章哦！</span
          >
        </div>
        <a-spin v-else-if="bottom === 0" />
        <div v-else-if="bottom === 2">
          <a-empty />
        </div>
      </template>
      <template #item="{ item }">
        <a-list-item
          class="list-demo-item"
          action-layout="vertical"
          @click="clickPostHandle(item.id)"
        >
          <template #actions>
            <div style="display: flex; justify-content: space-between">
              <div>
                <span><icon-heart />{{ item.thumbNum }}</span>
                <span><icon-star />{{ item.favourNum }}</span>
                <span><icon-message />{{ item.commentNum }}</span>
              </div>
              <div style="color: #7d7979">
                <span style="margin-right: 10px">{{ item.userName }}</span
                ><span style="margin-right: 10px">{{
                  item.createTime.split(" ")[0]
                }}</span>
              </div>
            </div>
          </template>
          <template #extra>
            <div className="image-area">
              <img
                v-if="item.coverImg"
                alt="arco-design"
                :src="item.coverImg"
              />
            </div>
          </template>
          <a-list-item-meta style="margin-right: 20px">
            <template #title>
              <h2 v-html="item.title" style="margin: 0 0"></h2>
            </template>
            <template #description>
              <span style="height: 50px !important" v-html="item.intro"></span>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { IconHeart, IconStar, IconMessage } from "@arco-design/web-vue/es/icon";
import { PostControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();

// onMounted(() => {
//   loadData();
// });

const data = ref([]);
// 输入框内容
const searchText = ref<string>();
// 查询
const loadData = async (current: number) => {
  const res = await PostControllerService.searchPostVoByPageUsingPost({
    searchText: searchText.value,
    pageSize: 20,
    current: current,
  });
  if (res.code !== 0) {
    message.error(res.msg);
    return;
  }
  console.log("res.data", res.data);
  return res;
};
// 搜索文章
const searchPost = async () => {
  const res = await loadData(1);
  console.log("搜索0：", res);
  data.value.splice(0);
  if (res === undefined || res.data === null || res.data.list.length === 0) {
    bottom.value = 2;
    return;
  }
  data.value = data.value.concat(res.data.list);
  current.value = 1;
  pageCount.value = res.data.pageCount;
  totalCount.value = res.data.total;
  if (current.value === pageCount.value) {
    bottom.value = 1;
  }
  console.log("搜索：", data.value);
};
// 分页查询
const current = ref(0);
const pageCount = ref(-1);
const bottom = ref(0);
const totalCount = ref(0);
const scrollbar = ref(true);

const fetchData = async () => {
  console.log("reach bottom!");
  if (
    (pageCount.value === -1 || current.value < pageCount.value) &&
    bottom.value === 0
  ) {
    current.value++;
    const res = await loadData(current.value);
    if (res == null) {
      return;
    }
    if (res.data.total === 0) {
      bottom.value = 2;
      return;
    }
    // 剔除可能的重复评论
    let targetData = res.data.list;
    // if (data.value.length !== 0) {
    //   targetData = res.data.list.filter(
    //     (item: any) =>
    //       item.createTime <=
    //       commentData.value[commentData.value.length - 1].createTime
    //   );
    // } else {
    //   targetData = res.data.list;
    // }
    data.value = data.value.concat(targetData);
    pageCount.value = res.data.pageCount;
    totalCount.value = res.data.total;
    if (pageCount.value === current.value) {
      bottom.value = 1;
    }
  } else {
    bottom.value = 1;
  }
};
const throttle = _.throttle(fetchData, 3000); //引入lodash功能

// 滚动检测
onMounted(async () => {
  await throttle();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  console.log("到达底部触发");
  if (bottom.value !== 0) {
    return;
  }
  const windowHeight = window.innerHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  console.log(
    "windowHeight, scrollTop, scrollHeight",
    windowHeight,
    scrollTop,
    scrollHeight,
    scrollTop + windowHeight + 1 >= scrollHeight
  );
  if (scrollTop + windowHeight + 1 >= scrollHeight) {
    console.log("加载数据啦");
    throttle();
  }
};

// 点击文章跳转到详情页
const clickPostHandle = (id: number) => {
  router.push({
    path: "/txing/post/view/" + id,
  });
};
</script>

<style>
#postSearchViewId {
  max-width: 1080px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;
}

#searchInputDivId {
  width: 85%;
  display: flex;
  margin: 0 auto;
}

#searchInputId {
  flex: 5;
  height: 40px;
}

#searchButtonId {
  flex: 1;
  height: 40px;
}

/*文章列表*/
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.arco-list-wrapper {
  width: 90%;
  margin: 0 auto;
}

#postSearchViewId .arco-list-item-action > li {
  width: 100% !important;
}

#postSearchViewId .arco-list-item-meta-description {
  height: 40px;
}

#searchOptionsId {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 85%;
  margin: 0 auto;
}
</style>
