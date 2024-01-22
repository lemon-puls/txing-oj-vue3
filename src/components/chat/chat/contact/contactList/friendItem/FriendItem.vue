<!--
* @FriendList
* @author Li zhiwei
* @date 2023/12/21 19:53
-->

<template>
  <div id="FriendList" @click="handler">
    <a-avatar class="avatar">
      <img alt="avatar" :src="cachedUserList[Number(item.userId)].userAvatar" />
    </a-avatar>
    <span class="username">{{
      cachedUserList[Number(item.userId)].userName
    }}</span>
  </div>
  <a-divider></a-divider>
</template>

<style lang="scss" scoped>
#FriendList {
  display: flex;
  align-items: center;

  .avatar {
  }

  .username {
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>

<script setup lang="ts">
import { defineProps } from "vue";
import { useCacheStore } from "@/store/cache";
import { computed, defineEmits } from "vue";

const cacheStore = useCacheStore();
const cachedUserList = computed(() => cacheStore.cachedUserList);

const props = defineProps(["item"]);

let $emit = defineEmits(["myClick"]);
const handler = () => {
  $emit("myClick", props.item);
};
</script>
