<template>
  <div id="courseVideoPlayViewId">
    <div class="left">
      <div class="course-title">
        <span>{{ courseData?.name }}</span>
      </div>
      <div class="course-other-info">
        <span>{{ courseData?.createTime }}</span>
      </div>
      <div v-if="currentVideo?.fileId" class="course-video-player">
        <VideoPlayer
          :tc-player-id="tcPlayerId"
          :file-id="currentVideo.fileId"
          :key="playerKey"
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
          <AvatarPopover
            :user-name="userShowVO?.userName"
            :user-avatar="userShowVO?.userAvatar"
            :sign="userShowVO?.personSign"
            :is-friend="isFriend(userShowVO?.id)"
            :user-id="Number(userShowVO?.id)"
            trigger="hover"
          >
            <template #target>
              <div>
                <img :src="courseData?.coverUrl" />
              </div>
            </template>
          </AvatarPopover>
        </div>
        <div class="user-info-other">
          <span class="name">{{ courseData?.name }}</span>
          <span class="sign">{{ courseData?.intro }}</span>
        </div>
      </div>
      <div class="course-catalog">
        <div class="course-catalog-header">
          <span>视频选集 </span>
          <span style="color: rgba(40, 30, 30, 0.5)"
            >({{ index + 1 }}/{{ courseData?.noduleCount }})</span
          >
        </div>
        <hr />
        <div
          :class="{ courseCatalogItem: true, isPlaying: i == index }"
          v-for="(video, i) in courseData?.videoVOS"
          :key="video.id"
          @click="onSelectNodule(i)"
        >
          <span
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
            >P{{ video.orderNo }} {{ video.name }}</span
          >
          <span style="color: rgba(40, 30, 30, 0.5)">{{
            formatSecondsToTime(video.times)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from "vue";
import VideoPlayer from "@/components/course/VideoPlayer.vue";
import { IconStarFill, IconStar } from "@arco-design/web-vue/es/icon";
import { CourseAppControllerService } from "../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { formatSecondsToTime } from "../../../utils/computeTime";
import { useContactStore } from "@/store/contact";
import { useUserStore } from "@/store/user";
import AvatarPopover from "@/components/user/AvatarPopover.vue";

const props = defineProps(["courseId"]);

const contactStore = useContactStore();
const userStore = useUserStore();
const isFriend = (userId: any) => {
  return (
    contactStore.contactList.find((cur) => cur.userId.toString() == userId) !==
      undefined || userId == userStore.loginUser.id.toString()
  );
};

let tcPlayerId = ref("tcPlayer" + Date.now());

let playerKey = ref(1);
onMounted(() => {
  loadCourseData();
});

const isFavour = ref(false);
const onFavour = () => {
  isFavour.value = !isFavour.value;
};

// 加载数据
const courseData = ref();
const userShowVO = ref();
const loadCourseData = async () => {
  const res = await CourseAppControllerService.getVideoPlayVoUsingGet(
    props.courseId
  );
  if (res.code != 0) {
    message.error("数据加载失败：", res.msg);
    return;
  }
  courseData.value = res.data;
  userShowVO.value = res.data.userShowVO;
  onSelectNodule(0);
};

// 正在播放的视频
let index = 0;
const currentVideo = ref();
const onSelectNodule = (curIndex: number) => {
  index = curIndex;
  currentVideo.value = courseData.value?.videoVOS[index];
  tcPlayerId.value = "tcPlayer" + Date.now();
  playerKey.value++;
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
    width: 20vw;

    .user-info {
      display: flex;
      align-items: flex-start;
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
          //white-space: nowrap;
          //overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .course-catalog {
      background-color: rgba(222, 219, 219, 0.5);
      border-radius: 10px;
      padding: 10px;

      .courseCatalogItem {
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

      .isPlaying {
        background-color: white;
      }
    }
  }
}
</style>
