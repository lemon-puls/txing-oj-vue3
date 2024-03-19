import { defineStore } from "pinia";
import { ref } from "vue";

export const useVideoStore = defineStore("video", () => {
  const visible = ref(false);

  /**
   * 打开预览
   */
  const show = () => {
    visible.value = true;
  };

  /**
   * 关闭图片预览
   */
  const close = () => {
    visible.value = false;
  };

  return {
    visible,
    show,
    close,
  };
});
