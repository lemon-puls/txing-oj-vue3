import { defineStore } from "pinia";
import { useGlobalStore } from "@/store/global";
import { computed, reactive } from "vue";
import { UserCacheVO } from "@/service/types";
import { isDiffNow10Min } from "@/utils/computeTime";
import { UserControllerService } from "../../generated";
import { Message } from "@arco-design/web-vue";
import item from "@/components/VirtualList/item";

type BaseUserItem = Pick<UserCacheVO, "id" | "userAvatar" | "userName">;
export const useCacheStore = defineStore("cache", () => {
  const globalStore = useGlobalStore();
  const cachedUserList = reactive<Record<number, Partial<UserCacheVO>>>({});
  const currentRoomId = computed(() => globalStore.currentSession.roomId);
  const atUsersMap = reactive<Record<number, BaseUserItem[]>>({
    [currentRoomId.value]: [],
  });
  // 批量刷新用户信息缓存
  const refreshCachedUserVOBatch = async (
    userIds: number[],
    refresh = false
  ) => {
    const result = userIds
      .map((userId) => {
        const cacheUser = cachedUserList[userId];
        return { userId, lastModifyTime: cacheUser?.lastModifyTime };
      })
      .filter((item) => {
        return (
          refresh || !item.lastModifyTime || isDiffNow10Min(item.lastModifyTime)
        );
      });
    if (!result.length) return;
    const res = await UserControllerService.getUserVoBatchUsingPost({
      requestList: result,
    });
    if (res.code !== 0) {
      Message.error("请求用户数据失败，请尝试刷新页面！");
      return;
    }
    res.data.forEach((item: any) => {
      const curUserItem = {
        ...(item?.needRefresh ? item : cachedUserList[item.id]),
        needRefresh: undefined,
        lastModifyTime: Date.now(),
      };
      cachedUserList[item.id] = curUserItem;
    });
  };

  const getUserById = (userId: number): Partial<UserCacheVO> => {
    const user = cachedUserList[Number(userId)];
    if (!user) {
      refreshCachedUserVOBatch([userId]);
    }
    return user;
  };

  return { refreshCachedUserVOBatch, cachedUserList, getUserById };
});
