<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header :class="{ header: true, hide: shouldHide }">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <!--      <a-layout-footer class="footer">-->
      <!--        <a href="https://gitee.com/lemon_plus" target="_blank">-->
      <!--          Txing By Bitdf-->
      <!--        </a>-->
      <!--      </a-layout-footer>-->
    </a-layout>
    <chat-box></chat-box>
  </div>
</template>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader";
import { onBeforeUnmount, onMounted, ref } from "vue";
import ChatBox from "@/components/chat/ChatBox.vue";

const handleScroll = () => {
  if (window.pageYOffset > 300) {
    shouldHide.value = true;
  } else {
    shouldHide.value = false;
  }
};

// 注册滚动事件监听器
window.addEventListener("scroll", handleScroll);

// 在组件卸载前移除滚动事件监听器
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const shouldHide = ref<boolean>(false);
</script>

<style scoped>
#basicLayout .header {
  background: #ffffff;
  /*margin-bottom: 16px;*/
  box-shadow: #eee 1px 1px 5px;

  position: sticky;
  top: 0px;
  transition: top 0.3s;

  left: 0;
  right: 0;
  z-index: 5000;
}

.hide {
  top: -70px !important;
}

#basicLayout .content {
  /*background: linear-gradient(to right, #eee, #fff);*/
  background: url("../assets/背景1.png") 0% 0% / 100% 100%;
  background-size: cover;
  background-attachment: fixed;
  /*filter: blur(10px);*/
  /*margin-bottom: 16px;*/
  /*padding: 20px;*/
  /*自己加的*/
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
}

#basicLayout .footer {
  background: #e9d28a;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  text-align: center;
  z-index: 9999;
}
</style>
