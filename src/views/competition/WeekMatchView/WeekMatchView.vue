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
          <span>第 385 场周赛</span>
        </div>
        <div class="latest-match-time">
          <span>中国时间：2024-02-18 10:30 ~ 12:00</span>
        </div>
        <div class="latest-match-distance">
          <span>距离开始还有：13小时52分18秒</span>
        </div>
      </div>
      <div class="latest-match-ops">
        <span style="color: #fcf743; font-size: 17px" @click="onJoinMatch"
          >点击参加</span
        >
      </div>
    </div>
    <div class="match-rank-and-back">
      <div class="match-rank">
        <div class="match-rank-title"><span>全国排名</span></div>
        <div class="match-rank-content">
          <div class="match-rank-content-item" v-for="i in 10" :key="i">
            <div>
              <a-divider />
            </div>
            <div class="match-rank-content-item-info">
              <div class="match-rank-content-item-info-left">
                <span>{{ i }}</span>
                <img
                  style="border-radius: 50%; width: 25px; height: 25px"
                  height="20px"
                  width="20px"
                  src="https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1/PYorLjF1-%E5%BE%80%E6%98%94%E6%B1%97%E6%B0%B4_The%20sweat%20of%20the%20past_1_SaYoii_%E6%9D%A5%E8%87%AA%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%BD%91%E9%A1%B5%E7%89%88.jpg"
                />
                <span>孤独的根号3</span>
              </div>
              <div class="match-rank-content-item-info-right">
                <span>8000分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="match-back">
        <div class="match-back-title"><span>往期赛事</span></div>
        <div class="match-back-content">
          <div class="match-back-content-item" v-for="i in 10" :key="i">
            <a-divider />
            <div class="match-back-content-item-info">
              <div class="match-back-content-item-info-session">
                <span>第 385 场周赛</span>
              </div>
              <div class="match-back-content-item-info-time">
                <span>2024-02-18 10:30 ~ 12:00</span>
              </div>
              <div class="match-back-content-item-info-ops">
                <a-button type="primary" status="warning" shape="round"
                  >模拟
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#WeekMatchView {
  max-width: 1280px;
  width: 70vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;

  .latest-match {
    width: 70%;
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
    }
  }

  .match-rank-and-back {
    display: flex;
    justify-content: center;
    column-gap: 15px;
    margin-top: 20px;

    .match-rank {
      width: 30%;
      background-color: #f2f2f2;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;

      &-title {
        color: #7d7979;
        font-size: 20px;
        font-weight: bold;
        margin: 10px 10px;
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
            }
          }
        }
      }
    }

    .match-back {
      width: 42%;
      background-color: #f2f2f2;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;

      &-title {
        color: #7d7979;
        font-size: 20px;
        font-weight: bold;
        margin: 10px 10px;
      }

      &-content {
        margin-bottom: 15px;

        &-item {
          &-info {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const onJoinMatch = () => {
  router.push({
    path: "/txing/match/week/do",
  });
};
</script>
