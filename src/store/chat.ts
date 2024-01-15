import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import {
  Message,
  MessageShow,
  MessageTypeEnum,
  SessionItem,
} from "@/service/types";
import { useGlobalStore } from "@/store/global";
import { Service } from "../../generated";
import message from "@arco-design/web-vue/es/message";

export const pageSize = 20;

export const useChatStore = defineStore("chat", () => {
  const globalStore = useGlobalStore();

  const showModal = ref(false);
  // 聊天导航选择 0: 聊天 1： 联系人
  const navFlag = ref(0);
  // 会话列表
  const sessionList = reactive<SessionItem[]>([]);
  // 会话游标翻页参数
  const sessionOptions = reactive({
    isLast: false,
    isLoading: false,
    cursor: "",
  });
  const currentRoomId = computed(() => globalStore.currentSession?.roomId);
  const currentRoomType = computed(() => globalStore.currentSession?.type);
  const messageMap = reactive<Map<number, Map<number, MessageShow>>>(
    new Map([[currentRoomId.value, new Map()]])
  );
  // 消息游标翻页参数
  const messageOptions = reactive<
    Map<number, { isLast: boolean; isLoading: boolean; cursor: string }>
  >(
    new Map([
      [currentRoomId.value, { isLast: false, isLoading: false, cursor: "" }],
    ])
  );
  // 获取当前会话消息
  const currentMessageMap = computed({
    get: () => {
      const currentMsgMap = messageMap.get(currentRoomId.value as number);
      if (currentMsgMap === undefined) {
        messageMap.set(currentRoomId.value, new Map());
      }
      return messageMap.get(currentRoomId.value as number);
    },
    set: (val) => {
      messageMap.set(currentRoomId.value, val as Map<number, MessageShow>);
    },
  });
  // 获取当前会话游标翻页参数
  const currentMessageOptions = computed({
    get: () => {
      const currentOptions = messageOptions.get(currentRoomId.value as number);
      if (currentOptions === undefined) {
        messageOptions.set(currentRoomId.value, {
          isLast: false,
          isLoading: false,
          cursor: "",
        });
      }
      return messageOptions.get(currentRoomId.value as number);
    },
    set: (val) => {
      messageOptions.set(
        currentRoomId.value,
        val as { isLast: boolean; isLoading: boolean; cursor: string }
      );
    },
  });

  // 使消息列表滚动到底部的函数 有外部提供
  const chatListToBottomAction = ref<() => void>();
  // 会话新消息数Map
  const newMsgCountMap = reactive<
    Map<number, { count: number; isStart: boolean }>
  >(
    new Map([
      [
        currentRoomId.value,
        {
          count: 0,
          isStart: false,
        },
      ],
    ])
  );
  // 获取当前会话新消息数信息
  const currentNewCount = computed({
    get: () => {
      const current = newMsgCountMap.get(currentRoomId.value as number);
      if (current === undefined) {
        newMsgCountMap.set(currentRoomId.value, { count: 0, isStart: false });
      }
      return newMsgCountMap.get(currentRoomId.value as number);
    },
    set: (val) => {
      newMsgCountMap.set(
        currentRoomId.value,
        val as { count: number; isStart: boolean }
      );
    },
  });

  // 获取消息列表
  const getMsgList = async (size = pageSize) => {
    currentMessageOptions.value &&
      (currentMessageOptions.value.isLoading = true);
    const res = await Service.getMsgListByCursorUsingPost({
      pageSize: size,
      cursor: currentMessageOptions.value?.cursor,
      roomId: currentRoomId.value,
    }).finally(() => {
      currentMessageOptions.value && (currentMessageOptions.value.isLoading = false);
    });
    if (res.code !== 0) {
      message.error("消息列表加载失败 请尝试刷新！");
    }
    const computedList = computedTimeBlock(res.data.list);

  };

  return { showModal, navFlag };
});
