<!--
* @ManageView
* @author Li zhiwei
* @date 2024/1/31 10:19
-->

<template>
  <div id="ManageView">
    <a-menu
      :style="{ width: '200px', height: '100%', flex: 1 }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_2']"
      show-collapse-button
      breakpoint="xl"
      @collapse="onCollapse"
    >
      <a-sub-menu key="0">
        <template #icon>
          <icon-apps></icon-apps>
        </template>
        <template #title>Navigation 1</template>
        <a-menu-item key="0_0">Menu 1</a-menu-item>
        <a-menu-item key="0_1">Menu 2</a-menu-item>
        <a-menu-item key="0_2">Menu 3</a-menu-item>
        <a-menu-item key="0_3">Menu 4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon>
          <icon-bug></icon-bug>
        </template>
        <template #title>Navigation 2</template>
        <a-menu-item key="1_0">Menu 1</a-menu-item>
        <a-menu-item key="1_1">Menu 2</a-menu-item>
        <a-menu-item key="1_2">Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon>
          <icon-bulb></icon-bulb>
        </template>
        <template #title>Navigation 3</template>
        <a-menu-item key="2_0">Menu 1</a-menu-item>
        <a-menu-item key="2_1">Menu 2</a-menu-item>
        <a-sub-menu key="2_2" title="Navigation 4">
          <a-menu-item key="2_2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_2_1">Menu 2</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<style scoped>
#ManageView {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.menu-demo {
  box-sizing: border-box;
  width: 100%;
  height: 50vw;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";

const onCollapse = (val: any, type: any) => {
  const content = type === "responsive" ? "触发响应式收缩" : "点击触发收缩";
  Message.info({
    content,
    duration: 2000,
  });
};
</script>
