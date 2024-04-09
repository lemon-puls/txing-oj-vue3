<template>
  <div id="pkRecordItemId">
    <div class="left">
      <PkResult
        style="width: 300px"
        :player1="{
          userAvatar: resultVO.userVo1.userAvatar,
          userName: resultVO.userVo1.userName,
          score: resultVO.score1,
        }"
        :player2="{
          userAvatar: resultVO.userVo2.userAvatar,
          userName: resultVO.userVo2.userName,
          score: resultVO.score2,
        }"
        img-size="40px"
        img-container-width="150px"
        font-size="20"
      />
    </div>
    <div class="center">
      <div class="question">
        <SvgIcon icon="question1" :size="25"></SvgIcon>
        <span style="margin-left: 10px">{{ props.record.questionName }}</span>
      </div>
      <div class="time">
        <SvgIcon icon="clock" :size="25"></SvgIcon>
        <span style="margin-left: 10px">{{ props.record.startTime }}</span>
      </div>
      <div class="duration">
        <SvgIcon icon="duration" :size="25"></SvgIcon>
        <span style="margin-left: 10px">{{ duration }}</span>
      </div>
    </div>
    <div class="right">
      <SvgIcon v-if="winStatus == 1" icon="win" :size="60" />
      <SvgIcon v-else-if="winStatus == -1" icon="fail" :size="60" />
      <SvgIcon v-else icon="draw" :size="60" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PkResult from "@/components/match/PkResult.vue";
import SvgIcon from "@/icons/SvgIcon";
import { defineProps, ref } from "vue";
import { useUserStore } from "@/store/user";
import { formatSecondsToTime } from "@/utils/computeTime";

const props = defineProps(["record"]);
const resultVO = ref(props.record.resultVO);
const userStore = useUserStore();
const duration = ref();
const winStatus = ref(0);
if (userStore.loginUser.id == resultVO.value.winnerId) {
  winStatus.value = 1;
} else if (resultVO.value.winnerId != 0) {
  winStatus.value = -1;
}
if (userStore.loginUser.id == resultVO.value.userId1) {
  duration.value = formatSecondsToTime(resultVO.value.useSeconds1);
} else {
  duration.value = formatSecondsToTime(resultVO.value.useSeconds2);
}
</script>

<style lang="scss" scoped>
#pkRecordItemId {
  border-radius: 20px;
  background-color: rgba(230, 226, 226, 0.5);
  padding: 10px 5px 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(40, 30, 30, 0.51);
  margin-bottom: 10px;

  .center {
    display: flex;
    align-items: center;
    flex: initial;
    column-gap: 20px;

    .question {
      display: flex;
      align-items: center;
    }

    .duration {
      display: flex;
      align-items: center;
    }

    .time {
      display: flex;
      align-items: center;
    }
  }

  .right {
    flex: initial;
    text-align: center;
    margin-right: 20px;
  }
}
</style>
