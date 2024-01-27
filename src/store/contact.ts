import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { reactive } from "vue";
import { ContactItem, FriendApplyItem } from "@/service/types";
import {
  UserApplyControllerService,
  UserFriendControllerService,
} from "../../generated";
import { Message } from "@arco-design/web-vue";
import { FriendApplyStatusEnum } from "@/enume";
import { timeToStr } from "@/utils/computeTime";
import { useCacheStore } from "@/store/cache";
import message from "@arco-design/web-vue/es/message";
import { useChatStore } from "@/store/chat";

export const pageSize = 10;
export const useContactStore = defineStore("contact", () => {
  const globalStore = useGlobalStore();
  const contactList = reactive<ContactItem[]>([]);
  const friendApplyList = reactive<FriendApplyItem[]>([]);
  const cacheStore = useCacheStore();
  const chatStore = useChatStore();

  const contactsOptions = reactive({
    isLast: false,
    isLoading: false,
    cursor: "",
  });
  const friendApplysOptions = reactive({
    isLast: false,
    isLoading: false,
    cursor: "",
  });
  // 获取联系人列表 游标分页
  const getContactList = async (isFresh = false, myPageSize = pageSize) => {
    if (!isFresh) {
      if (contactsOptions.isLast || contactsOptions.isLoading) {
        return;
      }
    }
    contactsOptions.isLoading = true;
    const res = await UserFriendControllerService.listUsingPost5({
      pageSize: myPageSize,
      cursor:
        isFresh || !contactsOptions.cursor ? undefined : contactsOptions.cursor,
    });
    if (res.code !== 0) {
      Message.error("加载联系人列表失败 请尝试刷新！");
      return;
    }
    // 刷新用户信息缓存
    const needLoadUserIds: number[] = [];
    res.data.list.forEach((item: any) => {
      needLoadUserIds.push(item.userId);
    });
    await cacheStore.refreshCachedUserVOBatch(needLoadUserIds);
    isFresh
      ? contactList.splice(0, contactList.length, ...res.data.list)
      : contactList.push(...res.data.list);
    contactsOptions.cursor = res.data.cursor;
    contactsOptions.isLast = res.data.isLast;
    contactsOptions.isLoading = false;
  };
  // 获取加好友请求列表 游标翻页
  const getFriendApplyList = async (isFresh = false) => {
    if (!isFresh) {
      if (friendApplysOptions.isLast || friendApplysOptions.isLoading) {
        return;
      }
    }
    friendApplysOptions.isLoading = true;
    const res =
      await UserApplyControllerService.getFriendApplyPageByCursorUsingPost({
        pageSize,
        cursor:
          isFresh || !friendApplysOptions.cursor
            ? undefined
            : friendApplysOptions.cursor,
      });
    if (res.code !== 0) {
      Message.error("加好友请求数据加载失败，请尝试刷新！");
      return;
    }
    // 格式化以及设置时间
    const needLoadUserIds: number[] = [];
    res.data.list.forEach((item: any) => {
      item.time = timeToStr(item.createTime);
      needLoadUserIds.push(item.userId);
    });
    await cacheStore.refreshCachedUserVOBatch(needLoadUserIds);
    isFresh
      ? friendApplyList.splice(0, friendApplyList.length, ...res.data.list)
      : friendApplyList.push(...res.data.list);
    friendApplysOptions.cursor = res.data.cursor;
    friendApplysOptions.isLast = res.data.isLast;
    friendApplysOptions.isLoading = false;
    if (isFresh && !globalStore.currentSelectedContact) {
      globalStore.currentSelectedContact = friendApplyList[0];
    }

    // 是否需要红点提示
    if (isFresh && friendApplyList[0].readStatus === 0) {
      if (!chatStore.showModal || chatStore.navFlag !== 1) {
        globalStore.isNeedNotify.friendNotify = true;
      }
    }
  };

  // const formatFriendApplyTime = () => {
  //
  // }

  // 同意好友申请
  const onAcceptFriendApply = async (applyId: number) => {
    const res = await UserApplyControllerService.agreeApplyUsingPost(applyId);
    if (res.code !== 0) {
      Message.error(res.msg);
      return;
    }
    // 刷新好友申请列表
    getFriendApplyList(true);
    // 刷新联系人列表
    getContactList(true);
    if (globalStore.currentSelectedContact) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      globalStore.currentSelectedContact.status = FriendApplyStatusEnum.AGREE;
    }
    chatStore.pushMsg(res.data);
  };

  // 删除好友
  const onDeleteContact = async (userId: number) => {
    if (!userId) {
      return;
    }
    const res = await UserFriendControllerService.deleteUsingGet2(userId);
    if (res.code !== 0) {
      message.error("删除失败，请稍后重试！");
    }
    await getContactList(true);
    if (contactList.length > 0) {
      globalStore.currentSelectedContact = contactList[0];
    } else {
      globalStore.currentSelectedContact = undefined;
    }
  };
  return {
    getContactList,
    friendApplyList,
    getFriendApplyList,
    contactList,
    onAcceptFriendApply,
    onDeleteContact,
  };
});
