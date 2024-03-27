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
          <IconMessage /> 回复
        </span>
      </template>
      <a-comment
        v-if="isShowMap.get(props.commentVO.id)"
        align="right"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      >
        <template #actions>
          <a-button key="0" type="secondary"> Cancel</a-button>
          <a-button
            key="1"
            type="primary"
            @click="isShowMap.set(props.commentVO.id, false)"
          >
            Reply
          </a-button>
        </template>
        <template #content>
          <a-input placeholder="Here is you content." />
        </template>
      </a-comment>
      <div
        style="padding: 10px; border-radius: 10px; background-color: whitesmoke"
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
          </template>
          <a-comment
            v-if="isShowMap.get(reply.id)"
            align="right"
            avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          >
            <template #actions>
              <a-button key="0" type="secondary"> Cancel</a-button>
              <a-button key="1" type="primary" @click="onReply(reply.id)">
                Reply
              </a-button>
            </template>
            <template #content>
              <a-input placeholder="Here is you content." />
            </template>
          </a-comment>
        </a-comment>
      </div>
    </a-comment>
  </div>
</template>

<script lang="ts" setup>
import { IconHeart, IconMessage, IconStar } from "@arco-design/web-vue/es/icon";
import { ref, defineProps } from "vue";

const props = defineProps(["commentVO"]);

const isShowMap = ref<Map<number, boolean>>(new Map());
const parentId = ref(props.commentVO.id);
isShowMap.value.set(parentId, false);
props.commentVO.replyList.forEach((item: any) => {
  isShowMap.value.set(item.id, false);
});

const showReply = ref<boolean[]>(Array(2).fill(false));

const onReply = (replyId: number) => {
  isShowMap.value.set(replyId, false);
  alert(replyId);
};
</script>

<style scoped lang="scss"></style>
