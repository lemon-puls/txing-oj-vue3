<!--
* @FriendList
* @author Li zhiwei
* @date 2023/12/21 19:53
-->

<template>
  <div id="FriendList">
    <a-avatar class="avatar">
      <img alt="avatar" :src="item.avatar" />
    </a-avatar>
    <span class="username">{{ item.userName }}</span>
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

const props = defineProps(["item"]);
</script>
