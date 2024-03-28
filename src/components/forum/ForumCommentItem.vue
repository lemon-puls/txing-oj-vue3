<template>
  <div id="forumCommentItemId">
    <a-divider />
    <a-comment
      :author="props.commentVO.userShowVO.userName"
      :avatar="props.commentVO.userShowVO.userAvatar"
      :content="props.commentVO.content"
      :datetime="props.commentVO.createTime"
    >
      <template #actions>
        <span class="action" @click="isShowMap.set(props.commentVO.id, true)">
          <SvgIcon icon="reply" :size="15" /> 回复
        </span>
        <span
          class="action"
          v-if="props.commentVO.userId === userStore.loginUser.id"
          @click="onDelete(props.commentVO.id)"
          ><SvgIcon icon="remove3" :size="15" /> 删除</span
        >
      </template>
      <a-comment
        v-if="isShowMap.get(props.commentVO.id)"
        align="right"
        :avatar="userStore.loginUser.userAvatar"
      >
        <template #actions>
          <a-button
            key="0"
            type="secondary"
            shape="round"
            @click="onCancelReply(props.commentVO.id)"
          >
            取消
          </a-button>
          <a-button
            key="1"
            type="primary"
            shape="round"
            @click="onReply(props.commentVO.id)"
          >
            回复
          </a-button>
        </template>
        <template #content>
          <a-input v-model="commmentVal" placeholder="请输入你的回复吧..." />
        </template>
      </a-comment>
      <div
        v-if="props.commentVO.replyList && props.commentVO.replyList.length > 0"
        style="
          padding: 10px;
          border-radius: 10px;
          background-color: whitesmoke;
          margin-top: 10px;
        "
      >
        <a-comment
          v-for="(reply, index) in props.commentVO.replyList"
          :key="index"
          :author="reply.userShowVO.userName + ' 回复 ' + reply?.userName"
          :avatar="reply.userShowVO.userAvatar"
          :content="reply.content"
          :datetime="reply.createTime"
        >
          <template #actions>
            <span class="action" @click="isShowMap.set(reply.id, true)">
              <IconMessage /> 回复
            </span>
            <span
              class="action"
              v-if="reply.userId === userStore.loginUser.id"
              @click="onDelete(reply.id)"
              ><SvgIcon icon="remove3" :size="15" /> 删除</span
            >
          </template>
          <a-comment
            v-if="isShowMap.get(reply.id)"
            align="right"
            :avatar="userStore.loginUser.userAvatar"
          >
            <template #actions>
              <a-button
                key="0"
                type="secondary"
                shape="round"
                @click="onCancelReply(reply.id)"
              >
                取消
              </a-button>
              <a-button
                key="1"
                type="primary"
                shape="round"
                @click="onReply(reply.id)"
              >
                回复
              </a-button>
            </template>
            <template #content>
              <a-input
                v-model="commmentVal"
                placeholder="请输入你的回复吧..."
              />
            </template>
          </a-comment>
        </a-comment>
      </div>
    </a-comment>
  </div>
</template>

<script lang="ts" setup>
import { IconHeart, IconMessage, IconStar } from "@arco-design/web-vue/es/icon";
import { ref, defineProps, defineEmits } from "vue";
import { useUserStore } from "@/store/user";
import { TopicAppControllerService } from "../../../generated";
import { useForumStore } from "@/store/forum";
import message from "@arco-design/web-vue/es/message";
import SvgIcon from "@/icons/SvgIcon";

const props = defineProps(["commentVO"]);
let $emit = defineEmits(["loadTopicData"]);
const userStore = useUserStore();
const forumStore = useForumStore();
const commmentVal = ref("");

const isShowMap = ref<Map<number, boolean>>(new Map());
const parentId = ref(props.commentVO.id);
isShowMap.value.set(parentId, false);
props.commentVO.replyList.forEach((item: any) => {
  isShowMap.value.set(item.id, false);
});

const showReply = ref<boolean[]>(Array(2).fill(false));
// 发送回复
const onReply = async (replyId: number) => {
  if (commmentVal.value.length == 0) {
    message.error("评论内容不得为空！");
    return;
  }
  const params = {
    content: commmentVal.value,
    replyId: replyId,
    topicId: forumStore.currentTopicId,
    id: undefined,
  };
  const res = await TopicAppControllerService.commentTopicUsingPost(params);
  if (res.code != 0) {
    message.error(res.msg + ", 请尝试刷新！");
    return;
  }
  // 使父组件重新加载评论数据
  $emit("loadTopicData");
  commmentVal.value = "";
  isShowMap.value.set(replyId, false);
};
// 取消回复
const onCancelReply = (topicId: number) => {
  commmentVal.value = "";
  isShowMap.value.set(topicId, false);
};
// 删除评论
const onDelete = async (commentId: number) => {
  const res = await TopicAppControllerService.deleteCommentUsingPost(commentId);
  if (res.code != 0) {
    message.error(res.msg + ", 请尝试重试！");
    return;
  }
  message.success("删除成功");
  // 使父组件重新加载评论数据
  $emit("loadTopicData");
};
</script>

<style scoped lang="scss"></style>
