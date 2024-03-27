<template>
  <div id="courseSunItemId">
    <div class="left">
      <span>{{ video.orderNo }}</span>
      <span>{{ video.name }}</span>
    </div>
    <div class="right">
      <SvgIcon class="icon" icon="edit" size="15" @click="onEdit"></SvgIcon>
      <SvgIcon class="icon" icon="delete" size="15" @click="onDelete"></SvgIcon>
      <div class="right-img" @click="openVideoDialog">
        <img :src="video.coverUrl" />
        <span class="times">{{ formatSecondsToTime(video.times) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, defineEmits, ref, defineProps } from "vue";
import SvgIcon from "@/icons/SvgIcon";
import { useVideoStore } from "@/store/video";
import VideoPlayerDialog from "@/components/course/VideoPlayerDialog.vue";
import { VideoBaseInfo } from "@/service/types";
import { formatSecondsToTime } from "../../utils/computeTime";

const videoStore = useVideoStore();

const props = defineProps(["video", "index"]);

const openVideoDialog = () => {
  videoStore.show(props.video.fileId);
};

let $emit = defineEmits(["onEdit", "onDelete"]);
const onEdit = () => {
  $emit("onEdit", props.video, props.index);
};
const onDelete = () => {
  $emit("onDelete", props.video, props.index);
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
