<template>
  <div id="basicLayout">
    <a-layout class="layout-container">
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
    <StatementFooter />
    <chat-box></chat-box>
    <VideoPlayerDialog v-if="videoStore.visible" />
    <ForumDetail v-if="forumStore.isShowPostDialog" />
  </div>

  <a-image-preview-group
    v-model:visible="visible"
    v-model:current="current"
    infinite
    :srcList="previewImgList"
    @visible-change="onImgPreviewVisibleChange"
  />
</template>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader";
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import ChatBox from "@/components/chat/ChatBox.vue";
import { useUserStore } from "@/store/user";
import { useGlobalStore } from "@/store/global";
import Ws from "@/utils/websocket";
import { useImgPreviewStore } from "@/store/preview";
import VideoPlayerDialog from "@/components/course/VideoPlayerDialog.vue";
import { useVideoStore } from "@/store/video";
import ForumDetail from "@/components/forum/ForumDetail.vue";
import { useForumStore } from "@/store/forum";
import StatementFooter from "@/components/StatementFooter.vue";

const userStore = useUserStore();
const globalStore = useGlobalStore();
const videoStore = useVideoStore();
const forumStore = useForumStore();
onMounted(async () => {
  if (!userStore.isSign) {
    await userStore.getLoginUser();
  }
  // 当用户刷新页面后 此时就需要重新建立ws连接
  // console.log(
  //   "isSign:",
  //   userStore.isSign,
  //   "ws:",
  //   globalStore.ws,
  //   "loginUser:",
  //   userStore.loginUser
  // );
  nextTick(() => {
    if (userStore.isSign && globalStore.ws === undefined) {
      // console.log("用户刷新页面 重新建立websocket连接");
      if (globalStore.ws) {
        globalStore.ws.closeWsConnection();
      }
      globalStore.ws = new Ws();
    }
  });
});

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

/**
 * 图片预览
 */
const imgPreviewStore = useImgPreviewStore();
const visible = computed(() => imgPreviewStore.visible);
const current = computed({
  get: () => {
    return imgPreviewStore.currentIndex;
  },
  set: (val: number) => {
    imgPreviewStore.currentIndex = val;
  },
});
const onImgPreviewVisibleChange = () => {
  if (visible.value) {
    imgPreviewStore.close();
  }
};
const previewImgList = computed(() => imgPreviewStore.previewUrls);
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
  min-height: calc(100vh - 120px);
  box-sizing: border-box;
}

.layout-container {
  min-height: 100vh;
}
</style>
