import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chat", () => {
  const showModal = ref(false);
  // 聊天导航选择 0: 聊天 1： 联系人
  const navFlag = ref(0);
  return { showModal, navFlag };
});
