import { defineStore } from "pinia";
import { ref } from "vue";

export const useVideoStore = defineStore("video", () => {
  const visible = ref(false);
  // 当前正在播放的视频fileId
  const fileId = ref();

  /**
   * 打开预览
   */
  const show = (fileid: number) => {
    visible.value = true;
    fileId.value = fileid;
  };

  /**
   * 关闭图片预览
   */
  const close = () => {
    visible.value = false;
    fileId.value = undefined;
  };

  return {
    visible,
    show,
    close,
    fileId,
  };
});
