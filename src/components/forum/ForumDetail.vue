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
          {{ topicVO?.content }}
        </div>
      </div>
      <div class="imgs">
        <img
          v-for="(img, index) in topicVO?.imgs"
          :key="index"
          class="img"
          :src="img"
        />
      </div>
      <div class="ops">
        <div class="ops-item">
          <SvgIcon icon="thumb" :size="25" />
          <span>{{ topicVO?.thumbNum }}</span>
        </div>
        <div class="ops-item">
          <SvgIcon icon="favour2" :size="25" />
          <span>{{ topicVO?.favourNum }}</span>
        </div>
      </div>
      <div class="comment">
        <a-comment
          align="right"
          avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        >
          <template #actions>
            <a-button key="1" type="primary"> 评论</a-button>
          </template>
          <template #content>
            <a-input placeholder="在这里输入你的评论吧！" />
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

const forumStore = useForumStore();

onMounted(() => {
  loadTopicData();
});

const topicVO = ref();
const commentVOS = ref();
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
    width: 60%;
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
      width: 65%;
      margin: 0 auto;
      display: flex;
      justify-content: left;
      align-items: center;
      flex-wrap: wrap;
      column-gap: 15px;
      row-gap: 15px;

      .img {
        height: 210px;
        width: 210px;
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
