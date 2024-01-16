import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import {
  Message,
  MessageShow,
  MessageTypeEnum,
  RoomTypeEnum,
  SessionItem,
} from "@/service/types";
import { useGlobalStore } from "@/store/global";
import { Service } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { computedTimeNode } from "@/utils/computeTime";
import { useCacheStore } from "@/store/cache";
import { useGroupStore } from "@/store/group";
import { useContactStore } from "@/store/contact";

export const pageSize = 20;
export let isFirstInit = true;

export const useChatStore = defineStore("chat", () => {
  const globalStore = useGlobalStore();
  const cacheStore = useCacheStore();
  const groupStore = useGroupStore();
  const contactStore = useContactStore();

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
  // 将当前会话消息Map装换为数组
  const chatMessageList = computed(() => [
    ...(currentMessageMap.value?.values() || []),
  ]);
  // 获取消息列表
  const getMsgList = async (size = pageSize) => {
    currentMessageOptions.value &&
      (currentMessageOptions.value.isLoading = true);
    const res = await Service.getMsgListByCursorUsingPost({
      pageSize: size,
      cursor: currentMessageOptions.value?.cursor,
      roomId: currentRoomId.value,
    }).finally(() => {
      currentMessageOptions.value &&
        (currentMessageOptions.value.isLoading = false);
    });
    if (res.code !== 0) {
      message.error("消息列表加载失败 请尝试刷新！");
    }
    const computedList = computedTimeNode(res.data.list);
    // 收集需要请求的用户id
    const userIdSet: Set<number> = new Set();
    computedList.forEach((message) => {
      userIdSet.add(message.fromUser.userId);
    });
    cacheStore.refreshCachedUserVOBatch([...userIdSet]);
    const newList = [...computedList, ...chatMessageList.value];
    currentMessageMap.value?.clear();
    newList.forEach((msg) => {
      currentMessageMap.value?.set(msg.message.id, msg);
    });
    if (currentMessageOptions.value) {
      currentMessageOptions.value.cursor = res.data.cursor;
      currentMessageOptions.value.isLast = res.data.isLast;
      currentMessageOptions.value.isLoading = false;
    }
  };

  // 获取会话列表
  const getSessionList = async (isFresh = false) => {
    if (!isFresh && (sessionOptions.isLast || sessionOptions.isLoading)) {
      return;
    }
    sessionOptions.isLoading = true;
    const res = await Service.getSessionPageByCursorUsingPost({
      pageSize: sessionList.length > pageSize ? sessionList.length : pageSize,
      cursor:
        isFresh || !sessionOptions.cursor ? undefined : sessionOptions.cursor,
    }).catch(() => {
      sessionOptions.isLoading = false;
    });
    if (!res || res.code !== 0) {
      message.error("会话列表加载失败，请尝试刷新！");
      return;
    }
    isFresh
      ? sessionList.splice(0, sessionList.length, ...res.data.list)
      : sessionList.push(...res.data.list);
    // 更新游标参数
    sessionOptions.isLoading = false;
    sessionOptions.cursor = res.data.cursor;
    sessionOptions.isLast = res.data.isLast;

    sortAndUniqueSessionList();

    sessionList[0].unreadCount = 0;
    if (isFirstInit) {
      isFirstInit = true;
      globalStore.currentSession.roomId = res.data.list[0].roomId;
      globalStore.currentSession.type = res.data.list[0].type;
      // 加载会话列表第一个会话的消息列表
      getMsgList();
      // 请求群成员列表
      currentRoomType.value === RoomTypeEnum.Group &&
        groupStore.getGroupList(true);
      // TODO 初始化所有用户基本信息 此处不需要
      // 获取联系人列表
      contactStore.getContactList(true);
    }
  };

  const sortAndUniqueSessionList = () => {
    const temp: Record<string, SessionItem> = {};
    sessionList.forEach((item) => {
      temp[item.roomId] = item;
    });
    sessionList.splice(0, sessionList.length, ...Object.values(temp));
    sessionList.sort((pre, cur) => cur.activeTime - pre.activeTime);
  };

  return { showModal, navFlag };
});
