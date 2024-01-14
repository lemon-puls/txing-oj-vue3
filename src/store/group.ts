import { defineStore } from "pinia";
import { GroupDetailVO, UserItem } from "@/service/types";
import { computed, reactive, ref } from "vue";
import { useGlobalStore } from "@/store/global";
import { Service } from "../../generated";

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
    await Service.getMembersByCursorUsingPost({});
  };
});
