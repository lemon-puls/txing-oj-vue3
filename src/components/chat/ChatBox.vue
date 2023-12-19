<template>
  <div
    class="overlay"
    v-if="useChatStore().showModal"
    @click="handleClickOutside"
  ></div>
  <transition
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutRight"
  >
    <div id="chatBoxId" v-if="useChatStore().showModal">
      <a-row class="grid-demo">
        <a-col style="background-color: yellow" :span="1">
          <div>6 - 25%</div>
        </a-col>
        <a-col style="background-color: green" :span="5">
          <div>6 - 25%</div>
        </a-col>
        <a-col style="background-color: blue" :span="14">
          <div>6 - 25%</div>
        </a-col>
        <a-col style="background-color: black" :span="4">
          <div>6 - 25%</div>
        </a-col>
      </a-row>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "@/store/chat";
// 聊天框显隐
const handleClickOutside = () => {
  useChatStore().showModal = false;
};
</script>

<style scoped>
/*聊天框*/
#chatBoxId {
  --width: 80vw;
  --hight: 40vw;
  width: var(--width);
  height: var(--hight);
  background-color: white;
  position: fixed;
  left: calc(50% - var(--width) / 2);
  top: calc(50% - var(--hight) / 2);
  /*transform: translateX(-50%);*/
  /*transform: translateX(-50%);*/
  z-index: 10001;
  border-radius: 20px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}
</style>
