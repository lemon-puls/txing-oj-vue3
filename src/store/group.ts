import { defineStore } from "pinia";
import { GroupDetailVO, UserItem } from "@/service/types";
import { computed, reactive, ref } from "vue";
import { useGlobalStore } from "@/store/global";
import { Service } from "../../generated";
import { Message } from "@arco-design/web-vue";
import { uniqueUserList } from "@/utils/Unique";
import { useCacheStore } from "@/store/cache";
import { cloneDeep } from "lodash";
import { useUserStore } from "@/store/user";
import { OnlineEnum } from "@/enume";

export const pageSize = 300;
// 标识是否第一次请求
// let isFirstInit = false;

export const useGroupStore = defineStore("group", () => {
  const globalStore = useGlobalStore();
  const cacheStore = useCacheStore();
  const userStore = useUserStore();
  // 群聊用户列表
  const userList = ref<UserItem[]>([]);
  let userListPageOptions = reactive({
    isLast: false,
    loading: true,
    cursor: "",
  });

  const currentRoomId = computed(() => globalStore.currentSession.roomId);

  const groupInfo = ref<GroupDetailVO>({
    avatar: "",
    groupName: "",
    onlineCount: 0,
    roomId: -1,
    role: -1,
    memberOrNot: false,
    forbiddenOrNot: false,
  });

  const resetGroupStore = () => {
    userList.value = [];
    userListPageOptions = {
      isLast: false,
      loading: true,
      cursor: "",
    };
  };

  // 获取群成员
  const getGroupMemberList = async (refresh = false) => {
    const res = await Service.getMembersByCursorUsingPost({
      pageSize,
      cursor: refresh ? undefined : userListPageOptions.cursor,
      roomId: currentRoomId.value,
    });
    if (res.code !== 0) {
      Message.error("获取群聊成员失败 请尝试刷新！");
      return;
    }
    userList.value = uniqueUserList(
      refresh ? res.data.list : [...userList.value, ...res.data.list]
    );
    userListPageOptions.cursor = res.data.cursor;
    userListPageOptions.isLast = res.data.isLast;
    userListPageOptions.loading = false;
    // 刷新用户缓存
    const userIds: Set<number> = new Set();
    res.data.list.forEach((user: any) => {
      userIds.add(user.userId);
    });
    userList.value.forEach((item) => {
      if (item.userId == userStore.loginUser.id) {
        item.activeStatus = OnlineEnum.ONLINE;
      }
    });
    await cacheStore.refreshCachedUserVOBatch([...userIds]);
    // 获取最新的群聊成员的在线状态，以免用户刚登录上时获取到其的在线状态不是最新 临时使用这种方法 @TODO 有时间再考虑优化
    // userList.value.forEach((item) => {
    //   item.activeStatus = cacheStore.getUserById(item.userId as number)
    //     .activeStatus as number;
    // });
    // console.log(userList.value, cacheStore.cachedUserList);
  };

  // 获取群聊信息
  const getGroupDetail = async () => {
    const res = await Service.groupDetailUsingGet(currentRoomId.value);
    if (res.code !== 0) {
      Message.error("获取群聊信息失败，请尝试刷新！");
      return;
    }
    groupInfo.value = res.data;
  };

  // 更新用户在线状态
  const updateUserStatusBatch = (items: UserItem[]) => {
    const tempNew = cloneDeep(userList.value);
    for (let i = 0; i < items.length; i++) {
      const curUser = items[i];
      const findIndex = tempNew.findIndex(
        (item) => item.userId === curUser.userId
      );
      findIndex > -1 &&
        (tempNew[findIndex].activeStatus = curUser.activeStatus);
    }
    userList.value = tempNew;
  };

  return {
    getGroupMemberList,
    getGroupDetail,
    updateUserStatusBatch,
    groupInfo,
    userList,
    resetGroupStore,
  };
});
