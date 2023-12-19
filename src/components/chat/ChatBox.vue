<template>
  <div class="overlay" v-if="showModal" @click="handleClickOutside"></div>
  <div id="chatBoxId" v-if="showModal">
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
</template>

<script setup lang="ts">
// 聊天框显隐
import { ref } from "vue";

const showModal = ref(true);
const handleClickOutside = () => {
  showModal.value = false;
};
</script>

<style scoped>
/*聊天框*/
#chatBoxId {
  width: 80vw;
  height: 40vw;
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
