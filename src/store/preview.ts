import { defineStore } from "pinia";
import { ref } from "vue";

export const useImgPreviewStore = defineStore("image", () => {
  const previewUrls = ref<string[]>([]);
  const visible = ref(false);
  const currentIndex = ref<number>(0);

  /**
   * 打开预览
   */
  const show = (urls: string[], current = 0) => {
    previewUrls.value = urls;
    visible.value = true;
    currentIndex.value = current;
  };

  /**
   * 关闭图片预览
   */
  const close = () => {
    visible.value = false;
    previewUrls.value.splice(0);
    currentIndex.value = 0;
  };

  return {
    previewUrls,
    visible,
    show,
    close,
    currentIndex,
  };
});
