<!--
* @MessageItem
* @author Li zhiwei
* @date 2023/12/20 22:12
-->

<template>
  <div id="MessageItem">
    <span v-if="isShowTimeNode && messageShow.timeNode" class="time-node">{{
      messageShow.timeNode
    }}</span>
    <span v-if="isRecall" class="recall-tip">{{ message.body }}</span>
    <div></div>
  </div>
</template>

<style scoped>
#MessageItem {
}
</style>

<script setup lang="ts">
import { MessageShow } from "@/service/types";
import { TooltipTriggerType } from "element-plus";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    // 消息
    messageShow: MessageShow;
    //是否显示时间节点
    isShowTimeNode?: boolean;
    // 是否显示时间
    isShowTime?: boolean;
    // 消息气泡模式 spread、左对齐：left 右对齐：right
    bubbleMode?: string;
    // 气泡操作触发方式
    opsTriggerMode?: TooltipTriggerType;
  }>,
  {
    isShowTimeNode: true,
    isShowTime: true,
    bubbleMode: "spread",
    opsTriggerMode: () => "hover",
  }
);
const isRecall = ref(false);
const message = messageShow.message;
</script>
