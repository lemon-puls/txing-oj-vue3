<!--
* @MyContextMenu
* @author Li zhiwei
* @date 2024/1/29 15:48
-->

<template>
  <div id="MyContextMenu" style="z-index: 20002">
    <ContextMenu :options="{ theme: 'dark', x: 0, y: 0 }">
      <ContextMenuItem label="移除" @click="onRemoveSession">
        <template #icon>
          <svg-icon icon="remove" />
        </template>
      </ContextMenuItem>
    </ContextMenu>
  </div>
</template>

<style lang="scss">
#MyContextMenu {
}

.mx-context-menu {
  padding: 6px;
  background-color: black;
  border-radius: 6px;

  .mx-context-menu-item {
    padding: 2px 4px;
    color: black;
    border-radius: 4px;

    .label {
      padding: 0;
      font-size: 12px;
    }
  }

  .mx-context-menu-item:hover {
    background-color: black;
  }

  .mx-icon-placeholder {
    width: auto !important;
    padding-right: 4px;
  }

  .mx-context-menu-item-sperator {
    background-color: black;
  }

  .mx-context-menu-item-sperator::after {
    background-color: black;
  }
}
</style>

<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuItem,
  MenuOptions,
} from "@imengyu/vue3-context-menu";
import SvgIcon from "../../../../../icons/SvgIcon";
import { defineProps } from "vue";

const props = defineProps<{ roomId?: number; options?: MenuOptions }>();

const menuOptions = [
  {
    text: "Option 1",
    onClick: () => {
      console.log("Option 1 selected");
    },
  },
  {
    text: "Option 2",
    onClick: () => {
      console.log("Option 2 selected");
    },
  },
];
</script>
