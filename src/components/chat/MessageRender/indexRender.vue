<!--
* @indexRender
* @author Li zhiwei
* @date 2024/1/24 13:43
-->

<template>
  <component :is="componentMap[message.type]" :body="message.body" />
</template>

<style scoped>
#index {
}
</style>

<script setup lang="ts">
import { Message, MessageTypeEnum } from "@/service/types";
import { defineProps } from "vue";
import TextRender from "@/components/chat/MessageRender/textRender.vue";
import ImageRender from "@/components/chat/MessageRender/imageRender.vue";

defineProps<{ message: Message }>();

const componentMap = {
  [MessageTypeEnum.TEXT]: TextRender,
  [MessageTypeEnum.IMAGE]: ImageRender,
};
</script>
