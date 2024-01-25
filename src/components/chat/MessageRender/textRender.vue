<!--
* @textRender
* @author Li zhiwei
* @date 2024/1/24 13:56
-->

<template>
  <div class="text">
    <span class="content">{{ body.content }}</span>
  </div>
</template>

<style scoped lang="scss">
.text {
  background-color: #ffffff;
  min-height: 1em;
  padding: 8px 12px;
  font-size: 1vw;
  line-height: 28px;
  color: var(--font-main);
  word-break: break-word;
  border-radius: 2px 18px 18px;

  .content {
    font-family: "楷体", KaiTi, serif;
  }
}
</style>

<script setup lang="ts">
import { TextMsgBody } from "@/service/types";
import { defineProps } from "vue";

const props = defineProps<{ body: TextMsgBody }>();
</script>
