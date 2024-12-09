<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
    "
  >
    <video
      id="player-container-id"
      preload="auto"
      width="960"
      height="540"
      playsinline
      webkit-playsinline
      x5-playsinline
    ></video>
  </div>
</template>

<script setup>
import TCPlayer from "tcplayer.js";
import { onMounted } from "vue";

onMounted(() => {
  // player-container-id 为播放器容器 ID，必须与 html 中一致
  var player = TCPlayer("player-container-id", {
    // player-container-id 为播放器容器ID，必须与html中一致
    fileID: "xxx", // 请传入需要播放的视频fileID 必须
    appID: "xxx", // 请传入点播账号的子应用appID 必须
    psign: "xxx", // 请传入播放器签名psign 必须
    autoplay: false, // 是否自动播放
    // 其他参数请在开发文档中查看
    licenseUrl:
      "https://license.vod2.myqcloud.com/license/v2/xxx/v_cube.license",
  });
});
</script>

<style>
@import "tcplayer.js/dist/tcplayer.min.css";
</style>
