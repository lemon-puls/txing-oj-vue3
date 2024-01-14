import { defineStore } from "pinia";
import { GroupDetailVO, UserItem } from "@/service/types";
import { computed, reactive, ref } from "vue";
import { useGlobalStore } from "@/store/global";
import { Service } from "../../generated";
import { Message } from "@arco-design/web-vue";
import { uniqueUserList } from "@/utils/Unique";

export const pageSize = 20;
// 标识是否第一次请求
let isFirstInit = false;

export const useGroupStore = defineStore("group", () => {
  const globalStore = useGlobalStore();
  // 群聊用户列表
  const userList = ref<UserItem[]>([]);
  const userListPageOptions = reactive({
    isLast: false,
    loading: true,
    cursor: "",
  });

  const currentRoomId = computed(() => globalStore.currentSession.roomId);

  const groupInfo = ref<GroupDetailVO>({
    avatar: "",
    groupName: "",
    onlineCount: 0,
    roomId: currentRoomId.value,
    role: -1,
  });

  // 获取群成员
  const getGroupList = async (refresh = false) => {
    const data = await Service.getMembersByCursorUsingPost({
      pageSize,
      cursor: refresh ? undefined : userListPageOptions.cursor,
      roomId: currentRoomId.value,
    });
    if (data.code !== 0) {
      Message.error("获取群聊成员失败 请尝试刷新！");
      return;
    }
    userList.value = uniqueUserList(
      refresh ? data.data.list : [...userList.value, ...data.data.list]
    );
    userListPageOptions.cursor = data.data.cursor;
    userListPageOptions.isLast = data.data.isLast;
    userListPageOptions.loading = false;
  };
});
