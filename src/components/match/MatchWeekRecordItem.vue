<template>
  <div id="MatchWeekRecordItemId">
    <!--    场次 时间 作答用时 排名（1/1000） ac（1/5）-->
    <div class="item session" title="场次">
      <SvgIcon class="icon" icon="week" :size="30" />
      <span>第一场周赛</span>
    </div>
    <div class="item time" title="时间">
      <SvgIcon class="icon" icon="clock" :size="30" />
      <span>2024:03:25 10:30:00</span>
    </div>
    <div class="item duration" title="作答用时">
      <SvgIcon class="icon" icon="duration" :size="30" />
      <span>01:30:00</span>
    </div>
    <div class="item ac" title="AC题目比例">
      <SvgIcon class="icon" icon="ac" :size="30" />
      <span>3 / 5</span>
    </div>
    <div class="item rank" title="乘积排行">
      <SvgIcon class="icon" icon="rank" :size="30" />
      <span>1 / 2000</span>
    </div>
    <div class="item score" title="本场获得积分">
      <SvgIcon class="icon" icon="score" :size="30" />
      <span>56</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@/icons/SvgIcon";
</script>

<style scoped lang="scss">
#MatchWeekRecordItemId {
  border-radius: 20px;
  background-color: rgba(230, 226, 226, 0.5);
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //color: rgba(40, 30, 30, 0.51);
  margin-bottom: 10px;

  .session {
  }

  .item {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 16px;
  }

  .score {
  }
}
</style>
