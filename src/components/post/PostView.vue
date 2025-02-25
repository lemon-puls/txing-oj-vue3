<template>
  <div id="postViewId">
    <a-list
      class="list-demo-action-layout"
      :bordered="false"
      :data="myPostData"
      :pagination-props="paginationProps"
      @pageChange="onPageChange"
      v-if="myPostData.length > 0"
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
                  <a-dropdown :popup-max-height="false" :hide-on-select="false">
                    <span> <icon-unordered-list />编辑</span>
                    <template #content>
                      <a-doption @click="handlePostOps(item.id, '编辑文章')"
                        >编辑文章</a-doption
                      >
                      <a-popconfirm
                        content="删除后不可恢复 是否确认删除该文章?"
                        @click.stop
                        @ok="handlePostOps(item.id, '删除文章')"
                      >
                        <a-doption>删除文章</a-doption>
                      </a-popconfirm>
                    </template>
                  </a-dropdown>
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
            <div class="image-area">
              <div class="content">
                <img
                  class="img"
                  v-if="item.coverImg"
                  alt="arco-design"
                  :src="item.coverImg"
                />
                <div
                  class="overlay"
                  v-if="item.status != CheckStatusEnum.ACCEPTED"
                >
                  <div
                    class="overlay-content"
                    v-if="item.status == CheckStatusEnum.WAITTING"
                  >
                    审核中
                  </div>
                  <div
                    class="overlay-content"
                    v-else-if="item.status == CheckStatusEnum.REJECT"
                    :title="item.remark"
                  >
                    <span style="color: red">不通过</span>
                    <span class="remark"
                      >备注：{{
                        item.length > 30
                          ? item.slice(0, 30) + "..."
                          : item.remark
                      }}</span
                    >
                  </div>
                </div>
              </div>
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
import { useUserStore } from "@/store/user";
import { CheckStatusEnum } from "@/enume";

const router = useRouter();

onMounted(() => {
  loadMyPostData();
});

const myPostData = ref([]);
const paginationProps = reactive({
  defaultPageSize: 5,
  total: 10,
  showTotal: true,
});
// 查询
const searchMyPostParams = ref<PostQueryRequest>({
  current: 1,
  pageSize: 5,
  userId: useUserStore().loginUser.id,
});
const loadMyPostData = async () => {
  // 重新三次 防止服务器由于太久没访问而出现第一次访问失败的情况
  let retrys = 3;
  let res;
  while (retrys > 0) {
    res = await PostControllerService.searchPostVoByPageUsingPost(
      searchMyPostParams.value
    );
    if (res.code !== 0) {
      retrys--;
    } else {
      break;
    }
  }
  if (res?.code !== 0) {
    message.error(res?.msg);
    return;
  }
  myPostData.value.splice(0);
  myPostData.value = myPostData.value.concat(res.data.list);
  paginationProps.total = res.data.total;
};

/**
 * 只要页号等变量发生改变时 就会触发loadData的调用 获取到当前页对应的数据
 */
watchEffect(() => {
  loadMyPostData();
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

// 处理文章操作
const handlePostOps = async (id: any, key: any) => {
  if ("编辑文章" === key) {
    router.push({
      path: "/txing/post/update",
      query: {
        id: id,
      },
    });
  } else {
    // 删除文章
    const res = await PostControllerService.deletePostUsingPost({
      id: id,
    });
    if (res.code !== 0) {
      message.error("删除失败：", res.msg);
      return;
    } else {
      loadMyPostData();
      message.success("删除成功");
    }
  }
};
</script>

<style lang="scss">
#postViewId {
  margin-bottom: 30px;

  .arco-list-wrapper {
    width: 100%;
  }

  .image-area {
    .content {
      position: relative;
      width: 183px;
      height: 119px;

      .img {
        width: 183px;
        height: 119px;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        //border-radius: 10px;

        .overlay-content {
          color: white; /* 文字颜色 */
          font-size: 12px; /* 文字大小 */
          text-align: center; /* 文字居中 */
          padding: 5px; /* 内边距 */
          border-radius: 5px; /* 圆角 */
          background-color: rgba(0, 0, 0, 0.7); /* 遮罩层背景 */
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          row-gap: 3px;

          span {
            position: initial;
            bottom: initial;
            right: initial;
            margin-right: initial;
            margin-bottom: initial;
          }

          .remark {
            font-size: 10px;
            color: #ffffff;
          }
        }
      }
    }
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

#postViewId .arco-list-item-action > li {
  width: 100% !important;
}

#postViewId .arco-list-item-meta-description {
  height: 40px;
}
</style>
