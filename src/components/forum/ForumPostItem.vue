<template>
  <div id="forumPostItemId">
    <div class="header">
      <img
        class="avatar"
        src="https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1/dkC8kEgl-aa1bba1647682475dcf210ac0633505.png"
      />
      <div class="user-info">
        <span>{{ props.topic.userShowVO.userName }}</span>
        <span style="font-size: 12px; color: rgba(18, 16, 16, 0.65)">{{
          props.topic.createTime
        }}</span>
      </div>
    </div>
    <div class="title" @click="forumStore.open(props.topic.id)">
      <h3>{{ props.topic.title }}</h3>
    </div>
    <div class="content">
      <span style="font-size: 15px; line-height: 20px">
        {{ props.topic.content }}
      </span>
    </div>
    <div class="pictures">
      <img
        v-for="img in props.topic.imgs"
        :key="img"
        style="width: 138px; height: 138px; border-radius: 10px"
        :src="img"
        @click="onPreviewImg(img)"
      />
    </div>
    <div class="footer-ops">
      <div class="ops">
        <SvgIcon class="icon" icon="thumb" :size="15" />
        <span>{{ props.topic.thumbNum }}</span>
      </div>
      <div class="ops">
        <SvgIcon class="icon" icon="favour2" :size="15" />
        <span>{{ props.topic.favourNum }}</span>
      </div>
      <div class="ops">
        <svg-icon class="icon" icon="comment" :size="15"></svg-icon>
        <span>{{ props.topic.commentNum }}</span>
      </div>
      <div class="ops ops-icon" v-if="props.isEdit">
        <svg-icon class="icon" icon="edit" :size="15"></svg-icon>
        <span>编辑</span>
      </div>
      <div class="ops ops-icon" v-if="props.isDelete">
        <svg-icon class="icon" icon="delete" :size="15"></svg-icon>
        <span>删除</span>
      </div>
      <div class="ops ops-icon" v-if="props.isRemove">
        <svg-icon class="icon" icon="remove1" :size="15"></svg-icon>
        <span>取消收藏</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";
import SvgIcon from "@/icons/SvgIcon";
import { useForumStore } from "@/store/forum";
import { useImgPreviewStore } from "@/store/preview";

const forumStore = useForumStore();
const previewStore = useImgPreviewStore();

interface Props {
  isDelete: boolean;
  isEdit: boolean;
  isRemove: boolean;
  topic: any;
}

const props = withDefaults(defineProps<Props>(), {
  isDelete: () => false,
  isEdit: () => false,
  isRemove: () => false,
});

// 测试图片
const imgUrl =
  "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1/PYorLjF1-%E5%BE%80%E6%98%94%E6%B1%97%E6%B0%B4_The%20sweat%20of%20the%20past_1_SaYoii_%E6%9D%A5%E8%87%AA%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%BD%91%E9%A1%B5%E7%89%88.jpg";
const onPreviewImg = (imgUrl: string) => {
  previewStore.show([imgUrl], 0);
};
</script>

<style scoped lang="scss">
#forumPostItemId {
  border-radius: 20px;
  border: 1px solid white;
  padding: 20px;
  margin-bottom: 10px;

  .header {
    display: flex;
    justify-content: left;
    align-items: center;

    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .user-info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: start;
    }
  }

  .title {
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      animation: floatAnimation 0.5s ease forwards;
    }

    @keyframes floatAnimation {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }

  .pictures {
    margin-top: 15px;
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  .footer-ops {
    margin-top: 20px;
    display: flex;
    justify-content: left;
    align-items: center;
    column-gap: 15px;

    .icon {
      margin-right: 5px;
    }

    .ops-icon {
      cursor: pointer;

      &:hover {
        color: #007bff;
      }
    }
  }
}
</style>
