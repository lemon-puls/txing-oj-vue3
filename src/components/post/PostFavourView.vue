<template>
  <div id="postFavourViewId">
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="data"
      :pagination-props="paginationProps"
      @pageChange="onPageChange"
      v-if="data.length > 0"
    >
      <template #scroll-loading>
        <!--        <div v-if="bottom === 1">-->
        <!--          <span style="color: #7d7979"-->
        <!--            >已经到尽头啦 可以尝试发表一下文章哦！</span-->
        <!--          >-->
        <!--        </div>-->
        <!--        <a-spin v-else-if="bottom === 0" />-->
        <!--        <div v-else-if="bottom === 2">-->
        <!--          <a-empty />-->
        <!--        </div>-->
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
                <span style="margin-left: 20px; color: #ff7300" @click.stop>
                  <a-popconfirm
                    content="是否确认取消收藏该文章?"
                    @click.stop
                    @ok="cancelPostFavour(item.id)"
                  >
                    <span> <icon-delete />移除</span>
                  </a-popconfirm>
                </span>
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
    <a-empty v-else />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  reactive,
  ref,
  watchEffect,
  withDefaults,
} from "vue";
import {
  PageVO,
  PostControllerService,
  PostFavourControllerService,
  PostQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {
  IconStar,
  IconMessage,
  IconHeart,
  IconUnorderedList,
  IconDelete,
} from "@arco-design/web-vue/es/icon";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  loadData();
});

const data = ref([]);
const paginationProps = reactive({
  defaultPageSize: 5,
  total: 10,
  showTotal: true,
});
// 查询
const searchMyPostParams = ref<PostQueryRequest>({
  current: 1,
  pageSize: 5,
});
const loadData = async () => {
  const res = await PostFavourControllerService.listMyFavourPostByPageUsingPost(
    searchMyPostParams.value
  );
  if (res.code !== 0) {
    message.error(res.msg);
    return;
  }
  data.value.splice(0);
  data.value = data.value.concat(res.data.list);
  paginationProps.total = res.data.total;
};
/**
 * 只要页号等变量发生改变时 就会触发loadData的调用 获取到当前页对应的数据
 */
watchEffect(() => {
  loadData();
});

const onPageChange = (page: number) => {
  searchMyPostParams.value = {
    ...searchMyPostParams.value,
    current: page,
  };
};
// 点击文章跳转到详情页
const clickPostHandle = (id: number) => {
  router.push({
    path: "/txing/post/view/" + id,
  });
};
// 取消收藏
const cancelPostFavour = async (id: any) => {
  const res = await PostFavourControllerService.doPostFavourUsingPost({
    postId: id,
  });
  if (res.code !== 0) {
    message.error("取消失败：", res.msg);
    return;
  }
  loadData();
  message.success("取消成功");
};
</script>

<style lang="scss">
#postFavourViewId {
  margin-bottom: 30px;

  .arco-list-wrapper {
    width: 100%;
  }
}

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
  width: 95%;
  margin: 0 auto;
}

#postFavourViewId {
  .arco-list-item-action {
    > li {
      width: 100% !important;
    }
  }
}

#postFavourViewId .arco-list-item-meta-description {
  height: 40px;
}
</style>
