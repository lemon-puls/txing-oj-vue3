import { defineStore } from "pinia";
import { ref } from "vue";

export const useForumStore = defineStore("forum", () => {
  const isShowPostDialog = ref(false);
  const currentTopicId = ref(-1);
  const open = (topicId: number) => {
    isShowPostDialog.value = true;
    currentTopicId.value = topicId;
  };
  const close = () => {
    isShowPostDialog.value = false;
    currentTopicId.value = -1;
  };
  return {
    isShowPostDialog,
    open,
    close,
    currentTopicId,
  };
});
