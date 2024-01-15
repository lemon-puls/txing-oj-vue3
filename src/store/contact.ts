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

export const pageSize = 20;
export const useContactStore = defineStore("contact", () => {
  const globalStore = useGlobalStore();
  const contactList = reactive<ContactItem[]>([]);
  const friendApplyList = reactive<FriendApplyItem[]>([]);

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
  const getContactList = async (isFresh = false) => {
    if (!isFresh) {
      if (contactsOptions.isLast || contactsOptions.isLoading) {
        return;
      }
    }
    contactsOptions.isLoading = true;
    const res = await UserFriendControllerService.listUsingPost7({
      pageSize,
      cursor:
        isFresh || !contactsOptions.cursor ? undefined : contactsOptions.cursor,
    });
    if (res.code !== 0) {
      Message.error("加载联系人列表失败 请尝试刷新！");
      return;
    }
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
    isFresh
      ? friendApplyList.splice(0, friendApplyList.length, ...res.data.list)
      : friendApplyList.push(...res.data.list);
    friendApplysOptions.cursor = res.data.cursor;
    friendApplysOptions.isLast = res.data.isLast;
    friendApplysOptions.isLoading = false;
  };

  // 同意好友申请
  const onAcceptFriendApply = async (applyId: number) => {
    const res = await UserApplyControllerService.agreeApplyUsingPost(applyId);
    if (res.code !== 0) {
      Message.error("操作失败, 请尝试刷新！");
      return;
    }
    // 刷新好友申请列表
    getFriendApplyList(true);
    // 刷新联系人列表
    getContactList(true);
    if (globalStore.currentSelectedContact) {
      // @ts-ignore
      globalStore.currentSelectedContact.status = FriendApplyStatusEnum.AGREE;
    }
  };

  // 删除好友
  const onDeleteContact = async (userId: number) => {
    if (!userId) {
      return;
    }
    // TODO 待完成
  };
});
