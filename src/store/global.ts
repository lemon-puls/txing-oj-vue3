import { defineStore } from "pinia";
import { reactive } from "vue";
import { RoomTypeEnum } from "@/enume";

export const useGlobalStore = defineStore("global", () => {
  /**
   * 当前选中会话
   */
  const currentSession = reactive<{ roomId: number; type: RoomTypeEnum }>({
    roomId: 1,
    type: RoomTypeEnum.GROUP,
  });

  return { currentSession };
});
