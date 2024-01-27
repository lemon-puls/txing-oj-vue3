<!--
* @FriendRequestList
* @author Li zhiwei
* @date 2023/12/21 19:53
-->

<template>
  <div id="FriendRequestList" @click="handler">
    <a-avatar class="avatar">
      <img alt="avatar" :src="cachedUserList[item.userId]?.userAvatar" />
    </a-avatar>
    <div class="apply-info">
      <div class="username-ops">
        <div class="username-parent">
          <span class="username">{{
            cachedUserList[item.userId]?.userName
          }}</span>
        </div>

        <a-button
          v-if="item.status === RequestFriendStatus.WAITTING"
          type="text"
          class="ops"
          status="success"
          >同意
        </a-button>
        <span v-else class="ops">已添加</span>
      </div>
      <div class="content-time">
        <div class="content-parent">
          <span class="content">{{ item.msg }}</span>
        </div>
        <span class="time">{{ item.time }}</span>
      </div>
    </div>
  </div>
  <a-divider></a-divider>
</template>

<style lang="scss" scoped>
#FriendRequestList {
  display: flex;
  align-items: center;

  .avatar {
    //display: inline-block !important;
  }

  .apply-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;

    .username-ops {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;

      .username-parent {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;

        .username {
          font-size: var(--font-size-chat-list-name);
        }
      }

      .ops {
        height: 20px;
      }
    }

    .content-time {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;

      .content-parent {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;

        .content {
          font-size: var(--font-size-chat-list-message);
        }
      }

      .time {
        margin-left: 10px;
        margin-right: 10px;
        font-size: var(--font-size-chat-list-time);
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { RequestFriendStatus } from "@/service/types";
import { useCacheStore } from "@/store/cache";

const cacheStore = useCacheStore();
const cachedUserList = computed(() => cacheStore.cachedUserList);

const props = defineProps(["item"]);

let $emit = defineEmits(["xxx"]);
const handler = () => {
  $emit("xxx", props.item);
};
</script>
