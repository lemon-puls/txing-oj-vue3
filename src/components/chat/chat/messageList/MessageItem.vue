<!--
* @MessageItem
* @author Li zhiwei
* @date 2023/12/20 22:12
-->

<template>
  <div id="MessageItem">
    <span v-if="isShowTimeNode && messageShow.timeNode" class="time-node">{{
      messageShow.timeNode
    }}</span>
    <span v-if="isRecall" class="recall-tip">{{ message.body }}</span>
    <div>
      <transition enter-active-class="animate__animate animate__fadeInTopLeft">
        <div :class="messageCls" v-if="!isRecall">
          <a-avatar>
            <img alt="avatar" :src="fromUser.userAvatar" />
            <!--            cacheStore.cachedUserList[fromUser.userId].userAvatar-->
          </a-avatar>
          <div class="message-item-box">
            <div class="message-item-user-info">
              <!--              用户名-->
              <span class="user-name"> {{ fromUser.userName }} </span>
              <span class="send-time" v-if="isShowTime">{{
                messageShow.sendTime
              }}</span>
            </div>
            <div
              :class="[
                'message-item-content',
                { uploading: messageShow?.loading },
              ]"
            >
              <!--            消息加载中-->
              <a-spin v-if="messageShow?.loading" :size="20" />
              <!--            消息内容-->
              <div class="text">
                <span>{{ message.body.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
#MessageItem {
  margin-left: 20px;
  margin-right: 20px;

  .time-node {
    display: inline-block;
    width: 100%;
    margin-bottom: 12px;
    font-size: 12px;
    color: #7d7979;
    text-align: center;
    user-select: none;
  }

  .message-item {
    width: 100%;
    display: flex;
    margin-bottom: 20px;

    &-box {
      flex: 1;
      padding: 0 12px;
      padding-right: 52px;
    }

    &-user-info {
      display: flex;
      column-gap: 4px;
      align-items: center;
      margin-bottom: 8px;
      font-size: 12px;
      white-space: nowrap;

      .send-time {
        display: inline-block;
        user-select: none;
        opacity: 0;
        transition: opacity 0.3s 1s;
      }
    }

    &-content {
      position: relative;
      width: fit-content;

      .text {
        background-color: #ffffff;
        min-height: 1em;
        padding: 8px 12px;
        font-size: 15px;
        line-height: 22px;
        color: var(--font-main);
        word-break: break-word;
        border-radius: 2px 18px 18px;
      }
    }
  }

  .right {
    flex-direction: row-reverse;

    .message-item-user-info {
      justify-content: flex-end;

      .send-time {
        order: 0;
      }

      .user-name {
        order: 2;
      }
    }

    .message-item-content {
      margin-left: auto;

      .text {
        border-radius: 18px 2px 18px 18px;
      }
    }
  }

  .is-me {
    .message-item-box {
      padding-right: 12px;
      padding-left: 52px;
    }

    .message-item-content {
      display: flex;
      align-items: center;

      .icon-loading {
        margin: 0 8px;
      }

      .text {
        background-color: greenyellow;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { MessageShow } from "@/service/types";
import { TooltipTriggerType } from "element-plus";
import { computed, ref, withDefaults, defineProps } from "vue";
import { useUserStore } from "@/store/user";
import { useCacheStore } from "@/store/cache";

const cacheStore = useCacheStore();
console.log("cacheUserList:", cacheStore.cachedUserList);
const props = withDefaults(
  defineProps<{
    // 消息
    messageShow: MessageShow;
    //是否显示时间节点
    isShowTimeNode?: boolean;
    // 是否显示时间
    isShowTime?: boolean;
    // 消息气泡模式 spread、左对齐：left 右对齐：right
    bubbleMode?: string;
    // 气泡操作触发方式
    opsTriggerMode?: TooltipTriggerType;
  }>(),
  {
    isShowTimeNode: true,
    isShowTime: true,
    bubbleMode: "spread",
    opsTriggerMode: () => "hover",
  }
);
const isRecall = ref(false);
const message = computed(() => props.messageShow.message);
const fromUser = computed(
  () => cacheStore.cachedUserList[props.messageShow.fromUser.userId]
);

const isCurrentUser = useUserStore().loginUser.id === fromUser.value.id;
const messageCls = computed(() => ({
  "message-item": true,
  "is-me": isCurrentUser,
  right: isCurrentUser,
  // (isCurrentUser.value && props.bubbleMode === "spread") ||
  // props.bubbleMode === "right",
}));
</script>
