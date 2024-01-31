<!--
* @MessageList
* @author Li zhiwei
* @date 2023/12/21 14:33
-->

<template>
  <div id="MessageList" @contextmenu.prevent>
    <div class="sesion-header">
      <span class="session-name">{{ currentSessionItem?.name }}</span>
    </div>
    <hr class="advier-line" />
    <VirtualList
      v-if="msgList?.length"
      data-prop-name="messageShow"
      :data-key="getKey"
      :item="MessageItem"
      :size="20"
      :data="msgList"
      class="virtual-list"
      ref="virtualListRef"
      @totop="onToTop"
      @scroll="onScroll"
      @ok="goToBottom"
    />
  </div>
</template>

<style scoped lang="scss">
#MessageList {
  display: flex;
  flex-direction: column;
  height: 100%;

  .sesion-header {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .session-name {
      margin-left: 10px;
      font-size: var(--font-size-chat-room-name);
      font-family: var(--font-family-chat-message-content);
    }
  }

  .advier-line {
    color: #d0d0d0;
    margin: 0 0;
    margin-bottom: 10px;
  }

  .virtual-list {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 99%;
    margin: 0 auto;
    /// / 100 % 时谷歌浏览器会出现无法滚动问题
    padding-right: 5px;
    padding-left: 5px;
    overflow-y: auto;
    flex: 1;
  }
}
</style>

<script setup lang="ts">
import VirtualList from "@/components/VirtualList";
import MessageItem from "@/components/chat/chat/messageList/MessageItem.vue";
// 测试数据
import { computed, nextTick, onMounted, provide, ref } from "vue";
import { MessageShow } from "@/service/types";
import { useGlobalStore } from "@/store/global";
import { useChatStore } from "@/store/chat";
import { throttle } from "lodash";

const globalStore = useGlobalStore();
const chatStore = useChatStore();
const currentSessionItem = computed(() => chatStore.currentSessionItem);
const msgList = computed(() => chatStore.chatMessageList);
const messageOptions = computed(() => chatStore.currentMessageOptions);
const virtualListRef = ref();
const currentNewMsgCount = computed(() => chatStore.currentNewCount);

onMounted(() => {
  nextTick(() => {
    chatStore.chatListToBottomAction = () => {
      goToBottom();
    };
  });
});

const msgListOld = ref([
  {
    fromUser: {
      userId: 1,
      userName: "lemon",
      avatar:
        "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    },
    message: {
      id: 1,
      roomId: 1,
      type: 0,
      body: {
        content: "今天刷算法题",
      },
      sendTime: 1234567890,
    },
    sendTime: "18:30",
    timeNode: "08:30",
    loading: false,
  },
]);

const getKey = (item: MessageShow) => item.message.id;

// 滚动到顶部后 加载更多消息 以及 使得滚动条滚动到原来位置
const onToTop = async () => {
  if (messageOptions.value?.isLoading) {
    return;
  }
  const oldIndex = virtualListRef.value.getSizes();
  await chatStore.loadMore();
  virtualListRef.value.scrollToIndex(
    virtualListRef.value.getSizes() - oldIndex
  );
};
// 滚动时触发 主要是判断是否滚动到底部 如果是 就不用记录新消息数 如果不是 就需要计数
const onScroll = throttle((eventData) => {
  const { offset, clientSize, scrollSize } = eventData;
  if (!offset || !clientSize || !scrollSize) {
    return;
  }
  // 是否已滚动到底部
  const isScrollEnd = offset + clientSize >= scrollSize - clientSize;
  if (isScrollEnd) {
    currentNewMsgCount.value && (currentNewMsgCount.value.isStart = false);
    chatStore.clearNewMsgCount();
  } else {
    currentNewMsgCount.value && (currentNewMsgCount.value.isStart = true);
  }
}, 100);

// 使滚动条回到底部
const goToBottom = () => {
  if (virtualListRef.value) {
    console.log("==================================触发回到底部");
    virtualListRef.value.scrollToBottom();
    chatStore.clearNewMsgCount();
  }
};

// 提供虚拟列表ref给子组价使用
provide("virtualListRef", virtualListRef);
</script>
