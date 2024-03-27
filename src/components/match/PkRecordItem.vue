<template>
  <div id="pkRecordItemId">
    <div class="left">
      <PkResult
        style="width: 300px"
        :player1="{
          userAvatar:
            'https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg',
          userName: 'lemon',
          score: 100,
        }"
        :player2="{
          userAvatar:
            'https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1/PYorLjF1-%E5%BE%80%E6%98%94%E6%B1%97%E6%B0%B4_The%20sweat%20of%20the%20past_1_SaYoii_%E6%9D%A5%E8%87%AA%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%BD%91%E9%A1%B5%E7%89%88.jpg',
          userName: '明天会更好',
          score: 98,
        }"
        img-size="40px"
        img-container-width="150px"
        font-size="20"
      />
    </div>
    <div class="center">
      <div class="question">
        <SvgIcon icon="question1" :size="25"></SvgIcon>
        <span style="margin-left: 10px">四数之和</span>
      </div>
      <div class="time">
        <SvgIcon icon="clock" :size="25"></SvgIcon>
        <span style="margin-left: 10px">2024:03:25 10:30:00</span>
      </div>
      <div class="duration">
        <SvgIcon icon="duration" :size="25"></SvgIcon>
        <span style="margin-left: 10px">01:30:00</span>
      </div>
    </div>
    <div class="right">
      <SvgIcon icon="win" :size="60" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PkResult from "@/components/match/PkResult.vue";
import SvgIcon from "@/icons/SvgIcon";
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
