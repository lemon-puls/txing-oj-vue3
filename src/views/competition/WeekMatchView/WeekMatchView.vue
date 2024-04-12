<!--
* @WeekMatchView
* @author Li zhiwei
* @date 2024/2/4 9:40
-->

<template>
  <div id="WeekMatchView">
    <div class="latest-match">
      <div class="latest-match-info">
        <div class="latest-match-session">
          <span>{{ matchData?.name }}</span>
        </div>
        <div class="latest-match-time">
          <span
            >中国时间：{{ matchData?.startTime }} -
            {{ matchData?.endTime }}</span
          >
        </div>
        <div class="latest-match-distance">
          <span
            >距离开始还有：
            <a-countdown
              :value-style="{ color: 'white', fontSize: '18px' }"
              :value="startTime"
              :now="now"
              format="D 天 H 时 m 分 s 秒"
          /></span>
        </div>
      </div>
      <div class="latest-match-ops">
        <span
          style="color: #fcf743; font-size: 17px"
          v-if="matchStatus === 1"
          @click="onJoinMatch"
          >点击参加</span
        >

        <span
          v-else-if="matchStatus === 0"
          style="color: #fcf743; font-size: 17px"
        >
          未开始
        </span>
        <span v-else style="color: #fcf743; font-size: 17px"> 已结束 </span>
      </div>
    </div>
    <div class="match-rank-and-back">
      <div class="match-rank">
        <div class="match-rank-title">
          <span>本周排名（{{ lastWeekMatch?.name }}）</span>
        </div>
        <div class="match-rank-content" v-if="weekRankData">
          <div
            class="match-rank-content-item"
            v-for="item in weekRankData"
            :key="item.rank"
          >
            <div>
              <a-divider />
            </div>
            <div class="match-rank-content-item-info">
              <div class="match-rank-content-item-info-left">
                <img
                  style="border-radius: 50%; width: 25px; height: 25px"
                  height="20px"
                  width="20px"
                  :src="item.avatar"
                />
                <span>{{ item.userName }}</span>
              </div>
              <div class="match-rank-content-item-info-right">
                <SvgIcon v-if="item.rank === 1" icon="no1" :size="30" />
                <SvgIcon v-else-if="item.rank === 2" icon="no2" :size="30" />
                <SvgIcon v-else-if="item.rank === 3" icon="no3" :size="30" />
                <span v-else>{{ item.rank }}</span>
              </div>
            </div>
          </div>
        </div>
        <a-empty v-else />
      </div>
      <div class="match-back">
        <div class="match-back-title"><span>往期赛事</span></div>
        <div class="match-back-content" v-if="historyMatchData">
          <div
            class="match-back-content-item"
            v-for="item in historyMatchData"
            :key="item.id"
          >
            <a-divider />
            <div class="match-back-content-item-info">
              <div class="match-back-content-item-info-session">
                <SvgIcon icon="week" :size="25" />
                <span>{{ item.name }}</span>
              </div>
              <div class="match-back-content-item-info-time">
                <SvgIcon icon="clock" :size="25" />
                <span>{{ item?.startTime }} - {{ item?.endTime }}</span>
              </div>
              <div class="match-back-content-item-info-ops">
                <!--                <a-button type="primary" status="warning" shape="round"-->
                <!--                  >模拟-->
                <!--                </a-button>-->
                <span @click="onSimulate(item.id)">模拟</span>
              </div>
            </div>
          </div>
        </div>
        <a-empty v-else />
      </div>
    </div>
    <div class="user-rank">
      <div class="user-rank-title"><span>全国排名</span></div>
      <div class="user-rank-content" v-if="nationalRankData">
        <div
          class="user-rank-content-item"
          v-for="item in nationalRankData"
          :key="item.userId"
        >
          <div>
            <a-divider />
          </div>
          <div class="user-rank-content-item-info">
            <div class="user-rank-content-item-info-left">
              <span>{{ item.rank }}</span>
              <img
                style="border-radius: 50%; width: 25px; height: 25px"
                height="20px"
                width="20px"
                :src="item.avatar"
              />
              <span>{{ item.userName }}</span>
            </div>
            <div class="user-rank-content-item-info-right">
              <SvgIcon icon="score" :size="25" />
              <span>{{ item.score }}分</span>
            </div>
          </div>
        </div>
      </div>
      <a-empty v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#WeekMatchView {
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;

  .latest-match {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    //margin: 10px;
    background-color: #f2f2f2;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-image: url("@/assets/match-center.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 14px;

    .latest-match-info {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
    }

    .latest-match-session {
      font-weight: bold;
      font-size: 20px;
    }

    .latest-match-ops {
      margin: auto 0;
      cursor: pointer;
    }
  }

  .match-rank-and-back {
    display: flex;
    justify-content: center;
    column-gap: 15px;
    margin-top: 20px;

    .match-rank {
      width: 35%;
      //background-color: #f2f2f2;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
      border-radius: 10px;

      &-title {
        color: #383434;
        font-size: 20px;
        font-weight: bold;
        margin: 10px 10px;
        background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
        padding: 10px;
        border-radius: 10px;
      }

      &-content {
        margin-bottom: 20px;
        height: 500px;
        max-height: 600px;
        overflow-y: auto;

        &-item {
          &-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 15px;

            &-left {
              display: flex;
              column-gap: 10px;
              align-items: center;
            }
          }
        }
      }
    }

    .match-back {
      width: 47%;
      //background-color: #f2f2f2;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
      border-radius: 10px;

      &-title {
        color: #383434;
        font-size: 20px;
        font-weight: bold;
        margin: 10px 10px;
        background-image: linear-gradient(
          -225deg,
          #9efbd3 0%,
          #57e9f2 48%,
          #45d4fb 100%
        );
        padding: 10px;
        border-radius: 10px;
      }

      &-content {
        margin-bottom: 15px;
        height: 500px;
        overflow-y: scroll;
        max-height: 600px;
        overflow-y: auto;

        &-item {
          &-info {
            display: flex;
            justify-content: space-around;
            align-items: center;

            &-time {
              display: flex;
              align-items: center;
              column-gap: 10px;
            }

            &-session {
              display: flex;
              align-items: center;
              column-gap: 10px;
            }

            &-ops {
              cursor: pointer;

              &:hover {
                color: #007bff;
              }
            }
          }
        }
      }
    }
  }

  //用户竞赛总分排名样式
  .user-rank {
    width: 81%;
    //background-color: #f2f2f2;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 15px;
    margin: 10px auto;

    &-title {
      color: #383434;
      font-size: 20px;
      font-weight: bold;
      margin: 10px 10px;
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
      padding: 10px;
      border-radius: 10px;
    }

    &-content {
      margin-bottom: 20px;

      &-item {
        &-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 15px;

          &-left {
            display: flex;
            column-gap: 10px;
            align-items: center;
            flex: 8;
          }

          &-right {
            display: flex;
            align-items: center;
            column-gap: 10px;
            flex: 1;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {
  MatchWeekAppControllerService,
  UserControllerService,
} from "../../../../generated";
import message from "@arco-design/web-vue/es/message";
import SvgIcon from "@/icons/SvgIcon";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();
const onJoinMatch = () => {
  if (!userStore.isSign) {
    message.warning("请先登录！");
    return;
  }
  router.push({
    path: "/txing/match/week/do",
  });
};

const matchData = ref();
const weekRankData = ref();
const nationalRankData = ref();
const historyMatchData = ref();
const lastWeekMatch = ref();

// 开始倒计时
const now = Date.now();
let startTime;
let matchStatus = ref(0);
const loadMatchData = async () => {
  const res = await MatchWeekAppControllerService.getNextMatchUsingGet();
  if (res.code != 0) {
    message.error("比赛数据加载失败：" + res.msg);
    return;
  }
  matchData.value = res.data;
  const nowDate = Date.now();
  startTime = Date.parse(matchData.value.startTime);
  const endTime = Date.parse(matchData.value.endTime);
  if (nowDate < startTime) {
    matchStatus.value = 0;
  } else if (nowDate < endTime) {
    matchStatus.value = 1;
  } else {
    matchStatus.value = 2;
  }
};
const loadWeekRankData = async () => {
  const res = await MatchWeekAppControllerService.getMatchRankUsingGet();
  if (res.code !== 0) {
    message.error("本周排名数据加载失败：" + res.msg);
    return;
  }
  weekRankData.value = res.data;
};
const loadHistoryMatchData = async () => {
  const res = await MatchWeekAppControllerService.getWeekMatchHistoryUsingGet();
  if (res.code !== 0) {
    message.error("历史比赛加载失败：", res.msg);
    return;
  }
  historyMatchData.value = res.data;
};
const loadNationalRankData = async () => {
  const res = await UserControllerService.getUserScoreRankUsingGet();
  if (res.code !== 0) {
    message.error(res.msg);
    return;
  }
  nationalRankData.value = res.data;
};

const loadLastWeekMatchData = async () => {
  const res = await MatchWeekAppControllerService.getLastWeekMatchUsingGet();
  if (res.code !== 0) {
    message.error(res.msg);
    return;
  }
  lastWeekMatch.value = res.data;
};
onMounted(() => {
  loadMatchData();
  loadWeekRankData();
  loadHistoryMatchData();
  loadNationalRankData();
  loadLastWeekMatchData();
});

// 去模拟
const onSimulate = async (matchId: number) => {
  if (!userStore.isSign) {
    message.warning("请先登录！");
    return;
  }
  router.push({
    path: "/txing/match/week/simulate/" + matchId,
  });
};
</script>
