<template>
  <div id="courseVideoPlayViewId">
    <div class="left">
      <div class="course-title">
        <span>【尚硅谷】Golang入门到实战教程丨一套精通GO语言</span>
      </div>
      <div class="course-other-info">
        <span>2019-10-27 11:58:34</span>
      </div>
      <div class="course-video-player">
        <VideoPlayer
          :tc-player-id="tcPlayerId"
          file-id="1397757887182254627"
        ></VideoPlayer>
        <div class="player-footer">
          <icon-star-fill
            @click="onFavour"
            v-if="isFavour"
            style="color: #deac14"
            :size="30"
          />
          <icon-star v-else @click="onFavour" :size="30" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="user-info">
        <div class="user-info-avatar">
          <img src="../../../assets/course.jpg" />
        </div>
        <div class="user-info-other">
          <span class="name">热爱生活的气瓶</span>
          <span class="sign"
            >就业规划、简历模板、毕业设计，加小谷姐姐Q：312478...</span
          >
        </div>
      </div>
      <div class="course-catalog">
        <div class="course-catalog-header">
          <span>视频选集 </span>
          <span style="color: rgba(40, 30, 30, 0.5)">(1/388)</span>
        </div>
        <hr />
        <div class="course-catalog-item" v-for="i in 15" :key="i">
          <span>P{{ i }} 001_尚硅谷_Golang可以做什么</span>
          <span style="color: rgba(40, 30, 30, 0.5)">21:30</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import VideoPlayer from "@/components/course/VideoPlayer.vue";
import { IconStarFill, IconStar } from "@arco-design/web-vue/es/icon";

let tcPlayerId = "tcPlayer" + Date.now();

let playerKey = ref(1);
onMounted(() => {
  playerKey.value++;
});

const isFavour = ref(false);
const onFavour = () => {
  isFavour.value = !isFavour.value;
};
</script>

<style scoped lang="scss">
#courseVideoPlayViewId {
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;
  display: flex;
  justify-content: center;

  .course-title {
    font-size: min(1.5vw, 20px);
    margin: 10px 0;
  }

  .course-other-info {
    margin: 10px;
    color: #979797;
  }

  .left {
    .player-footer {
      width: 60vw;
      height: 40px;
      background-color: white;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }

  .right {
    margin-left: 20px;
    margin-top: 20px;
    max-width: 20vw;

    .user-info {
      display: flex;
      align-items: center;
      column-gap: 10px;
      margin: 10px 0;

      .user-info-avatar {
        img {
          height: 35px;
          width: 35px;
          border-radius: 50%;
        }
      }

      .user-info-other {
        display: flex;
        flex-direction: column;
        row-gap: 5px;

        .name {
          font-size: 15px;
          color: #007bff;
        }

        .sign {
          color: #979797;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .course-catalog {
      background-color: rgba(222, 219, 219, 0.5);
      border-radius: 10px;
      padding: 10px;

      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2px 0;
        cursor: pointer;
        padding: 6px;
        border-radius: 5px;

        &:hover {
          background-color: white;
        }
      }
    }
  }
}
</style>
