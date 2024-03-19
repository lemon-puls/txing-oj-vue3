<template>
  <div id="courseSunItemId">
    <div class="left">
      <span>1</span>
      <span>001_尚硅谷_Golang可以做什么</span>
    </div>
    <div class="right">
      <SvgIcon class="icon" icon="edit" size="15"></SvgIcon>
      <SvgIcon class="icon" icon="delete" size="15"></SvgIcon>
      <div class="right-img" @click="openVideoDialog">
        <img src="../../assets/course.jpg" />
        <span class="times">117:16:23</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import SvgIcon from "@/icons/SvgIcon";
import { useVideoStore } from "@/store/video";
import VideoPlayerDialog from "@/components/course/VideoPlayerDialog.vue";

const videoStore = useVideoStore();
const openVideoDialog = () => {
  videoStore.show();
};
</script>

<style scoped lang="scss">
#courseSunItemId {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    span {
      margin-left: 10px;
    }
  }

  .right {
    display: flex;
    justify-content: flex-end;

    .right-img {
      position: relative;

      img {
        width: 150px;
        height: auto;
      }

      .times {
        position: absolute;
        bottom: 0;
        right: 0;
        color: white;
        margin-bottom: 5px;
        margin-right: 5px;
      }
    }

    .icon {
      margin: 0 5px 5px 5px;
      align-self: flex-end;
    }
  }
}
</style>
