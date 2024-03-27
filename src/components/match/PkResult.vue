<template>
  <div id="pkResultId">
    <div class="pk-info">
      <div class="pk-info-left">
        <div
          class="avatar-container"
          :style="{ width: imgContainerWidth, height: imgSize }"
        >
          <img
            class="imgx"
            :style="{
              width: props.imgSize,
              height: props.imgSize,
              borderRadius: '50%',
            }"
            :src="props.player1?.userAvatar"
          />
          <div
            class="user1-res-info"
            :style="{ fontSize: props.fontSize + 'px' }"
          >
            <span>{{ props.player1?.score }}</span>
          </div>
        </div>
        <span :style="{ fontSize: 0.25 * props.fontSize }">{{
          props.player1?.userName
        }}</span>
        <span
          v-if="matchResult && matchResult.winnerId != 0"
          style="font-size: 15px; color: red"
          >{{
            matchResult && userStore.loginUser.id == matchResult.winnerId
              ? "恭喜你 胜出了比赛！"
              : "可惜 差一点就赢了！"
          }}</span
        >
      </div>
      <div class="pk-info-right">
        <div
          class="avatar-container"
          :style="{ width: imgContainerWidth, height: imgSize }"
        >
          <img
            class="imgx"
            :style="{
              width: props.imgSize,
              height: props.imgSize,
              borderRadius: '50%',
            }"
            :src="props.player2?.userAvatar"
          />
          <div
            class="user2-res-info"
            :style="{ fontSize: props.fontSize + 'px' }"
          >
            <span>{{ props.player2?.score }}</span>
          </div>
        </div>
        <span :style="{ fontSize: 0.25 * props.fontSize }">{{
          props.player2?.userName
        }}</span>
        <span
          v-if="matchResult && matchResult.winnerId != 0"
          style="font-size: 15px; color: red"
          >{{
            matchResult && !(userStore.loginUser.id == matchResult.winnerId)
              ? "恭喜你 胜出了比赛！"
              : "可惜 差一点就赢了！"
          }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const props = defineProps({
  player1: {
    type: Object,
    default: () => ({}),
  },
  player2: {
    type: Object,
    default: () => ({}),
  },
  matchResult: {
    type: Object,
    default: () => undefined,
  },
  imgSize: {
    type: String,
    default: () => "200px",
  },
  imgContainerWidth: {
    type: String,
    default: () => "700px",
  },
  fontSize: {
    type: String,
    default: () => "80",
  },
});
</script>

<style scoped lang="scss">
#pkResultId {
  .pk-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 30px;
    text-align: center;

    .pk-info-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;

      .avatar-container {
        position: relative;
        display: inline-block;
        z-index: 100;

        .user1-res-info {
          position: absolute;
          left: 82%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }
      }

      .avatar-container::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 50%; /* 控制右侧显示蓝色的宽度 */
        background-color: #00c4ff; /* 设置蓝色背景 */
        z-index: -1;
        border-top-right-radius: 175px; /* 设置右上角为圆角 */
        border-bottom-right-radius: 175px; /* 设置右下角为圆角 */
      }
    }

    .pk-info-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;

      .avatar-container {
        position: relative;
        display: inline-block;
        z-index: 100;

        .user2-res-info {
          position: absolute;
          left: 18%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }
      }

      .avatar-container::before {
        content: "";
        position: absolute;
        top: 0;
        right: 50%;
        bottom: 0;
        left: 0; /* 控制右侧显示蓝色的宽度 */
        background-color: #f089e0; /* 设置蓝色背景 */
        z-index: -1;
        border-top-left-radius: 175px; /* 设置右上角为圆角 */
        border-bottom-left-radius: 175px; /* 设置右下角为圆角 */
      }
    }
  }
}
</style>
