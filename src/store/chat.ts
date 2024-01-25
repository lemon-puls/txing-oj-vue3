import { defineStore } from "pinia";
import { computed, reactive, ref, watch, watchEffect } from "vue";
import {
  Message,
  MessageShow,
  MessageTypeEnum,
  SessionItem,
} from "@/service/types";
import { useGlobalStore } from "@/store/global";
import { Service, UserApplyControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { computedTimeNode } from "@/utils/computeTime";
import { useCacheStore } from "@/store/cache";
import { useGroupStore } from "@/store/group";
import { useContactStore } from "@/store/contact";
import { cloneDeep } from "lodash";
import { RoomTypeEnum } from "@/enume";

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
  // 当前会话详情
  const currentSessionItem = computed(() => {
    return sessionList.find(
      (item) =>
        item.roomId.toString() === globalStore.currentSession.roomId.toString()
    );
  });
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
        messageMap.set(Number(currentRoomId.value), new Map());
      }
      return messageMap.get(Number(currentRoomId.value));
    },
    set: (val) => {
      messageMap.set(
        Number(currentRoomId.value),
        val as Map<number, MessageShow>
      );
    },
  });
  // 获取当前会话游标翻页参数
  const currentMessageOptions = computed({
    get: () => {
      const currentOptions = messageOptions.get(currentRoomId.value as number);
      if (currentOptions === undefined) {
        messageOptions.set(Number(currentRoomId.value), {
          isLast: false,
          isLoading: false,
          cursor: "",
        });
      }
      return messageOptions.get(Number(currentRoomId.value));
    },
    set: (val) => {
      messageOptions.set(
        Number(currentRoomId.value),
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
      const current = newMsgCountMap.get(Number(currentRoomId.value));
      if (current === undefined) {
        newMsgCountMap.set(Number(currentRoomId.value), {
          count: 0,
          isStart: false,
        });
      }
      return newMsgCountMap.get(Number(currentRoomId.value));
    },
    set: (val) => {
      newMsgCountMap.set(
        Number(currentRoomId.value),
        val as { count: number; isStart: boolean }
      );
    },
  });

  // 当选中会话变动时 作出调整
  watch(currentRoomId, async (val, oldVal) => {
    if (oldVal !== undefined && val !== oldVal) {
      groupStore.groupInfo.roomId = -1;
      chatListToBottomAction.value?.();
      if (!currentMessageMap.value || currentMessageMap.value.size === 0) {
        if (!currentMessageMap.value) {
          messageMap.set(currentRoomId.value as number, new Map());
        }
        getMsgList();
      }

      if (currentRoomType.value === RoomTypeEnum.GROUP) {
        await groupStore.getGroupMemberList(true);
        await groupStore.getGroupDetail();
      }
    }
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
    // console.log("需要更新的用户id:", userIdSet);
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

    // sessionList[0].unreadCount = 0;
    if (isFirstInit) {
      isFirstInit = false;

      // 判断是否有未读消息
      let isHasUnread = false;
      for (let i = 0; i < sessionList.length; i++) {
        const cur = sessionList[i];
        if (cur.unreadCount > 0) {
          isHasUnread = true;
          break;
        }
      }
      globalStore.isNeedNotify.messageNotify = isHasUnread;

      globalStore.currentSession.roomId = 1;
      globalStore.currentSession.type = RoomTypeEnum.GROUP;
      // 加载会话列表第一个会话的消息列表
      getMsgList();
      // 请求群成员列表
      currentRoomType.value === RoomTypeEnum.GROUP &&
        groupStore.getGroupMemberList(true);
      // TODO 初始化所有用户基本信息 此处不需要
      // 获取联系人列表
      contactStore.getContactList(true);
      // 获取群聊详情
      groupStore.getGroupDetail();
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

  // 更新会话
  const updateSession = (
    roomId: number,
    newSessionItem: Partial<SessionItem>
  ) => {
    const oldSession = sessionList.find(
      (item) => item.roomId.toString() === roomId.toString()
    );
    console.log("before:", oldSession, newSessionItem, roomId);
    delete newSessionItem.unreadCount;
    oldSession && newSessionItem && Object.assign(oldSession, newSessionItem);
    console.log("after:", oldSession, newSessionItem);
    sortAndUniqueSessionList();
  };
  // 更新会话活跃时间
  const updateSessionLastActiveTime = (
    roomId: number,
    newSessionItem?: SessionItem
  ) => {
    const oldSession = sessionList.find((item) => item.roomId === roomId);
    if (oldSession) {
      Object.assign(oldSession, { activeTime: Date.now() });
    } else if (newSessionItem) {
      const temp = cloneDeep(newSessionItem);
      temp.activeTime = Date.now();
      sessionList.unshift(temp);
    }
    sortAndUniqueSessionList();
  };

  // 发送消息
  const pushMsg = async (msg: MessageShow) => {
    // alert(msg.message.id);
    const currentMsgMap = messageMap.get(Number(msg.message.roomId));
    console.log("前 roomId:", msg.message.roomId, messageMap.get(1));
    console.log("前：", currentMsgMap, msg);
    currentMsgMap?.set(msg.message.id, msg);
    console.log("后：", currentMsgMap);
    // 加载相关用户信息至缓存中
    const userId = msg.fromUser.userId;
    const cacheUser = cacheStore.cachedUserList[userId];
    cacheStore.refreshCachedUserVOBatch([userId]);

    // 刷新会话列表
    // if (
    //   globalStore.currentSession &&
    //   globalStore.currentSession.roomId.toString() !==
    //     msg.message.roomId.toString()
    // ) {
    console.log("刷新会话列表----");
    // let result = undefined;
    // if (!showModal.value || navFlag.value !== 0) {
    //   globalStore.currentSession.roomId = msg.message.roomId;
    //   // TODO  为什么是私聊
    //   globalStore.currentSession.type = RoomTypeEnum.SINGLE;
    // if (!currentMsgMap) {
    //   result = await Service.getDetailByRoomIdUsingGet(msg.message.roomId);
    // }
    //   showModal.value = true;
    //   navFlag.value = 0;
    // }
    const res = await Service.getDetailByRoomIdUsingGet(msg.message.roomId);
    updateSession(msg.message.roomId, res.data);
    updateSessionLastActiveTime(msg.message.roomId, res?.data);
    // }

    if (currentNewCount.value && currentNewCount.value.isStart) {
      currentNewCount.value.count++;
      return;
    }
    // 会话未读消息计数
    if (
      currentRoomId.value.toString() !== msg.message.roomId.toString() ||
      !showModal.value ||
      navFlag.value === 1
    ) {
      const item = sessionList.find(
        (item) => item.roomId.toString() === msg.message.roomId.toString()
      );
      if (item) {
        console.log("糟了 +1了");
        item.unreadCount += 1;
      }
    }
    // 如果当前不处于聊天界面 则计数
    if (
      !showModal.value ||
      navFlag.value !== 0 ||
      globalStore.currentSession.roomId.toString() !==
        msg.message.roomId.toString()
    ) {
      console.log("总未读消息数： +1");
      globalStore.unReadMark.newMessageUnreadCount += 1;
    }
    // 如果正打开当前会话 则需要向后端报告阅读时间 以免下次重新打开系统时未读消息数不正确
    if (
      showModal.value &&
      navFlag.value === 0 &&
      globalStore.currentSession.roomId.toString() ===
        msg.message.roomId.toString()
    ) {
      Service.msgReadReportUsingPost(globalStore.currentSession.roomId);
    }
    // 判断是需要红点提示
    if (!showModal.value || navFlag.value === 1) {
      globalStore.isNeedNotify.messageNotify = true;
    }

    // 聊天消息列表滚动到底部
    setTimeout(() => {
      chatListToBottomAction.value?.();
    });
    console.log("刷新会话列表结束");
  };

  const loadMore = async (size?: number) => {
    if (
      currentMessageOptions.value?.isLast ||
      currentMessageOptions.value?.isLoading
    ) {
      return;
    }
    await getMsgList(size);
  };

  const clearNewMsgCount = () => {
    currentNewCount.value && (currentNewCount.value.count = 0);
  };

  // 删除消息
  const deleteMsg = (msgId: number) => {
    currentMessageMap.value?.delete(Number(msgId));
  };
  // 更新消息
  const updateMsg = (msgId: number, newMessage: MessageShow) => {
    deleteMsg(msgId);
    pushMsg(newMessage);
  };

  // 标记会话未读消息数为0
  const markSessionRead = (roomId: number) => {
    const session = sessionList.find((item) => item.roomId === roomId);
    const unreadCount = session?.unreadCount || 0;
    if (session) {
      session.unreadCount = 0;
    }
    return unreadCount;
  };

  // 切换会话时修改未读消息数
  // watch(currentRoomId, (val) => {
  //   Service.msgReadReportUsingPost(val);
  //   const unreadCount = markSessionRead(val);
  //   const curTotalUnreadCount =
  //     globalStore.unReadMark.newMessageUnreadCount - unreadCount;
  //   globalStore.unReadMark.newMessageUnreadCount =
  //     curTotalUnreadCount > 0 ? curTotalUnreadCount : 0;
  // });
  watchEffect(() => {
    if (showModal.value && navFlag.value === 0 && currentRoomId) {
      Service.msgReadReportUsingPost(currentRoomId.value);
      const unreadCount = markSessionRead(currentRoomId.value);
      const curTotalUnreadCount =
        globalStore.unReadMark.newMessageUnreadCount - unreadCount;
      globalStore.unReadMark.newMessageUnreadCount =
        curTotalUnreadCount > 0 ? curTotalUnreadCount : 0;

      globalStore.isNeedNotify.messageNotify = false;
    }
    if (showModal.value && navFlag.value === 1) {
      globalStore.isNeedNotify.friendNotify = false;
      UserApplyControllerService.markReadFriendApplyUsingGet();
      if (contactStore.friendApplyList.length > 0) {
        contactStore.friendApplyList[0].readStatus = 1;
      }
    }
  });

  return {
    getSessionList,
    showModal,
    navFlag,
    pushMsg,
    sessionList,
    currentSessionItem,
    chatMessageList,
    currentMessageOptions,
    loadMore,
    currentNewCount,
    clearNewMsgCount,
    chatListToBottomAction,
    deleteMsg,
    updateMsg,
    updateSessionLastActiveTime,
    currentMessageMap,
    messageMap,
    markSessionRead,
  };
});
