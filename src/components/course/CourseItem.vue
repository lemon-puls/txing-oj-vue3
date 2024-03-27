<template>
  <div id="courseItemId">
    <div class="container">
      <img :src="props.course.coverUrl" />
      <span>{{ formatSecondsToTime(props.course.times) }}</span>
    </div>
    <div class="title">
      <span>{{ props.course.name }}</span>
    </div>
    <div class="footer">
      <div class="footer-author">
        <SvgIcon class="footer-author-icon" icon="author"></SvgIcon>
        <span class="footer-author-name">{{
          props.course.userShowVO.userName
        }}</span>
      </div>
      <span class="footer-date">{{
        formatTimeToDateStr(props.course.createTime)
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import SvgIcon from "@/icons/SvgIcon";
import { formatSecondsToTime, formatTimeToDateStr } from "@/utils/computeTime";

// onMounted(() => {
//   console.log("获取到了,", props.course);
// });

const props = defineProps(["course"]);
</script>

<style lang="scss" scoped>
#courseItemId {
  max-width: 218px;
  width: 15vw;
  height: auto;

  .container {
    width: 100%; /* 设置容器宽度 */
    max-width: 218px; /* 设置最大宽度，可根据需要调整 */
    width: 15vw;
    position: relative;
    padding-top: calc(378 / 672 * 100%); /* 设置容器的 padding-top 为宽高比例 */
    overflow: hidden;

    img {
      position: absolute;
      width: 100%; /* 图片宽度为容器宽度 */
      height: auto; /* 让高度自适应，保持图片比例 */
      top: 0;
      left: 0;
      border-radius: 10px;
    }

    span {
      position: absolute;
      bottom: 0;
      right: 0;
      color: white;
      margin-right: 5px;
      margin-bottom: 5px;
      font-size: min(1vw, 14px);
    }
  }

  .title {
    padding: 5px;
    font-size: min(1vw, 15px);
    color: #383434;
  }

  .footer {
    color: #979797;
    display: flex;
    justify-content: space-between;
    font-size: min(0.8vw, 12px);

    &-author {
      &-name {
        margin-left: 5px;
      }

      &-icon {
        margin-left: 5px;
      }
    }
  }
}
</style>
