<template>
  <div id="forumDetailId" @click="forumStore.close()">
    <div class="post-content" @click.stop>
      <div class="post-content-header">
        <div class="left">
          <img class="avatar" :src="topicVO?.userShowVO.userAvatar" />
          <span>{{ topicVO?.userShowVO.userName }}</span>
        </div>
      </div>
      <div class="title">
        <h2>{{ topicVO?.title }}</h2>
      </div>
      <div class="content">
        <div
          style="
            width: 90%;
            line-height: 30px;
            font-size: 20px;
            margin: 0 auto 30px;
          "
        >
          <pre style="white-space: pre-wrap; overflow-wrap: break-word">{{
            topicVO?.content
          }}</pre>
        </div>
      </div>
      <div class="imgs">
        <img
          v-for="(img, index) in topicVO?.imgs"
          :key="index"
          class="img"
          :src="img"
          @click="onPreviewImg(img)"
        />
      </div>
      <div class="ops">
        <div class="ops-item">
          <SvgIcon @click="onThumb" v-if="!isThumb" icon="thumb" :size="25" />
          <SvgIcon @click="onThumb" v-else icon="thumbfill" :size="25" />
          <span>{{ topicVO?.thumbNum }}</span>
        </div>
        <div class="ops-item">
          <SvgIcon
            @click="onFavour"
            v-if="!isFavour"
            icon="favour2"
            :size="25"
          />
          <SvgIcon @click="onFavour" v-else icon="favourfill2" :size="25" />
          <span>{{ topicVO?.favourNum }}</span>
        </div>
      </div>
      <div class="comment">
        <a-comment align="right" :avatar="userStore.loginUser.userAvatar">
          <template #actions>
            <a-button shape="round" key="1" type="primary" @click="onReply">
              评论
            </a-button>
          </template>
          <template #content>
            <a-input
              v-model="commentVal"
              placeholder="在这里输入你的评论吧！"
            />
          </template>
        </a-comment>
      </div>
      <div class="comment-header">
        <h3>全部评论（{{ topicVO?.commentNum }}）</h3>
      </div>
      <div class="comment-content">
        <ForumCommentItem
          :comment-v-o="comment"
          v-for="(comment, index) in commentVOS"
          :key="index"
          @load-topic-data="loadTopicData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import SvgIcon from "@/icons/SvgIcon";
import ForumCommentItem from "@/components/forum/ForumCommentItem.vue";
import { useForumStore } from "@/store/forum";
import { TopicAppControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useUserStore } from "@/store/user";
import { useImgPreviewStore } from "@/store/preview";

const forumStore = useForumStore();
const userStore = useUserStore();
const commentVal = ref("");
const previewStore = useImgPreviewStore();

onMounted(() => {
  loadTopicData();
});

const topicVO = ref();
const commentVOS = ref();
const isThumb = ref(false);
const isFavour = ref(false);
const loadTopicData = async () => {
  const res = await TopicAppControllerService.getTopicByIdUsingGet(
    forumStore.currentTopicId
  );
  if (res.code != 0) {
    message.error(res.msg + ", 请尝试刷新！");
    return;
  }
  topicVO.value = res.data.topicVO;
  commentVOS.value = res.data.commentVOS;
  isThumb.value = topicVO.value.thumb;
  isFavour.value = topicVO.value.favour;
};
// 发送评论
const onReply = async () => {
  if (commentVal.value.length == 0) {
    message.error("评论内容不得为空！");
    return;
  }
  const params = {
    content: commentVal.value,
    topicId: forumStore.currentTopicId,
  };
  const res = await TopicAppControllerService.commentTopicUsingPost(params);
  if (res.code != 0) {
    message.error(res.msg + ", 请尝试刷新！");
    return;
  }
  // 重新加载评论数据
  loadTopicData();
  commentVal.value = "";
};
// 预览图片
const onPreviewImg = (imgUrl: string) => {
  previewStore.show([imgUrl], 0);
};
// 点赞
const onThumb = async () => {
  const res = await TopicAppControllerService.doThumbUsingPost1({
    postId: forumStore.currentTopicId,
  });
  if (res.code != 0) {
    message.error(res.msg + "，请稍后重试！");
    return;
  }
  topicVO.value.thumbNum += res.data;
  isThumb.value = !isThumb.value;
};
// 收藏
const onFavour = async () => {
  const res = await TopicAppControllerService.doFavourUsingPost({
    postId: forumStore.currentTopicId,
  });
  if (res.code != 0) {
    message.error(res.msg + "，请稍后重试！");
    return;
  }
  topicVO.value.favourNum += res.data;
  isFavour.value = !isFavour.value;
};
</script>

<style scoped lang="scss">
#forumDetailId {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(56, 52, 52, 0.4);
  z-index: 10000;

  .post-content {
    height: 100%;
    overflow: auto;
    width: 80%;
    max-width: 1080px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding-bottom: 20px;
  }

  //.icon {
  //  position: fixed;
  //  top: 10%;
  //  right: 10%;
  //}
  .post-content {
    &-header {
      padding: 10px;
      padding-top: 20px;
      //position: fixed;
      //top: 0;
      //left: 0;
      box-shadow: #eee 1px 1px 5px;
      position: sticky;
      top: 0px;
      transition: top 0.3s;

      left: 0;
      right: 0;

      background-color: white;

      .left {
        display: flex;
        align-items: center;
        column-gap: 10px;

        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }

    .title {
      padding: 10px;
      width: 90%;
      margin: 0 auto;
    }

    .imgs {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: left;
      align-items: center;
      flex-wrap: wrap;
      column-gap: 15px;
      row-gap: 15px;

      .img {
        height: 180px;
        width: 180px;
        border-radius: 20px;
      }
    }

    .ops {
      display: flex;
      align-items: center;
      column-gap: 15px;
      width: 90%;
      margin: 20px auto;

      &-item {
        display: flex;
        align-items: center;
        column-gap: 5px;
      }
    }

    .comment {
      width: 90%;
      margin: 0 auto;
      background-color: rgba(247, 244, 244, 0.5);
      border-radius: 10px;
      padding: 20px;
    }

    .comment-header {
      width: 90%;
      margin: 20px auto;
    }

    .comment-content {
      width: 90%;
      margin: 10px auto;
    }
  }
}
</style>
