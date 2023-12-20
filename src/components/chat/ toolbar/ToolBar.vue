<!--
* @ToolBar
* @author Li zhiwei
* @date 2023/12/20 9:59
-->

<template>
  <aside id="ToolBar">
    <a-avatar>
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
    </a-avatar>
    <div class="navs">
      <router-link exact-active-class="nav-selected" to="/">
        <a-badge :count="2" :max-count="99">
          <icon-message class="nav-icon" :size="40" />
        </a-badge>
      </router-link>
      <router-link exact-active-class="nav-selected" to="/">
        <a-badge :count="10" :max-count="99">
          <icon-user-group class="nav-icon" :size="40" />
        </a-badge>
      </router-link>
    </div>
  </aside>
</template>

<style scoped lang="scss">
#ToolBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 20px 0;
  background-color: #303030;
  border-radius: 20px 0 0 20px;

  .navs {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    row-gap: 15px;
  }

  .nav-icon {
    color: #f5f5f5;
  }
}
</style>

<script setup lang="ts">
import { IconMessage, IconUserGroup } from "@arco-design/web-vue/es/icon";
</script>
