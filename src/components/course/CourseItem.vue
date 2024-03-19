<template>
  <div id="courseItemId">
    <div class="container">
      <img src="../../assets/course.jpg" />
      <span>117:16:23</span>
    </div>
    <div class="title">
      <span>【尚硅谷】Golang入门到实战教程丨一套精通GO语言</span>
    </div>
    <div class="footer">
      <div class="footer-author">
        <SvgIcon class="footer-author-icon" icon="author"></SvgIcon>
        <span class="footer-author-name">热爱生活的气瓶</span>
      </div>
      <span class="footer-date">2024-01-22</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SvgIcon from "@/icons/SvgIcon";

export default defineComponent({
  components: { SvgIcon },
});
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
