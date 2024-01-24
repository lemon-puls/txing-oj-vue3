import { MessageShow } from "@/service/types";
import { MsgTypeEnum } from "@/enume";
import { useGlobalStore } from "@/store/global";
import { useUserStore } from "@/store/user";
import { computed } from "vue";

export const useMockMessage = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.loginUser);
  const currentRoomId = computed(() => globalStore.currentSession.roomId);

  const mockMessage = (type: number, body: any): MessageShow => {
    const currentTimeStamp: number = Date.now();
    const random: number = Math.floor(Math.random() * 15);
    const uniqueId = Number(String(currentTimeStamp).slice(-7) + random);
    const content = type === MsgTypeEnum.TEXT ? body.content : null;
    const { id, userName, userAvatar } = userInfo.value;

    const data = {
      fromUser: {
        userId: id,
        userName,
        userAvatar,
      },
      message: {
        id: uniqueId,
        roomId: currentRoomId.value,
        sendTime: Number(currentTimeStamp),
        content,
        type: type,
        body,
      },
      sendTime: String(currentTimeStamp),
      loading: true,
    };
    return data;
  };
  return {
    mockMessage,
  };
};
