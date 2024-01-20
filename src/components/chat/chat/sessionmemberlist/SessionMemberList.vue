<!--
* @SessionMemberList
* @author Li zhiwei
* @date 2023/12/21 17:48
-->

<template>
  <div id="SessionMemberList" v-if="!isLoading">
    <div class="session-search-parent">
      <a-input-search class="session-search" placeholder="快速查找" />
    </div>
    <div class="online-count-parent">
      <span class="online-count"
        >在线人数:
        <font color="red">{{ groupStore.groupInfo?.onlineCount }}</font></span
      >
    </div>
    <ul class="member-list">
      <li
        class="member-list-item"
        v-for="(item, index) in groupStore.userList"
        :key="index"
      >
        <a-badge
          :count="6"
          dot
          :dotStyle="{ width: '10px', height: '10px' }"
          :offset="[-3, 3]"
          :class="[{ memberOnline: item.activeStatus === 1 }]"
        >
          <a-avatar>
            <img alt="avatar" :src="cachedUserList[item.userId]?.userAvatar" />
          </a-avatar>
        </a-badge>
        <span class="user-name">{{
          cachedUserList[item.userId]?.userName
        }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
#SessionMemberList {
  border-radius: 0px 20px 20px 0;

  .session-search-parent {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .session-search {
      width: 80%;
      margin: 10px auto;
    }
  }

  .online-count-parent {
    .online-count {
      float: right;
      margin-right: 20px;
    }
  }

  .member-list {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    flex-wrap: wrap;
    padding: 0;
    margin-left: 10px;
    margin-top: 30px;
    row-gap: 10px;
    column-gap: 20px;

    &-item {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .user-name {
        max-width: 45px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }

    .memberOnline {
      .arco-badge-dot {
        background-color: green;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useGroupStore } from "@/store/group";
import { useCacheStore } from "@/store/cache";

const groupStore = useGroupStore();
const cacheStore = useCacheStore();
const cachedUserList = computed(() => cacheStore.cachedUserList);

const isLoading = computed(() => Number(groupStore.groupInfo.roomId) === -1);

// const userList = ref([
//   {
//     id: 1,
//     avatar:
//       "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
//     isOnline: 1,
//     userName: "lemon",
//   },
// ]);
</script>
