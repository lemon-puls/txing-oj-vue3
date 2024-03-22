<template>
  <div id="pkResultViewId">
    <div class="content">
      <div class="icon">
        <SvgIcon v-if="!matchResult" icon="waitting" :size="200" />
        <SvgIcon
          v-else-if="matchResult.winnerId == 0"
          icon="draw"
          :size="200"
        />
        <SvgIcon v-else-if="!isWinner" icon="fail" :size="200" />
        <SvgIcon v-else-if="isWinner" icon="win" :size="200" />
      </div>

      <div class="pk-info">
        <div class="pk-info-left">
          <div class="avatar-container" style="width: 700px">
            <img
              style="width: 200px; height: 200px; border-radius: 50%"
              :src="userStore?.loginUser?.userAvatar"
            />
            <div class="user1-res-info">
              <span>{{ score1 }}</span>
            </div>
          </div>
          <span style="font-size: 20px">{{
            userStore?.loginUser?.userName
          }}</span>
          <span
            v-if="matchResult && matchResult.winnerId != 0"
            style="font-size: 15px; color: red"
            >{{
              matchResult && userId == matchResult.winnerId
                ? "恭喜你 胜出了比赛！"
                : "可惜 差一点就赢了！"
            }}</span
          >
        </div>
        <div class="pk-info-right">
          <div class="avatar-container" style="width: 700px">
            <img
              style="width: 200px; height: 200px; border-radius: 50%"
              :src="matchStore.pkUserShowVO?.userAvatar"
            />
            <div class="user2-res-info">
              <span>{{ score2 }}</span>
            </div>
          </div>
          <span style="font-size: 20px">{{
            matchStore.pkUserShowVO?.userName
          }}</span>
          <span
            v-if="matchResult && matchResult.winnerId != 0"
            style="font-size: 15px; color: red"
            >{{
              matchResult && !(userId == matchResult.winnerId)
                ? "恭喜你 胜出了比赛！"
                : "可惜 差一点就赢了！"
            }}</span
          >
        </div>
      </div>
      <div v-if="!matchResult || matchResult.winnerId == 0">
        <span
          v-if="matchResult && matchResult.winnerId == 0"
          style="color: #7d7979"
          >本局你们打成了平手，实力不相上下嘛！</span
        >
        <span v-else style="color: #7d7979"
          >比赛结果尚未出来 请稍后再查看！</span
        >
      </div>
      <div style="margin-top: 30px">
        <a-space>
          <a-button shape="round" status="normal" @click="onBack"
            >返回主页
          </a-button>
          <a-button shape="round" type="primary" @click="onAgain"
            >再来一局
          </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/icons/SvgIcon";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import {
  withDefaults,
  defineProps,
  onMounted,
  ref,
  computed,
  onUnmounted,
} from "vue";
import {
  MatchOnlinepkAppControllerService,
  QuestionSubmitControllerService,
} from "../../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useMatchStore } from "@/store/match";
import { usePkStore } from "@/store/pk";

const userStore = useUserStore();
const matchStore = useMatchStore();
const router = useRouter();
const pkStore = usePkStore();

onMounted(async () => {
  await getPkResult();
  if (!matchResult.value) {
    startTimer();
  }
});

onUnmounted(() => {
  pkStore.updatePkMatchData(false, -1);
});

/**
 * 接收matchId
 */
interface Props {
  matchId: number;
}

const props = withDefaults(defineProps<Props>(), {
  matchId: () => -1,
});

const userId = userStore.loginUser.id;
const score1: any = computed(() => {
  if (matchResult.value) {
    return matchResult.value.userId1 == userId
      ? matchResult.value.score1.toFixed(0)
      : matchResult.value.score2.toFixed(0);
  } else {
    return "?";
  }
});
const score2 = computed(() => {
  if (matchResult.value) {
    return matchResult.value.userId1 == userId
      ? matchResult.value.score2.toFixed(0)
      : matchResult.value.score1.toFixed(0);
  } else {
    return "?";
  }
  // return matchResult.value ? matchResult.value.score2.toFixed(0) : "?";
  // return matchResult.value
  //   ? matchResult.value.userId2 == userId
  //     ? matchResult.value.score2.toFixed(0)
  //     : matchResult.value.score1.toFixed(0)
  //   : "?";
});
const matchResult = ref();
let intervalId: any;
const getPkResult = async () => {
  const res = await MatchOnlinepkAppControllerService.getPkResultUsingGet(
    props.matchId
  );
  if (res.code !== 0) {
    message.error("比赛数据加载失败：", res.msg);
    return;
  }
  if (res.data != null) {
    // 条件满足，清除定时器
    if (intervalId) {
      clearInterval(intervalId);
    }
    matchResult.value = res.data;
    if (userId == matchResult.value.userId1) {
      matchStore.setPkUserShowVO(matchResult.value.userVo2);
    } else {
      matchStore.setPkUserShowVO(matchResult.value.userVo1);
    }
  }
};
// 定时器 查询比赛结果
const startTimer = () => {
  intervalId = setInterval(getPkResult, 5000); // 每秒执行一次，间隔时间为 1000 毫秒
};
//     {
//   userId1: "1",
//   userId2: "2",
//   userVo1: {
//     id: "1",
//     userName: "lemon123456",
//     userAvatar:
//       "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1/PYorLjF1-往昔汗水_The sweat of the past_1_SaYoii_来自小红书网页版.jpg",
//   },
//   userVo2: {
//     id: "2",
//     userName: "小霜",
//     userAvatar:
//       "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
//   },
//   // score1: 68.7,
//   // score2: 68.69999999999999,
//   winnerId: "1",
// };
const isWinner = computed(() => {
  return (
    matchResult.value &&
    userStore.loginUser.id.toString() == matchResult.value.winnerId
  );
});

// 返回主页
const onBack = () => {
  router.push({
    path: "/txing",
  });
};
// 再来一局
const onAgain = () => {
  router.push({
    path: "/txing/match/pk/matching",
  });
};
</script>

<style scoped lang="scss">
#pkResultViewId {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 20000;

  .content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    row-gap: 10px;

    .icon {
      text-align: center;
    }

    .pk-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 30px;

      .pk-info-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10px;

        .avatar-container {
          position: relative;
          display: inline-block;
          height: 200px;

          .user1-res-info {
            position: absolute;
            left: 82%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 80px;
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
          height: 200px;

          .user2-res-info {
            position: absolute;
            left: 18%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 80px;
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
}
</style>
