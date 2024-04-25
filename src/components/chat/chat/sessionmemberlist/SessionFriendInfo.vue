<!--
* @SessionFriendInfo
* @author Li zhiwei
* @date 2024/1/29 23:17
-->

<template>
  <div id="SessionFriendInfo">
    <div class="person-info">
      <div class="person-info-avatar">
        <a-badge
          :count="6"
          dot
          :dotStyle="{ width: '10px', height: '10px' }"
          :offset="[-3, 3]"
          :class="[{ memberOnline: user?.activeStatus === 1 }]"
        >
          <a-avatar :size="80">
            <img alt="avatar" :src="user?.userAvatar" />
          </a-avatar>
        </a-badge>
      </div>
      <div class="person-info-name">
        <span class="person-info-name-font">{{ user?.userName }}</span>
      </div>
      <div class="person-info-sign">
        <span class="person-info-sign-font"
          >Ta说：{{
            user?.personSign.length > 40
              ? user?.personSign.substring(0, 40) + "..."
              : user?.personSign
          }}</span
        >
      </div>
    </div>
    <a-divider />

    <div class="group-ops">
      <a-popconfirm
        v-if="isFriend"
        content="确定要删除该好友吗?"
        @ok="onDeleteFriend"
      >
        <span class="group-ops-delete">删除好友</span>
      </a-popconfirm>
      <span v-else class="group-ops-add" @click="onAddFriend">添加好友</span>
    </div>
  </div>
  <AddFriendModal :userId="user?.id" v-model:visible="visible" />
</template>

<style lang="scss">
#SessionFriendInfo {
  margin-top: 30px;

  .person-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;

    &-avatar {
      text-align: center !important;

      .memberOnline {
        .arco-badge-dot {
          background-color: green;
        }
      }
    }

    &-name {
      &-font {
        font-family: "楷体", KaiTi, serif;
        font-weight: bold;
        font-size: 20px;
      }
    }

    &-sign {
      padding: 0 20px;

      &-font {
      }
    }

    &-ops {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 15px;
    }
  }

  .group-ops {
    text-align: center;

    &-delete {
      font-size: 18px;
      color: #ff3700;
      cursor: default;
    }

    &-add {
      font-size: 18px;
      color: #ff9500;
      cursor: default;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useCacheStore } from "@/store/cache";
import { useGlobalStore } from "@/store/global";
import { useChatStore } from "@/store/chat";
import message from "@arco-design/web-vue/es/message";
import { useContactStore } from "@/store/contact";
import AddFriendModal from "@/components/chat/AddFriendModal/AddFriendModal.vue";
import { RoomStatusEnum } from "@/enume";
import { UserFriendControllerService } from "../../../../../generated";

const cachedStore = useCacheStore();
const globalStore = useGlobalStore();
const chatStore = useChatStore();
const contactStore = useContactStore();

// onMounted(() => {
//   if (chatStore.currentSessionItem) {
//     cachedStore.refreshCachedUserVOBatch(
//       [chatStore.currentSessionItem.userId],
//       true
//     );
//   }
// });

const user = computed(() => {
  if (chatStore.currentSessionItem) {
    const userId = chatStore.currentSessionItem.userId;
    const user = cachedStore.cachedUserList[Number(userId)];
    return user;
  } else {
    return null;
  }
});

// 删除好友
const onDeleteFriend = async () => {
  if (user.value?.id) {
    const res = await UserFriendControllerService.deleteUsingGet5(
      user.value.id
    );
    if (res.code === 10000) {
      message.error(res.msg);
    } else {
      message.success("删除成功");
    }
    if (chatStore.currentSessionItem) {
      chatStore.currentSessionItem.status = RoomStatusEnum.FORBIDDEN;
    }
  }
};

const isFriend = computed(() => {
  return chatStore.currentSessionItem?.status == 0;
});

const visible = ref(false);
const onAddFriend = () => {
  visible.value = true;
};
</script>
