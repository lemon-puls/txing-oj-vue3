<template>
  <div id="videoPlayerDialogId">
    <video
      :id="tcPlayerId"
      class="videos"
      preload="auto"
      :style="{ width: '60vw', height: 'calc((540 / 960) * 60vw)' }"
      playsinline
      webkit-playsinline
      x5-playsinline
    ></video>
    <SvgIcon
      @click="handleClickOutside"
      class="icon"
      icon="shutdown"
      :size="40"
    ></SvgIcon>
  </div>
</template>

<script setup>
import { useVideoStore } from "@/store/video";
import { defineProps, onMounted } from "vue";
import TCPlayer from "tcplayer.js";
import SvgIcon from "@/icons/SvgIcon";

let tcPlayerId = "tcPlayer" + Date.now();

const videoStore = useVideoStore();
const handleClickOutside = (event) => {
  event.preventDefault();
  videoStore.close();
};
let player = null;
onMounted(() => {
  // player-container-id 为播放器容器 ID，必须与 html 中一致
  player = TCPlayer(tcPlayerId, {
    // player-container-id 为播放器容器ID，必须与html中一致
    fileID: "xxx", // 请传入需要播放的视频fileID 必须
    appID: "xxx", // 请传入点播账号的子应用appID 必须
    psign:
      "xxx", // 请传入播放器签名psign 必须
    autoplay: false, // 是否自动播放
    // 其他参数请在开发文档中查看
    licenseUrl:
      "https://license.vod2.myqcloud.com/license/v2/xxx/v_cube.license",
    // sources: [
    //   {
    //     src: "https://xxx.vod-qcloud.com/xxx.m3u8", // hls 自适应码率地址
    //   },
    // ],
  });
});
</script>

<style lang="scss">
@import "tcplayer.js/dist/tcplayer.min.css";

#videoPlayerDialogId {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(56, 52, 52, 0.4);
  z-index: 10000;

  .videos {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon {
    position: fixed;
    top: 10%;
    right: 10%;
  }

  //限制右键弹框
  .tcp-right-click-popup-menu {
    z-index: -1 !important;
  }
}
</style>
