<template>
  <div id="forumPostItemId">
    <div class="header">
      <div class="left">
        <img class="avatar" :src="props.topic.userShowVO.userAvatar" />
        <div class="user-info">
          <span>{{ props.topic.userShowVO.userName }}</span>
          <span style="font-size: 12px; color: rgba(18, 16, 16, 0.65)">{{
            props.topic.createTime
          }}</span>
        </div>
      </div>
      <div class="right">
        <div class="status" v-if="isShowStatus">
          <span>状态：</span>
          <span
            v-if="props.topic.status == CheckStatusEnum.WAITTING"
            style="color: #00c4ff"
            >审核中</span
          >
          <span
            v-else-if="props.topic.status == CheckStatusEnum.ACCEPTED"
            style="color: #099525"
            >审核通过</span
          >
          <span
            v-else-if="props.topic.status == CheckStatusEnum.REJECT"
            style="color: red"
            >不通过</span
          >
        </div>
        <div
          :title="props.topic.remark"
          class="remark"
          v-if="isShowStatus && props.topic.remark"
        >
          <span
            >备注：{{
              props.topic.remark.length > 30
                ? props.topic.remark.slice(0, 30) + "..."
                : props.topic.remark
            }}</span
          >
        </div>
      </div>
    </div>
    <div class="title" @click="forumStore.open(props.topic.id)">
      <h3>{{ props.topic.title }}</h3>
    </div>
    <div class="content" @click="forumStore.open(props.topic.id)">
      <span style="font-size: 15px; line-height: 20px">
        {{ props.topic.content }}
      </span>
    </div>
    <div class="pictures">
      <img
        v-for="(img, index) in imgs"
        :key="index"
        style="width: 138px; height: 138px; border-radius: 10px"
        :src="img"
        @click="onPreviewImg(img)"
      />
    </div>
    <div class="footer-ops">
      <div class="ops">
        <SvgIcon class="icon" icon="thumb" size="15" />
        <span>{{ props.topic.thumbNum }}</span>
      </div>
      <div class="ops">
        <SvgIcon class="icon" icon="favour2" size="15" />
        <span>{{ props.topic.favourNum }}</span>
      </div>
      <div class="ops">
        <svg-icon class="icon" icon="comment" size="15"></svg-icon>
        <span>{{ props.topic.commentNum }}</span>
      </div>
      <div class="ops ops-icon" v-if="props.isEdit" @click="onEdit">
        <svg-icon class="icon" icon="edit" size="15"></svg-icon>
        <span>编辑</span>
      </div>
      <a-popconfirm content="确认要删除该话题吗?" type="warning" @ok="onDelete">
        <div class="ops ops-icon" v-if="props.isDelete">
          <svg-icon class="icon" icon="delete" size="15"></svg-icon>
          <span>删除</span>
        </div>
      </a-popconfirm>
      <div class="ops ops-icon" v-if="props.isRemove" @click="onCancelFavour">
        <svg-icon class="icon" icon="remove1" size="15"></svg-icon>
        <span>取消收藏</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed } from "vue";
import SvgIcon from "@/icons/SvgIcon";
import { useForumStore } from "@/store/forum";
import { useImgPreviewStore } from "@/store/preview";
import { TopicAppControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { CheckStatusEnum } from "@/enume";

const forumStore = useForumStore();
const previewStore = useImgPreviewStore();
const router = useRouter();

interface Props {
  isDelete: boolean;
  isEdit: boolean;
  isRemove: boolean;
  topic: any;
  isShowStatus: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDelete: () => false,
  isEdit: () => false,
  isRemove: () => false,
  isShowStatus: () => false,
});
const $emit = defineEmits(["loadData"]);

const imgs = computed(() => {
  if (props.topic.imgs == null || props.topic.imgs.length == 0) {
    return [];
  } else {
    // return props.topic.imgs.slice(0, 6);
    return props.topic.imgs;
  }
});

const onPreviewImg = (imgUrl: string) => {
  previewStore.show([imgUrl], 0);
};
// 取消收藏
const onCancelFavour = async () => {
  const res = await TopicAppControllerService.doFavourUsingPost({
    postId: props.topic.id,
  });
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  message.success("已取消收藏");
  $emit("loadData");
};
// 删除话题
const onDelete = async () => {
  const res = await TopicAppControllerService.deleteTopicUsingPost([
    props.topic.id,
  ]);
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  message.success("删除成功");
  $emit("loadData");
};

// 编辑话题
const onEdit = () => {
  router.push({
    path: "/txing/forum/post/update/" + props.topic.id,
  });
};
</script>

<style lang="scss">
#forumPostItemId {
  border-radius: 20px;
  border: 1px solid white;
  padding: 20px;
  margin-bottom: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
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

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
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

  .content {
    cursor: pointer;
  }

  .pictures {
    margin-top: 15px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    overflow-x: auto;

    --sb-track-color: rgba(218, 216, 209, 0.99);
    --sb-thumb-color: rgba(75, 187, 222, 0.98);
    --sb-size: 8px;

    &::-webkit-scrollbar {
      height: var(--sb-size);
    }

    &::-webkit-scrollbar-track {
      background: var(--sb-track-color);
      border-radius: 15px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--sb-thumb-color);
      border-radius: 15px;
    }

    @supports not selector(::-webkit-scrollbar) {
      & {
        scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
      }
    }
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
